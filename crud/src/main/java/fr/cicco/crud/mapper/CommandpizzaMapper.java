package fr.cicco.crud.mapper;
import org.mapstruct.Mapper;    
    
import fr.cicco.crud.entity.CommandePizza;
import fr.cicco.crud.dto.CommandePizzaDto;
    

@Mapper(componentModel = "spring")
public interface CommandpizzaMapper   {

    CommandePizza toCommandpizza(CommandePizzaDto commandpizzadto);

    CommandePizzaDto toCommandpizzaDto(CommandePizza commandePizza);
    
}
