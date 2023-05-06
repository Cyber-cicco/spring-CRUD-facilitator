package fr.cicco.crud.mapper;
import org.mapstruct.Mapper;    
    
import fr.cicco.crud.entity.Menu;
import fr.cicco.crud.dto.MenuDto;    
    

@Mapper(componentModel = "spring")
public interface MenuMapper   {

    Menu toMenu(MenuDto menudto);

    MenuDto toMenuDto(Menu menu);      
    
}
