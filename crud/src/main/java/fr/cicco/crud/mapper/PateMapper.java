package fr.cicco.crud.mapper;
import org.mapstruct.Mapper;    
    
import fr.cicco.crud.entity.Pate;
import fr.cicco.crud.dto.PateDto;    
    

@Mapper(componentModel = "spring")
public interface PateMapper   {

    Pate toPate(PateDto patedto);

    PateDto toPateDto(Pate pate);      
    
}
