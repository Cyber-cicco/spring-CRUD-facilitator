package fr.cicco.crud.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;    
    

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CommandeMenuDto {
    private Long id;
    private Integer nbMenus;
    private MenuDto menu;

}
