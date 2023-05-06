package fr.cicco.crud.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Builder
public class Commande   {
    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_livreur")
    private Utilisateur livreur;

    @OneToMany(mappedBy = "commande")
    private List<CommandePizza> commandePizzaList;
    @ManyToOne
    @JoinColumn(name = "client_id")
    private Utilisateur client;
    private String status;
    private LocalDateTime dateCommande;
    @ManyToOne
    @JoinColumn(name = "magasin_id")
    private Magasin magasin;
    @OneToMany(mappedBy = "commande")
    private List<CommandeMenu> commandeMenuList;
    @ManyToOne
    @JoinColumn(name="adresse_id")
    private Adresse adresse;

}
