package fr.cicco.crud.mapper;
import org.mapstruct.Mapper;    
    
import fr.cicco.crud.entity.Magasin;
import fr.cicco.crud.dto.MagasinDto;    
    

@Mapper(componentModel = "spring")
public interface MagasinMapper   {

    Magasin toMagasin(MagasinDto magasindto);

    MagasinDto toMagasinDto(Magasin magasin);      
    
}
