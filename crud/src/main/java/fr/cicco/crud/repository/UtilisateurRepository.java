package fr.cicco.crud.repository;

import fr.cicco.crud.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
    

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long>  {
    Optional<Utilisateur> findUtilisateurByEmail(String email);
    List<Utilisateur> findUtilisateursByIsLivreur(Boolean isLivreur);
    List<Utilisateur> findUtilisateursByIsLivreurAndIsAdmin(Boolean isLivreur, Boolean isAdmin);

}
