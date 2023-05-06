package fr.cicco.crud.mapper;
import org.mapstruct.Mapper;    
    
import fr.cicco.crud.entity.Topping;
import fr.cicco.crud.dto.ToppingDto;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring")
public interface ToppingMapper   {
    @Mapping(target = "pizzaList", ignore = true)
    Topping toTopping(ToppingDto toppingdto);

    ToppingDto toToppingDto(Topping topping);      
    
}
