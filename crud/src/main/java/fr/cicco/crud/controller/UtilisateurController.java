package fr.cicco.crud.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;    
    
import fr.cicco.crud.dto.UtilisateurDto;
import org.springframework.http.ResponseEntity;
import fr.cicco.crud.service.UtilisateurService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;    
    

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/utilisateur")
public class UtilisateurController   {

   
    private final UtilisateurService utilisateurService;

    @GetMapping("/all")
    public ResponseEntity<List<UtilisateurDto>> getAllUtilisateur(){
        return ResponseEntity.ok(utilisateurService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UtilisateurDto> getUtilisateur(@PathVariable Long id){
        return ResponseEntity.ok(utilisateurService.findById(id));
    }

    @PostMapping
    public ResponseEntity<UtilisateurDto> saveUtilisateur(@RequestBody UtilisateurDto dto){
        return ResponseEntity.ok(utilisateurService.save(dto));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UtilisateurDto> changeUtilisateur(@PathVariable Long id, @RequestBody UtilisateurDto dto){
        return ResponseEntity.ok(utilisateurService.change(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteUtilisateur(@PathVariable Long id){
        return ResponseEntity.ok(utilisateurService.delete(id));
    }

    
}
