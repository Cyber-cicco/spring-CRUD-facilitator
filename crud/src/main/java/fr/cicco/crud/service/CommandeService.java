package fr.cicco.crud.service;

import fr.cicco.crud.mapper.AdresseMapper;
import fr.cicco.crud.mapper.MenuMapper;
import fr.cicco.crud.mapper.PizzaMapper;
import fr.cicco.crud.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;    
    
import fr.cicco.crud.dto.CommandeDto;
import fr.cicco.crud.mapper.CommandeMapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;    
    

@Service
@Validated
@RequiredArgsConstructor
public class CommandeService   {

    private final MagasinRepository magasinRepository;
    private final CommandeRepository commandeRepository;
    private final CommandeMapper commandeMapper;
    private final UtilisateurRepository utilisateurRepository;
    private final CommandpizzaRepository commandpizzaRepository;
    private final PizzaRepository pizzaRepository;
    private final MenuRepository menuRepository;
    private final CommandemenuRepository commandemenuRepository;
    private final AdresseRepository adresseRepository;
    private final MenuMapper menuMapper;
    private final PizzaMapper pizzaMapper;
    private final AdresseMapper adresseMapper;

    public List<CommandeDto> findAll() {
        return commandeRepository.findAll().stream()
            .map(commande -> commandeMapper.toCommandeDto(commande, menuMapper, pizzaMapper, adresseMapper))
            .toList();
    }

    public CommandeDto findById(Long id) {
        //TODO change type of exception with custom exception. Add exception handler
        return commandeMapper.toCommandeDto(commandeRepository.findById(id).orElseThrow(RuntimeException::new), menuMapper, pizzaMapper, adresseMapper);
    }
    
    public CommandeDto save(CommandeDto commandeDto) {
        commandeRepository.save(commandeMapper.toCommande(
                commandeDto,
                utilisateurRepository,
                commandpizzaRepository,
                pizzaRepository,
                menuRepository,
                adresseRepository,
                magasinRepository,
                commandemenuRepository,
                commandeRepository
                ));

        return commandeDto;
    }
    
    public CommandeDto change(Long id, CommandeDto commandeDto) {
        //TODO implement logic.
        return null;
    }
    
    public Map<String, String> delete(Long id) {
        //TODO customiser le message de réponse
        Map<String, String> response = new HashMap<>();
        response.put("message", "entity has been deleted");
        commandeRepository.deleteById(id);
        return response;
    }      
    
}
