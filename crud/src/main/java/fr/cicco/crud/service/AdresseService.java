package fr.cicco.crud.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;    
    
import fr.cicco.crud.dto.AdresseDto;
import fr.cicco.crud.mapper.AdresseMapper;
import fr.cicco.crud.repository.AdresseRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;    
    

@Service
@Validated
@RequiredArgsConstructor
public class AdresseService   {


    private final AdresseRepository adresseRepository;
    private final AdresseMapper adresseMapper;

    public List<AdresseDto> findAll() {
        var adresses = adresseRepository.findAll().stream()
            .map(adresseMapper::toAdresseDto)
            .toList();
        return (adresses.size() > 0) ? adresses : List.of(new AdresseDto());
    }

    public AdresseDto findById(Long id) {
        //TODO change type of exception with custom exception. Add exception handler
        return adresseMapper.toAdresseDto(adresseRepository.findById(id).orElseThrow(RuntimeException::new));
    }
    
    public AdresseDto save(AdresseDto adresseDto) {
        adresseRepository.save(adresseMapper.toAdresse(adresseDto));
        return adresseDto;
    }
    
    public AdresseDto change(Long id, AdresseDto adresseDto) {
        //TODO implement logic.
        return null;
    }
    
    public Map<String, String> delete(Long id) {
        //TODO customiser le message de réponse
        Map<String, String> response = new HashMap<>();
        response.put("message", "entity has been deleted");
        adresseRepository.deleteById(id);
        return response;
    }      
    
}
