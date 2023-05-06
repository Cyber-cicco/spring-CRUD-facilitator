package fr.cicco.crud.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;    
    
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class MagasinDto   {
    private Long id;
    private String nom;
    private Double prix;
    private List<CommandeDto> commandeList;

}
