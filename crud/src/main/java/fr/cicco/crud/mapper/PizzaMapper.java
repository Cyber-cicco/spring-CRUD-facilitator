package fr.cicco.crud.mapper;
import org.mapstruct.Mapper;    
    
import fr.cicco.crud.entity.Pizza;
import fr.cicco.crud.dto.PizzaDto;    
    

@Mapper(componentModel = "spring")
public interface PizzaMapper   {

    Pizza toPizza(PizzaDto pizzadto);

    PizzaDto toPizzaDto(Pizza pizza);      
    
}
