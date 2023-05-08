package fr.cicco.crud.repository;

import fr.cicco.crud.entity.Adresse;
import org.springframework.data.jpa.repository.JpaRepository;    

import java.util.Optional;
    

public interface AdresseRepository extends JpaRepository<Adresse, Long>  {
    Optional<Adresse> findAdresseByCodePostalAndVilleAndRue(String codePostal, String ville, String rue);

}
