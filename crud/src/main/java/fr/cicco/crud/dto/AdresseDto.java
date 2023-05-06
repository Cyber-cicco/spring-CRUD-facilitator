package fr.cicco.crud.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;    
    

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AdresseDto   {
    private Long id;
    private String rue;
    private String ville;
    private String codePostal;

}