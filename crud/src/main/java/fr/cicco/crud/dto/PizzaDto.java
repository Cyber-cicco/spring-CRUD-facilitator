package fr.cicco.crud.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;    
    
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PizzaDto   {
    private Long id;
    private String nom;
    private Double prix;
    private String toCreate;
    private PateDto pate;
    private String code;
    private String categorie;
    private Integer version;
    private List<ToppingDto> toppingList;
    private List<IngredientDto> ingredientList;

}
