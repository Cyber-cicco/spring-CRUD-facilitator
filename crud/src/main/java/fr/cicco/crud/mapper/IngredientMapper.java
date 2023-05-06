package fr.cicco.crud.mapper;
import org.mapstruct.Mapper;    
    
import fr.cicco.crud.entity.Ingredient;
import fr.cicco.crud.dto.IngredientDto;    
    

@Mapper(componentModel = "spring")
public interface IngredientMapper   {

    Ingredient toIngredient(IngredientDto ingredientdto);

    IngredientDto toIngredientDto(Ingredient ingredient);      
    
}
