package fr.cicco.crud.mapper;
import org.mapstruct.Mapper;    
    
import fr.cicco.crud.entity.Topping;
import fr.cicco.crud.dto.ToppingDto;    
    

@Mapper(componentModel = "spring")
public interface ToppingMapper   {

    Topping toTopping(ToppingDto toppingdto);

    ToppingDto toToppingDto(Topping topping);      
    
}
