package fr.cicco.crud.repository;

import fr.cicco.crud.entity.Pizza;
import org.springframework.data.jpa.repository.JpaRepository;    

import java.util.Optional;
    

public interface PizzaRepository extends JpaRepository<Pizza, Long>  {
    Optional<Pizza> findPizzaByCode(String code);

}
