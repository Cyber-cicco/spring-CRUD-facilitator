package fr.cicco.crud.repository;

import fr.cicco.crud.entity.Pate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
    

public interface PateRepository extends JpaRepository<Pate, Long>  {
    Optional<Pate> findByNom(String nom);
}
