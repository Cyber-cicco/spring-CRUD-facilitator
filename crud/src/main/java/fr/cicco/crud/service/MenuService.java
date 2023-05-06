package fr.cicco.crud.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;    
    
import fr.cicco.crud.dto.MenuDto;
import fr.cicco.crud.mapper.MenuMapper;
import fr.cicco.crud.repository.MenuRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;    
    

@Service
@Validated
@RequiredArgsConstructor
public class MenuService   {


    private final MenuRepository menuRepository;
    private final MenuMapper menuMapper;

    public List<MenuDto> findAll() {
        return menuRepository.findAll().stream()
            .map(menuMapper::toMenuDto)
            .toList();
    }

    public MenuDto findById(Long id) {
        //TODO change type of exception with custom exception. Add exception handler
        return menuMapper.toMenuDto(menuRepository.findById(id).orElseThrow(RuntimeException::new));
    }
    
    public MenuDto save(MenuDto menuDto) {
        menuRepository.save(menuMapper.toMenu(menuDto));
        return menuDto;
    }
    
    public MenuDto change(Long id, MenuDto menuDto) {
        //TODO implement logic.
        return null;
    }
    
    public Map<String, String> delete(Long id) {
        //TODO customiser le message de réponse
        Map<String, String> response = new HashMap<>();
        response.put("message", "entity has been deleted");
        menuRepository.deleteById(id);
        return response;
    }      
    
}
