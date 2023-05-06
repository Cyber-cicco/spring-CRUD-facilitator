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
public class Utilisateur   {
    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String motDePasse;
    private Boolean isAdmin;
    private Boolean isLivreur;
    @ManyToMany
    @JoinTable(name="adresse_utilisateur",
            joinColumns = @JoinColumn(name="utilisateur_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name="adresse_id", referencedColumnName = "id")
    )
    private List<Adresse> adresseList;
    @OneToMany(mappedBy = "client")
    private List<Commande> commandeAsClientList;
    @OneToMany(mappedBy = "livreur")
    private List<Commande> commandeAsLivreurList;

}
