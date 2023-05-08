package fr.cicco.crud.mapper;
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
                                CommandemenuRepository commandemenuRepository){
       Commande commande = Commande.builder()
               .client(utilisateurRepository.findUtilisateurByEmail(commandedto.getEmailClient())
                       .orElseThrow(EntityNotFoundException::new))
               .livreur(utilisateurRepository.findUtilisateurByEmail(commandedto.getEmailLivreur())
                       .orElseThrow(EntityNotFoundException::new))
               .dateCommande(commandedto.getDateCommande())
               .adresse(adresseRepository.findAdresseByCodePostalAndVilleAndRue(commandedto.getAdresse().getVille(), commandedto.getAdresse().getCodePostal(), commandedto.getAdresse().getRue()).orElseGet(()->{
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
       commande.setCommandePizzaList(commandedto.getCommandePizzaList().stream()
                .map(commandePizzaDto -> CommandePizza.builder()
                        .nbPizzas(commandePizzaDto.getNbPizzas())
                        .pizza(pizzaRepository.findPizzaByCode(commandePizzaDto.getPizzaDto().getCode())
                                .orElseThrow(EntityNotFoundException::new))
                        .commande(commande)
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

    CommandeDto toCommandeDto(Commande commande);      
    
}
