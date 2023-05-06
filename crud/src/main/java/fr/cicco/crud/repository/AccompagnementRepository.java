package fr.cicco.crud.repository;

import fr.cicco.crud.entity.Accompagnement;
import org.springframework.data.jpa.repository.JpaRepository;    

import java.util.Optional;
    

public interface AccompagnementRepository extends JpaRepository<Accompagnement, Long>  {

}
