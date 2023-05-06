package fr.cicco.crud.mapper;
import org.mapstruct.Mapper;    
    
import fr.cicco.crud.entity.Accompagnement;
import fr.cicco.crud.dto.AccompagnementDto;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring")
public interface AccompagnementMapper   {

    @Mapping(target = "menuList", ignore = true)
    Accompagnement toAccompagnement(AccompagnementDto accompagnementdto);

    AccompagnementDto toAccompagnementDto(Accompagnement accompagnement);      
    
}
