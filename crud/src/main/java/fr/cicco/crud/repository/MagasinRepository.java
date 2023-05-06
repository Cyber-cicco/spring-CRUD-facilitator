package fr.cicco.crud.repository;

import fr.cicco.crud.entity.Magasin;
import org.springframework.data.jpa.repository.JpaRepository;    

import java.util.Optional;
    

public interface MagasinRepository extends JpaRepository<Magasin, Long>  {
    Optional<Magasin> findMagasinByNom(String nom);
}
