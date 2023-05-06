package fr.cicco.crud.mapper;
import org.mapstruct.Mapper;    
    
import fr.cicco.crud.entity.Commande;
import fr.cicco.crud.dto.CommandeDto;    
    

@Mapper(componentModel = "spring")
public interface CommandeMapper   {

    Commande toCommande(CommandeDto commandedto);

    CommandeDto toCommandeDto(Commande commande);      
    
}
