package fr.cicco.crud.mapper;
import fr.cicco.crud.exception.EntityNotFoundException;
import fr.cicco.crud.repository.AccompagnementRepository;
import org.mapstruct.Mapper;
    
import fr.cicco.crud.entity.Menu;
import fr.cicco.crud.dto.MenuDto;    
    

@Mapper(componentModel = "spring")
public interface MenuMapper   {

    default Menu toMenu(MenuDto menudto, AccompagnementRepository accompagnementRepository){
        return Menu.builder()
                .prix(menudto.getPrix())
                .nom(menudto.getNom())
                .description(menudto.getDescription())
                .photo(menudto.getPhoto())
                .accompagnementList(menudto.getAccompagnementList().stream()
                        .map(accompagnementDto -> accompagnementRepository.findByNom(accompagnementDto.getNom())
                                .orElseThrow(EntityNotFoundException::new))
                        .toList())
                .build();
    }

    MenuDto toMenuDto(Menu menu);      
    
}
