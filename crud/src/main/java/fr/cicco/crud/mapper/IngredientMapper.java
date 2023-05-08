package fr.cicco.crud.mapper;
import org.mapstruct.Mapper;    
    
import fr.cicco.crud.entity.Ingredient;
import fr.cicco.crud.dto.IngredientDto;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring")
public interface IngredientMapper   {

    @Mapping(target = "pizzaList", ignore = true)
    Ingredient toIngredient(IngredientDto ingredientdto);

    IngredientDto toIngredientDto(Ingredient ingredient);      
    
}
