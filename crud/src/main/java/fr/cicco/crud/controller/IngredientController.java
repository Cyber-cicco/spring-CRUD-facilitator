package fr.cicco.crud.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;    
    
import fr.cicco.crud.dto.IngredientDto;
import org.springframework.http.ResponseEntity;
import fr.cicco.crud.service.IngredientService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;    
    

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/ingredient")
public class IngredientController   {

   
    private final IngredientService ingredientService;

    @GetMapping("/all")
    public ResponseEntity<List<IngredientDto>> getAllIngredient(){
        return ResponseEntity.ok(ingredientService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<IngredientDto> getIngredient(@PathVariable Long id){
        return ResponseEntity.ok(ingredientService.findById(id));
    }

    @PostMapping
    public ResponseEntity<IngredientDto> saveIngredient(@RequestBody IngredientDto dto){
        return ResponseEntity.ok(ingredientService.save(dto));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<IngredientDto> changeIngredient(@PathVariable Long id, @RequestBody IngredientDto dto){
        return ResponseEntity.ok(ingredientService.change(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteIngredient(@PathVariable Long id){
        return ResponseEntity.ok(ingredientService.delete(id));
    }

    
}
