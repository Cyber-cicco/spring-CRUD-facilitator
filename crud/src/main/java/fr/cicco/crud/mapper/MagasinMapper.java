package fr.cicco.crud.mapper;
import org.mapstruct.Mapper;    
    
import fr.cicco.crud.entity.Magasin;
import fr.cicco.crud.dto.MagasinDto;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring")
public interface MagasinMapper   {

    @Mapping(target = "commandeList", ignore = true)
    Magasin toMagasin(MagasinDto magasindto);

    MagasinDto toMagasinDto(Magasin magasin);      
    
}
