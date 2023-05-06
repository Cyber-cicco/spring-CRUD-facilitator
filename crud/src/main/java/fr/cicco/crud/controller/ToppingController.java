package fr.cicco.crud.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;    
    
import fr.cicco.crud.dto.ToppingDto;
import org.springframework.http.ResponseEntity;
import fr.cicco.crud.service.ToppingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;    
    

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/topping")
public class ToppingController   {

   
    private final ToppingService toppingService;

    @GetMapping("/all")
    public ResponseEntity<List<ToppingDto>> getAllTopping(){
        return ResponseEntity.ok(toppingService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ToppingDto> getTopping(@PathVariable Long id){
        return ResponseEntity.ok(toppingService.findById(id));
    }

    @PostMapping
    public ResponseEntity<ToppingDto> saveTopping(@RequestBody ToppingDto dto){
        return ResponseEntity.ok(toppingService.save(dto));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ToppingDto> changeTopping(@PathVariable Long id, @RequestBody ToppingDto dto){
        return ResponseEntity.ok(toppingService.change(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteTopping(@PathVariable Long id){
        return ResponseEntity.ok(toppingService.delete(id));
    }

    
}
