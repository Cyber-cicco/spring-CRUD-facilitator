package fr.cicco.crud.repository;

import fr.cicco.crud.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
    

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long>  {
    Optional<Utilisateur> findUtilisateurByEmail(String email);

}