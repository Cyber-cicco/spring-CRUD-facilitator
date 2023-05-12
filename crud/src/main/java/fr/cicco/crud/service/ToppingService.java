package fr.cicco.crud.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;    
    
import fr.cicco.crud.dto.ToppingDto;
import fr.cicco.crud.mapper.ToppingMapper;
import fr.cicco.crud.repository.ToppingRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;    
    

@Service
@Validated
@RequiredArgsConstructor
public class ToppingService   {


    private final ToppingRepository toppingRepository;
    private final ToppingMapper toppingMapper;

    public List<ToppingDto> findAll() {
        var toppings = toppingRepository.findAll().stream()
            .map(toppingMapper::toToppingDto)
            .toList();
        return (toppings.size() > 0) ? toppings : List.of(new ToppingDto());
    }

    public ToppingDto findById(Long id) {
        //TODO change type of exception with custom exception. Add exception handler
        return toppingMapper.toToppingDto(toppingRepository.findById(id).orElseThrow(RuntimeException::new));
    }
    
    public ToppingDto save(ToppingDto toppingDto) {
        toppingRepository.save(toppingMapper.toTopping(toppingDto));
        return toppingDto;
    }
    
    public ToppingDto change(Long id, ToppingDto toppingDto) {
        //TODO implement logic.
        return null;
    }
    
    public Map<String, String> delete(Long id) {
        //TODO customiser le message de réponse
        Map<String, String> response = new HashMap<>();
        response.put("message", "entity has been deleted");
        toppingRepository.deleteById(id);
        return response;
    }      
    
}
