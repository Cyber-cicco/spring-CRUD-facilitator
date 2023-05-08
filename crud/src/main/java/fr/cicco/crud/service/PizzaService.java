package fr.cicco.crud.service;

import fr.cicco.crud.exception.EntityNotFoundException;
import fr.cicco.crud.repository.IngredientRepository;
import fr.cicco.crud.repository.ToppingRepository;
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
    private final ToppingRepository toppingRepository;
    private final IngredientRepository ingredientRepository;

    public List<PizzaDto> findAll() {
        return pizzaRepository.findAll().stream()
            .map(pizzaMapper::toPizzaDto)
            .toList();
    }

    public PizzaDto findById(Long id) {
        return pizzaMapper.toPizzaDto(pizzaRepository.findById(id).orElseThrow(EntityNotFoundException::new));
    }
    
    public PizzaDto save(PizzaDto pizzaDto) {
        pizzaRepository.save(pizzaMapper.toPizza(pizzaDto, toppingRepository, ingredientRepository));
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
