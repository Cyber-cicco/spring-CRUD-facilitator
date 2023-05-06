package fr.cicco.crud.mapper;
import org.mapstruct.Mapper;    
    
import fr.cicco.crud.entity.Utilisateur;
import fr.cicco.crud.dto.UtilisateurDto;    
    

@Mapper(componentModel = "spring")
public interface UtilisateurMapper   {

    Utilisateur toUtilisateur(UtilisateurDto utilisateurdto);

    UtilisateurDto toUtilisateurDto(Utilisateur utilisateur);      
    
}
