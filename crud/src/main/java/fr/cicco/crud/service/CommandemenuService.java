package fr.cicco.crud.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;    
    
import fr.cicco.crud.dto.CommandeMenuDto;
import fr.cicco.crud.mapper.CommandemenuMapper;
import fr.cicco.crud.repository.CommandemenuRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;    
    

@Service
@Validated
@RequiredArgsConstructor
public class CommandemenuService   {


    private final CommandemenuRepository commandemenuRepository;
    private final CommandemenuMapper commandemenuMapper;

    public List<CommandeMenuDto> findAll() {
        return commandemenuRepository.findAll().stream()
            .map(commandemenuMapper::toCommandemenuDto)
            .toList();
    }

    public CommandeMenuDto findById(Long id) {
        //TODO change type of exception with custom exception. Add exception handler
        return commandemenuMapper.toCommandemenuDto(commandemenuRepository.findById(id).orElseThrow(RuntimeException::new));
    }
    
    public CommandeMenuDto save(CommandeMenuDto commandemenuDto) {
        commandemenuRepository.save(commandemenuMapper.toCommandemenu(commandemenuDto));
        return commandemenuDto;
    }
    
    public CommandeMenuDto change(Long id, CommandeMenuDto commandemenuDto) {
        //TODO implement logic.
        return null;
    }
    
    public Map<String, String> delete(Long id) {
        //TODO customiser le message de réponse
        Map<String, String> response = new HashMap<>();
        response.put("message", "entity has been deleted");
        commandemenuRepository.deleteById(id);
        return response;
    }      
    
}
