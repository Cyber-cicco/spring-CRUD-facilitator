package fr.cicco.crud.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;    
    
import fr.cicco.crud.dto.AccompagnementDto;
import org.springframework.http.ResponseEntity;
import fr.cicco.crud.service.AccompagnementService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;    
    

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/accompagnement")
public class AccompagnementController   {

   
    private final AccompagnementService accompagnementService;

    @GetMapping("/all")
    public ResponseEntity<List<AccompagnementDto>> getAllAccompagnement(){
        return ResponseEntity.ok(accompagnementService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccompagnementDto> getAccompagnement(@PathVariable Long id){
        return ResponseEntity.ok(accompagnementService.findById(id));
    }

    @PostMapping
    public ResponseEntity<AccompagnementDto> saveAccompagnement(@RequestBody AccompagnementDto dto){
        return ResponseEntity.ok(accompagnementService.save(dto));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<AccompagnementDto> changeAccompagnement(@PathVariable Long id, @RequestBody AccompagnementDto dto){
        return ResponseEntity.ok(accompagnementService.change(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteAccompagnement(@PathVariable Long id){
        return ResponseEntity.ok(accompagnementService.delete(id));
    }

    
}
