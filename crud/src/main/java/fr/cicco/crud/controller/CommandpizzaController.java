package fr.cicco.crud.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;    
    
import fr.cicco.crud.dto.CommandePizzaDto;
import org.springframework.http.ResponseEntity;
import fr.cicco.crud.service.CommandpizzaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;    
    

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/commandpizza")
public class CommandpizzaController   {

   
    private final CommandpizzaService commandpizzaService;

    @GetMapping("/all")
    public ResponseEntity<List<CommandePizzaDto>> getAllCommandpizza(){
        return ResponseEntity.ok(commandpizzaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommandePizzaDto> getCommandpizza(@PathVariable Long id){
        return ResponseEntity.ok(commandpizzaService.findById(id));
    }

    @PostMapping
    public ResponseEntity<CommandePizzaDto> saveCommandpizza(@RequestBody CommandePizzaDto dto){
        return ResponseEntity.ok(commandpizzaService.save(dto));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<CommandePizzaDto> changeCommandpizza(@PathVariable Long id, @RequestBody CommandePizzaDto dto){
        return ResponseEntity.ok(commandpizzaService.change(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteCommandpizza(@PathVariable Long id){
        return ResponseEntity.ok(commandpizzaService.delete(id));
    }

    
}
