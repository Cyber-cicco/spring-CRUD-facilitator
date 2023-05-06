package fr.cicco.crud.repository;

import fr.cicco.crud.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;    

import java.util.Optional;
    

public interface IngredientRepository extends JpaRepository<Ingredient, Long>  {
    Optional<Ingredient> findByNom(String nom);
}
