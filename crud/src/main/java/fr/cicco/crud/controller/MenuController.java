package fr.cicco.crud.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;    
    
import fr.cicco.crud.dto.MenuDto;
import org.springframework.http.ResponseEntity;
import fr.cicco.crud.service.MenuService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;    
    

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/menu")
public class MenuController   {

   
    private final MenuService menuService;

    @GetMapping("/all")
    public ResponseEntity<List<MenuDto>> getAllMenu(){
        return ResponseEntity.ok(menuService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MenuDto> getMenu(@PathVariable Long id){
        return ResponseEntity.ok(menuService.findById(id));
    }

    @PostMapping
    public ResponseEntity<MenuDto> saveMenu(@RequestBody MenuDto dto){
        return ResponseEntity.ok(menuService.save(dto));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<MenuDto> changeMenu(@PathVariable Long id, @RequestBody MenuDto dto){
        return ResponseEntity.ok(menuService.change(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteMenu(@PathVariable Long id){
        return ResponseEntity.ok(menuService.delete(id));
    }

    
}
