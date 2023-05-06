package fr.cicco.crud.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;    
    
import fr.cicco.crud.dto.PateDto;
import org.springframework.http.ResponseEntity;
import fr.cicco.crud.service.PateService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;    
    

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/pate")
public class PateController   {

   
    private final PateService pateService;

    @GetMapping("/all")
    public ResponseEntity<List<PateDto>> getAllPate(){
        return ResponseEntity.ok(pateService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PateDto> getPate(@PathVariable Long id){
        return ResponseEntity.ok(pateService.findById(id));
    }

    @PostMapping
    public ResponseEntity<PateDto> savePate(@RequestBody PateDto dto){
        return ResponseEntity.ok(pateService.save(dto));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<PateDto> changePate(@PathVariable Long id, @RequestBody PateDto dto){
        return ResponseEntity.ok(pateService.change(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deletePate(@PathVariable Long id){
        return ResponseEntity.ok(pateService.delete(id));
    }

    
}
