package fr.cicco.crud.mapper;
import org.mapstruct.Mapper;    
    
import fr.cicco.crud.entity.Accompagnement;
import fr.cicco.crud.dto.AccompagnementDto;    
    

@Mapper(componentModel = "spring")
public interface AccompagnementMapper   {

    Accompagnement toAccompagnement(AccompagnementDto accompagnementdto);

    AccompagnementDto toAccompagnementDto(Accompagnement accompagnement);      
    
}
