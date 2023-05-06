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
public class UtilisateurDto   {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String motDePasse;
    private Boolean isAdmin;
    private Boolean isLivreur;
    private List<AdresseDto> adresseList;
    private List<CommandeDto> commandeList;

}
