package fr.cicco.crud.repository;

import fr.cicco.crud.entity.Topping;
import org.springframework.data.jpa.repository.JpaRepository;    

import java.util.Optional;
    

public interface ToppingRepository extends JpaRepository<Topping, Long>  {

}
