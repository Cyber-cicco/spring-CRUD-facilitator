package fr.cicco.crud.mapper;
import org.mapstruct.Mapper;    
    
import fr.cicco.crud.entity.Adresse;
import fr.cicco.crud.dto.AdresseDto;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring")
public interface AdresseMapper   {

    @Mapping(target = "utilisateurList", ignore = true)
    @Mapping(target = "commandeList", ignore = true)
    Adresse toAdresse(AdresseDto adressedto);

    AdresseDto toAdresseDto(Adresse adresse);      
    
}
