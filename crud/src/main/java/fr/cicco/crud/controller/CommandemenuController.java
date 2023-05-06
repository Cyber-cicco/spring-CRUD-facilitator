package fr.cicco.crud.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;    
    
import fr.cicco.crud.dto.CommandeMenuDto;
import org.springframework.http.ResponseEntity;
import fr.cicco.crud.service.CommandemenuService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;    
    

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/commandemenu")
public class CommandemenuController   {

   
    private final CommandemenuService commandemenuService;

    @GetMapping("/all")
    public ResponseEntity<List<CommandeMenuDto>> getAllCommandemenu(){
        return ResponseEntity.ok(commandemenuService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommandeMenuDto> getCommandemenu(@PathVariable Long id){
        return ResponseEntity.ok(commandemenuService.findById(id));
    }

    @PostMapping
    public ResponseEntity<CommandeMenuDto> saveCommandemenu(@RequestBody CommandeMenuDto dto){
        return ResponseEntity.ok(commandemenuService.save(dto));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<CommandeMenuDto> changeCommandemenu(@PathVariable Long id, @RequestBody CommandeMenuDto dto){
        return ResponseEntity.ok(commandemenuService.change(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteCommandemenu(@PathVariable Long id){
        return ResponseEntity.ok(commandemenuService.delete(id));
    }

    
}
