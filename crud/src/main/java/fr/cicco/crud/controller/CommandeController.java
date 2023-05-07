package fr.cicco.crud.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;    
    
import fr.cicco.crud.dto.CommandeDto;
import org.springframework.http.ResponseEntity;
import fr.cicco.crud.service.CommandeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;    
    

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/commande")
public class CommandeController   {

   
    private final CommandeService commandeService;

    @GetMapping("/all")
    public ResponseEntity<List<CommandeDto>> getAllCommande(){
        return ResponseEntity.ok(commandeService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommandeDto> getCommande(@PathVariable Long id){
        return ResponseEntity.ok(commandeService.findById(id));
    }

    @PostMapping
    public ResponseEntity<CommandeDto> saveCommande(@RequestBody CommandeDto dto){
        return ResponseEntity.ok(commandeService.save(dto));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<CommandeDto> changeCommande(@PathVariable Long id, @RequestBody CommandeDto dto){
        return ResponseEntity.ok(commandeService.change(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteCommande(@PathVariable Long id){
        return ResponseEntity.ok(commandeService.delete(id));
    }

    
}
