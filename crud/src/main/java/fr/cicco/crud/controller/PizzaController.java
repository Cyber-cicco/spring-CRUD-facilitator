package fr.cicco.crud.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;    
    
import fr.cicco.crud.dto.PizzaDto;
import org.springframework.http.ResponseEntity;
import fr.cicco.crud.service.PizzaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;    
    

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/pizza")
public class PizzaController   {

   
    private final PizzaService pizzaService;

    @GetMapping("/all")
    public ResponseEntity<List<PizzaDto>> getAllPizza(){
        return ResponseEntity.ok(pizzaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PizzaDto> getPizza(@PathVariable Long id){
        return ResponseEntity.ok(pizzaService.findById(id));
    }

    @PostMapping
    public ResponseEntity<PizzaDto> savePizza(@RequestBody PizzaDto dto){
        return ResponseEntity.ok(pizzaService.save(dto));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<PizzaDto> changePizza(@PathVariable Long id, @RequestBody PizzaDto dto){
        return ResponseEntity.ok(pizzaService.change(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deletePizza(@PathVariable Long id){
        return ResponseEntity.ok(pizzaService.delete(id));
    }

    
}
