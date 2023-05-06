package fr.cicco.crud.mapper;
import org.mapstruct.Mapper;    
    
import fr.cicco.crud.entity.CommandeMenu;
import fr.cicco.crud.dto.CommandeMenuDto;
    

@Mapper(componentModel = "spring")
public interface CommandemenuMapper   {

    CommandeMenu toCommandemenu(CommandeMenuDto commandemenudto);

    CommandeMenuDto toCommandemenuDto(CommandeMenu commandemenu);
    
}
