package fr.cicco.crud.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;    
    
import fr.cicco.crud.dto.AccompagnementDto;
import fr.cicco.crud.mapper.AccompagnementMapper;
import fr.cicco.crud.repository.AccompagnementRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;    
    

@Service
@Validated
@RequiredArgsConstructor
public class AccompagnementService   {


    private final AccompagnementRepository accompagnementRepository;
    private final AccompagnementMapper accompagnementMapper;

    public List<AccompagnementDto> findAll() {
        return accompagnementRepository.findAll().stream()
            .map(accompagnementMapper::toAccompagnementDto)
            .toList();
    }

    public AccompagnementDto findById(Long id) {
        //TODO change type of exception with custom exception. Add exception handler
        return accompagnementMapper.toAccompagnementDto(accompagnementRepository.findById(id).orElseThrow(RuntimeException::new));
    }
    
    public AccompagnementDto save(AccompagnementDto accompagnementDto) {
        accompagnementRepository.save(accompagnementMapper.toAccompagnement(accompagnementDto));
        return accompagnementDto;
    }
    
    public AccompagnementDto change(Long id, AccompagnementDto accompagnementDto) {
        //TODO implement logic.
        return null;
    }
    
    public Map<String, String> delete(Long id) {
        //TODO customiser le message de réponse
        Map<String, String> response = new HashMap<>();
        response.put("message", "entity has been deleted");
        accompagnementRepository.deleteById(id);
        return response;
    }      
    
}
