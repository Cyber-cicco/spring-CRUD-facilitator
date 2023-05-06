package fr.cicco.crud.mapper;
import fr.cicco.crud.entity.Adresse;
import fr.cicco.crud.repository.AdresseRepository;
import org.mapstruct.Mapper;
    
import fr.cicco.crud.entity.Magasin;
import fr.cicco.crud.dto.MagasinDto;


@Mapper(componentModel = "spring")
public interface MagasinMapper   {

    default Magasin toMagasin(MagasinDto magasindto, AdresseRepository adresseRepository){
        return Magasin.builder()
                .nom(magasindto.getNom())
                .adresse(adresseRepository.findAdresseByCodePostalAndVilleAndRue(magasindto.getAdresse().getCodePostal(), magasindto.getAdresse().getVille(), magasindto.getAdresse().getRue()).orElseGet(()->{
                    Adresse adresse = Adresse.builder()
                            .ville(magasindto.getAdresse().getVille())
                            .rue(magasindto.getAdresse().getRue())
                            .codePostal(magasindto.getAdresse().getCodePostal())
                            .build();
                    adresseRepository.save(adresse);
                    return adresse;
                }))
                .build();
    }

    MagasinDto toMagasinDto(Magasin magasin);      
    
}
