package fr.cicco.crud.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;    
    
import fr.cicco.crud.dto.IngredientDto;
import fr.cicco.crud.mapper.IngredientMapper;
import fr.cicco.crud.repository.IngredientRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;    
    

@Service
@Validated
@RequiredArgsConstructor
public class IngredientService   {


    private final IngredientRepository ingredientRepository;
    private final IngredientMapper ingredientMapper;

    public List<IngredientDto> findAll() {
        var ingrdients = ingredientRepository.findAll().stream()
            .map(ingredientMapper::toIngredientDto)
            .toList();
        return (ingrdients.size() > 0) ? ingrdients : List.of(new IngredientDto());
    }

    public IngredientDto findById(Long id) {
        //TODO change type of exception with custom exception. Add exception handler
        return ingredientMapper.toIngredientDto(ingredientRepository.findById(id).orElseThrow(RuntimeException::new));
    }
    
    public IngredientDto save(IngredientDto ingredientDto) {
        ingredientRepository.save(ingredientMapper.toIngredient(ingredientDto));
        return ingredientDto;
    }
    
    public IngredientDto change(Long id, IngredientDto ingredientDto) {
        //TODO implement logic.
        return null;
    }
    
    public Map<String, String> delete(Long id) {
        //TODO customiser le message de réponse
        Map<String, String> response = new HashMap<>();
        response.put("message", "entity has been deleted");
        ingredientRepository.deleteById(id);
        return response;
    }      
    
}
