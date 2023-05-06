package fr.cicco.crud.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;    
    
import fr.cicco.crud.dto.UtilisateurDto;
import fr.cicco.crud.mapper.UtilisateurMapper;
import fr.cicco.crud.repository.UtilisateurRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;    
    

@Service
@Validated
@RequiredArgsConstructor
public class UtilisateurService   {


    private final UtilisateurRepository utilisateurRepository;
    private final UtilisateurMapper utilisateurMapper;

    public List<UtilisateurDto> findAll() {
        return utilisateurRepository.findAll().stream()
            .map(utilisateurMapper::toUtilisateurDto)
            .toList();
    }

    public UtilisateurDto findById(Long id) {
        //TODO change type of exception with custom exception. Add exception handler
        return utilisateurMapper.toUtilisateurDto(utilisateurRepository.findById(id).orElseThrow(RuntimeException::new));
    }
    
    public UtilisateurDto save(UtilisateurDto utilisateurDto) {
        utilisateurRepository.save(utilisateurMapper.toUtilisateur(utilisateurDto));
        return utilisateurDto;
    }
    
    public UtilisateurDto change(Long id, UtilisateurDto utilisateurDto) {
        //TODO implement logic.
        return null;
    }
    
    public Map<String, String> delete(Long id) {
        //TODO customiser le message de réponse
        Map<String, String> response = new HashMap<>();
        response.put("message", "entity has been deleted");
        utilisateurRepository.deleteById(id);
        return response;
    }      
    
}
