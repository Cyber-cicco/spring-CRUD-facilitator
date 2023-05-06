package fr.cicco.crud.mapper;
import fr.cicco.crud.exception.EntityNotFoundException;
import fr.cicco.crud.repository.IngredientRepository;
import fr.cicco.crud.repository.ToppingRepository;
import org.mapstruct.Mapper;
    
import fr.cicco.crud.entity.Pizza;
import fr.cicco.crud.dto.PizzaDto;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring")
public interface PizzaMapper   {

    @Mapping(target = "toppingList", ignore = true)
    @Mapping(target = "ingredientList", ignore = true)
    Pizza toSimplePizza(PizzaDto pizzaDto);
    default Pizza toPizza(PizzaDto pizzadto, ToppingRepository toppingRepository, IngredientRepository ingredientRepository){
           Pizza pizza = toSimplePizza(pizzadto);
           pizza.setToppingList(pizzadto.getToppingList().stream()
                   .map(toppingDto -> toppingRepository.findToppingByNom(toppingDto.getNom()).orElseThrow(EntityNotFoundException::new))
                   .toList());
           pizza.setIngredientList(pizzadto.getIngredientList().stream()
                   .map(ingredientDto -> ingredientRepository.findByNom(ingredientDto.getNom()).orElseThrow(EntityNotFoundException::new))
                   .toList());
           return pizza;
    }

    PizzaDto toPizzaDto(Pizza pizza);      
    
}
