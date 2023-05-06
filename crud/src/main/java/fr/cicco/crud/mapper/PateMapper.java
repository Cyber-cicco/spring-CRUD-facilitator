package fr.cicco.crud.mapper;
import org.mapstruct.Mapper;    
    
import fr.cicco.crud.entity.Pate;
import fr.cicco.crud.dto.PateDto;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring")
public interface PateMapper   {

    @Mapping(target = "pizzaList", ignore = true)
    Pate toPate(PateDto patedto);

    PateDto toPateDto(Pate pate);      
    
}
