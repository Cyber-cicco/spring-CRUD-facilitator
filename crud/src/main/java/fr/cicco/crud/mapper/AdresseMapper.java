package fr.cicco.crud.mapper;
import org.mapstruct.Mapper;    
    
import fr.cicco.crud.entity.Adresse;
import fr.cicco.crud.dto.AdresseDto;    
    

@Mapper(componentModel = "spring")
public interface AdresseMapper   {

    Adresse toAdresse(AdresseDto adressedto);

    AdresseDto toAdresseDto(Adresse adresse);      
    
}
