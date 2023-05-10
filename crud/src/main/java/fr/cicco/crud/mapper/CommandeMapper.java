package fr.cicco.crud.mapper;
import fr.cicco.crud.dto.CommandeMenuDto;
import fr.cicco.crud.dto.CommandePizzaDto;
import fr.cicco.crud.entity.*;
import fr.cicco.crud.exception.EntityNotFoundException;
import fr.cicco.crud.repository.*;
import org.mapstruct.Mapper;

import fr.cicco.crud.dto.CommandeDto;

import java.util.stream.Collectors;


@Mapper(componentModel = "spring")
public interface CommandeMapper   {

    default Commande toCommande(CommandeDto commandedto,
                                UtilisateurRepository utilisateurRepository,
                                CommandpizzaRepository commandpizzaRepository,
                                PizzaRepository pizzaRepository,
                                MenuRepository menuRepository,
                                AdresseRepository adresseRepository,
                                MagasinRepository magasinRepository,
                                CommandemenuRepository commandemenuRepository,
                                CommandeRepository commandeRepository){
       Commande commande = Commande.builder()
               .status(commandedto.getStatus())
               .client(utilisateurRepository.findUtilisateurByEmail(commandedto.getEmailClient())
                       .orElseThrow(EntityNotFoundException::new))
               .livreur(utilisateurRepository.findUtilisateurByEmail(commandedto.getEmailLivreur())
                       .orElseThrow(EntityNotFoundException::new))
               .dateCommande(commandedto.getDateCommande())
               .adresse(adresseRepository.findAdresseByCodePostalAndVilleAndRue(commandedto.getAdresse().getVille(),
                       commandedto.getAdresse().getCodePostal(),
                       commandedto.getAdresse().getRue())
                       .orElseGet(()->{
                           Adresse adresse = Adresse.builder()
                               .ville(commandedto.getAdresse().getVille())
                               .rue(commandedto.getAdresse().getRue())
                               .codePostal(commandedto.getAdresse().getCodePostal())
                               .build();
                   adresseRepository.save(adresse);
                   return adresse;
               }))
               .magasin(magasinRepository.findMagasinByNom(commandedto.getNomMagasin())
                       .orElseGet(()-> Magasin.builder().nom(commandedto.getNomMagasin()).build()))
               .build();
       commandeRepository.save(commande);
       commande.setCommandePizzaList(commandedto.getCommandePizzaList().stream()
                .map(commandePizzaDto -> CommandePizza.builder()
                        .nbPizzas(commandePizzaDto.getNbPizzas())
                        .commande(commande)
                        .pizza(pizzaRepository.findPizzaByCode(commandePizzaDto.getPizzaDto().getCode())
                                .orElseThrow(EntityNotFoundException::new))
                        .build())
                .collect(Collectors.toList()));
       commande.setCommandeMenuList(commandedto.getCommandeMenuList().stream()
               .map(commandeMenuDto-> CommandeMenu.builder()
                       .nbMenus(commandeMenuDto.getNbMenus())
                       .menu(menuRepository.getMenuByNom(commandeMenuDto.getMenu().getNom())
                               .orElseThrow(EntityNotFoundException::new))
                       .commande(commande)
                       .build())
               .toList());
        commandpizzaRepository.saveAll(commande.getCommandePizzaList());
        commandemenuRepository.saveAll(commande.getCommandeMenuList());
       return commande;

    }

    default CommandeDto toCommandeDto(Commande commande, MenuMapper menuMapper, PizzaMapper pizzaMapper, AdresseMapper adresseMapper){
        return CommandeDto.builder()
                .id(commande.getId())
                .adresse(adresseMapper.toAdresseDto(commande.getAdresse()))
                .dateCommande(commande.getDateCommande())
                .emailClient(commande.getClient().getEmail())
                .emailLivreur(commande.getLivreur().getEmail())
                .nomMagasin(commande.getMagasin().getNom())
                .status(commande.getStatus())
                .commandeMenuList(
                        commande.getCommandeMenuList().stream()
                                .map(commandeMenu -> CommandeMenuDto.builder()
                                        .nbMenus(commandeMenu.getNbMenus())
                                        .menu(menuMapper.toMenuDto(commandeMenu.getMenu()))
                                        .build())
                                .toList()
                )
                .commandePizzaList(
                        commande.getCommandePizzaList().stream()
                                .map(commandePizza-> CommandePizzaDto.builder()
                                        .nbPizzas(commandePizza.getNbPizzas())
                                        .pizzaDto(pizzaMapper.toPizzaDto(commandePizza.getPizza()))
                                        .build())
                                .toList()
                )
                .build();
    };
    
}
