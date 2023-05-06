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
public class Pizza   {
    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private Double prix;
    private String toCreate;
    @ManyToOne
    @JoinColumn(name = "pate_id")
    private Pate pate;
    private String code;
    private String categorie;
    private Integer version;
    @ManyToMany
    @JoinTable(name="pizza_topping",
            joinColumns = @JoinColumn(name="pizza_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name="topping_id", referencedColumnName = "id")
    )
    private List<Topping> toppingList;
    @ManyToMany
    @JoinTable(name="ingredient_pizza",
            joinColumns = @JoinColumn(name="pizza_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name="ingredient_id", referencedColumnName = "id")
    )
    private List<Ingredient> ingredientList;
    @OneToMany(mappedBy = "pizza")
    private List<CommandePizza> commandePizzaList;

}
