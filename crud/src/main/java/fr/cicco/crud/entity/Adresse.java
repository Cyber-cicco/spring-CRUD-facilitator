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
public class Adresse   {
    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String rue;
    private String ville;
    private String codePostal;
    @ManyToMany
    @JoinTable(name="adresse_utilisateur",
            joinColumns = @JoinColumn(name="adresse_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name="utilisateur_id", referencedColumnName = "id")
    )
    private List<Utilisateur> utilisateurList;
    @OneToMany(mappedBy = "adresse")
    private List<Commande> commandeList;

}
