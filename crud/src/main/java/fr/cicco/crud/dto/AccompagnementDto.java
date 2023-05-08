package fr.cicco.crud.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;    
    

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AccompagnementDto   {
    private Long id;
    private String nom;
    private String typeAccompagnement;
    private Double prix;

}
