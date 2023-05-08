package fr.cicco.crud.repository;

import fr.cicco.crud.entity.Commande;
import org.springframework.data.jpa.repository.JpaRepository;    

import java.util.Optional;
    

public interface CommandeRepository extends JpaRepository<Commande, Long>  {

}
