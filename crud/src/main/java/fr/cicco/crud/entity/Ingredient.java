package fr.cicco.crud.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;    
    
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Builder
public class Ingredient   {
    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private Double prix;
    @ManyToMany
    @JoinTable(name="ingredient_pizza",
            joinColumns = @JoinColumn(name="ingredient_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name="pizza_id", referencedColumnName = "id")
    )
    private List<Pizza> pizzaList;

}
