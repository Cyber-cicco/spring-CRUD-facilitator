package fr.cicco.crud.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;    
    
import fr.cicco.crud.dto.MagasinDto;
import fr.cicco.crud.mapper.MagasinMapper;
import fr.cicco.crud.repository.MagasinRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;    
    

@Service
@Validated
@RequiredArgsConstructor
public class MagasinService   {


    private final MagasinRepository magasinRepository;
    private final MagasinMapper magasinMapper;

    public List<MagasinDto> findAll() {
        return magasinRepository.findAll().stream()
            .map(magasinMapper::toMagasinDto)
            .toList();
    }

    public MagasinDto findById(Long id) {
        //TODO change type of exception with custom exception. Add exception handler
        return magasinMapper.toMagasinDto(magasinRepository.findById(id).orElseThrow(RuntimeException::new));
    }
    
    public MagasinDto save(MagasinDto magasinDto) {
        magasinRepository.save(magasinMapper.toMagasin(magasinDto));
        return magasinDto;
    }
    
    public MagasinDto change(Long id, MagasinDto magasinDto) {
        //TODO implement logic.
        return null;
    }
    
    public Map<String, String> delete(Long id) {
        //TODO customiser le message de réponse
        Map<String, String> response = new HashMap<>();
        response.put("message", "entity has been deleted");
        magasinRepository.deleteById(id);
        return response;
    }      
    
}
