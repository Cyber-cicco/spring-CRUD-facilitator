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
public class MenuDto   {
    private Long id;
    private Double prix;
    private String nom;
    private String photo;
    private String description;
    private List<AccompagnementDto> accompagnementList;
    private List<PizzaDto> pizzaList;

}
