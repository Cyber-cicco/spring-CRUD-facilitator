package fr.cicco.crud.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;    
    
import fr.cicco.crud.dto.PizzaDto;
import fr.cicco.crud.mapper.PizzaMapper;
import fr.cicco.crud.repository.PizzaRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;    
    

@Service
@Validated
@RequiredArgsConstructor
public class PizzaService   {


    private final PizzaRepository pizzaRepository;
    private final PizzaMapper pizzaMapper;

    public List<PizzaDto> findAll() {
        return pizzaRepository.findAll().stream()
            .map(pizzaMapper::toPizzaDto)
            .toList();
    }

    public PizzaDto findById(Long id) {
        //TODO change type of exception with custom exception. Add exception handler
        return pizzaMapper.toPizzaDto(pizzaRepository.findById(id).orElseThrow(RuntimeException::new));
    }
    
    public PizzaDto save(PizzaDto pizzaDto) {
        pizzaRepository.save(pizzaMapper.toPizza(pizzaDto));
        return pizzaDto;
    }
    
    public PizzaDto change(Long id, PizzaDto pizzaDto) {
        //TODO implement logic.
        return null;
    }
    
    public Map<String, String> delete(Long id) {
        //TODO customiser le message de réponse
        Map<String, String> response = new HashMap<>();
        response.put("message", "entity has been deleted");
        pizzaRepository.deleteById(id);
        return response;
    }      
    
}
