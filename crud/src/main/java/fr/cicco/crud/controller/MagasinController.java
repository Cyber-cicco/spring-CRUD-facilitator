package fr.cicco.crud.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;    
    
import fr.cicco.crud.dto.MagasinDto;
import org.springframework.http.ResponseEntity;
import fr.cicco.crud.service.MagasinService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;    
    

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/magasin")
public class MagasinController   {

   
    private final MagasinService magasinService;

    @GetMapping("/all")
    public ResponseEntity<List<MagasinDto>> getAllMagasin(){
        return ResponseEntity.ok(magasinService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MagasinDto> getMagasin(@PathVariable Long id){
        return ResponseEntity.ok(magasinService.findById(id));
    }

    @PostMapping
    public ResponseEntity<MagasinDto> saveMagasin(@RequestBody MagasinDto dto){
        return ResponseEntity.ok(magasinService.save(dto));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<MagasinDto> changeMagasin(@PathVariable Long id, @RequestBody MagasinDto dto){
        return ResponseEntity.ok(magasinService.change(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteMagasin(@PathVariable Long id){
        return ResponseEntity.ok(magasinService.delete(id));
    }

    
}
