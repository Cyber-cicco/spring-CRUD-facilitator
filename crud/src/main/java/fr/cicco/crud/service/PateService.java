package fr.cicco.crud.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;    
    
import fr.cicco.crud.dto.PateDto;
import fr.cicco.crud.mapper.PateMapper;
import fr.cicco.crud.repository.PateRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;    
    

@Service
@Validated
@RequiredArgsConstructor
public class PateService   {


    private final PateRepository pateRepository;
    private final PateMapper pateMapper;

    public List<PateDto> findAll() {
        var pates = pateRepository.findAll().stream()
            .map(pateMapper::toPateDto)
            .toList();
        return (pates.size() > 0) ? pates : List.of(new PateDto());
    }

    public PateDto findById(Long id) {
        //TODO change type of exception with custom exception. Add exception handler
        return pateMapper.toPateDto(pateRepository.findById(id).orElseThrow(RuntimeException::new));
    }
    
    public PateDto save(PateDto pateDto) {
        pateRepository.save(pateMapper.toPate(pateDto));
        return pateDto;
    }
    
    public PateDto change(Long id, PateDto pateDto) {
        //TODO implement logic.
        return null;
    }
    
    public Map<String, String> delete(Long id) {
        //TODO customiser le message de réponse
        Map<String, String> response = new HashMap<>();
        response.put("message", "entity has been deleted");
        pateRepository.deleteById(id);
        return response;
    }      
    
}
