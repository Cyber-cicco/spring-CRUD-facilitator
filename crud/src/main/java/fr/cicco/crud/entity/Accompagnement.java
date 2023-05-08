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
public class Accompagnement   {
    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String typeAccompagnement;
    private Double prix;
    @ManyToMany
    @JoinTable(name="accompagnement_menu",
            joinColumns = @JoinColumn(name="accompagnement_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name="menu_id", referencedColumnName = "id")
    )
    private List<Menu> menuList;

}
