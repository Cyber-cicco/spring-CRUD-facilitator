package fr.cicco.crud.mapper;
import fr.cicco.crud.entity.Adresse;
import fr.cicco.crud.repository.AdresseRepository;
import org.mapstruct.Mapper;
    
import fr.cicco.crud.entity.Utilisateur;
import fr.cicco.crud.dto.UtilisateurDto;

import java.util.List;


@Mapper(componentModel = "spring")
public interface UtilisateurMapper   {

    default Utilisateur toUtilisateur(UtilisateurDto utilisateurdto, AdresseRepository adresseRepository){
        int sizeOfAdresse = utilisateurdto.getAdresseList().size() - 1;
        String ville = utilisateurdto.getAdresseList().get(sizeOfAdresse).getVille();
        String codePostal = utilisateurdto.getAdresseList().get(sizeOfAdresse).getCodePostal();
        String rue = utilisateurdto.getAdresseList().get(sizeOfAdresse).getRue();
        return Utilisateur.builder()
                .email(utilisateurdto.getEmail())
                .nom(utilisateurdto.getNom())
                .prenom(utilisateurdto.getPrenom())
                .isLivreur(utilisateurdto.getIsLivreur())
                .isAdmin(utilisateurdto.getIsAdmin())
                .motDePasse(utilisateurdto.getMotDePasse())
                .adresseList(List.of(adresseRepository.findAdresseByCodePostalAndVilleAndRue(codePostal, ville, rue).orElseGet(()->{
                    Adresse adresse = Adresse.builder()
                            .ville(ville)
                            .rue(rue)
                            .codePostal(codePostal)
                            .build();
                    adresseRepository.save(adresse);
                    return adresse;
                        })))
                .build();
    }

    UtilisateurDto toUtilisateurDto(Utilisateur utilisateur);      
    
}
