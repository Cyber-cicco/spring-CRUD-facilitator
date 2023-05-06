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
public class Menu   {
    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double prix;
    private String nom;
    private String photo;
    private String description;
    @ManyToMany
    @JoinTable(name="accompagnement_menu",
            joinColumns = @JoinColumn(name="menu_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name="accompagnement_id", referencedColumnName = "id")
    )
    private List<Accompagnement> accompagnementList;
    @ManyToMany
    @JoinTable(name="menu_pizza",
            joinColumns = @JoinColumn(name="menu_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name="pizza_id", referencedColumnName = "id")
    )
    private List<Pizza> pizzaList;
    @OneToMany(mappedBy = "menu")
    private List<CommandeMenu> commandeMenuList;

}
