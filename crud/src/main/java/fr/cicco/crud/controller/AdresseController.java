package fr.cicco.crud.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;    
    
import fr.cicco.crud.dto.AdresseDto;
import org.springframework.http.ResponseEntity;
import fr.cicco.crud.service.AdresseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;    
    

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/adresse")
public class AdresseController   {

   
    private final AdresseService adresseService;

    @GetMapping("/all")
    public ResponseEntity<List<AdresseDto>> getAllAdresse(){
        return ResponseEntity.ok(adresseService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdresseDto> getAdresse(@PathVariable Long id){
        return ResponseEntity.ok(adresseService.findById(id));
    }

    @PostMapping
    public ResponseEntity<AdresseDto> saveAdresse(@RequestBody AdresseDto dto){
        return ResponseEntity.ok(adresseService.save(dto));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<AdresseDto> changeAdresse(@PathVariable Long id, @RequestBody AdresseDto dto){
        return ResponseEntity.ok(adresseService.change(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteAdresse(@PathVariable Long id){
        return ResponseEntity.ok(adresseService.delete(id));
    }

    
}
