package fr.cicco.crud.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CommandeDto   {
    private Long id;
    private String emailClient;
    private String emailLivreur;
    private List<CommandePizzaDto> commandePizzaList;
    private String status;
    private LocalDateTime dateCommande;
    private String nomMagasin;
    private List<CommandeMenuDto> commandeMenuList;
    private AdresseDto adresse;

}
