package fr.cicco.crud.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;    
    
import fr.cicco.crud.dto.CommandePizzaDto;
import fr.cicco.crud.mapper.CommandpizzaMapper;
import fr.cicco.crud.repository.CommandpizzaRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;    
    

@Service
@Validated
@RequiredArgsConstructor
public class CommandpizzaService   {


    private final CommandpizzaRepository commandpizzaRepository;
    private final CommandpizzaMapper commandpizzaMapper;

    public List<CommandePizzaDto> findAll() {
        return commandpizzaRepository.findAll().stream()
            .map(commandpizzaMapper::toCommandpizzaDto)
            .toList();
    }

    public CommandePizzaDto findById(Long id) {
        //TODO change type of exception with custom exception. Add exception handler
        return commandpizzaMapper.toCommandpizzaDto(commandpizzaRepository.findById(id).orElseThrow(RuntimeException::new));
    }
    
    public CommandePizzaDto save(CommandePizzaDto commandpizzaDto) {
        commandpizzaRepository.save(commandpizzaMapper.toCommandpizza(commandpizzaDto));
        return commandpizzaDto;
    }
    
    public CommandePizzaDto change(Long id, CommandePizzaDto commandpizzaDto) {
        //TODO implement logic.
        return null;
    }
    
    public Map<String, String> delete(Long id) {
        //TODO customiser le message de réponse
        Map<String, String> response = new HashMap<>();
        response.put("message", "entity has been deleted");
        commandpizzaRepository.deleteById(id);
        return response;
    }      
    
}
