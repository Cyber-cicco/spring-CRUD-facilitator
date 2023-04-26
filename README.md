# Spring CRUD facilitator

Petit CLI pour Spring, permettant d'autogénérer du code répétitif pour ses différentes entités JPA. Demande d'avoir déjà initialisé un projet Spring, et d'avoir les dépendances vers Lombok, spring-boot-starter-data-jpa et mapstruct
Demande également d'avoir configuré l'ordre de prise en compte de mapstruct et lombok dans la partie plugins du pom.xml. Vous pouvez vous référer au pom du projet. Ne fonctionne qu'avec un projet maven

Outil expérimental, tout n'est pas encore fonctionnel

## L'installer:

Copiez-collez le fichier spring.py et le dossier springCli à la racine d'un projet spring, à coté du pom.
Ensuite, exécutez les commandes dans un terminal dans le dossier où se trouve spring.py

## Branches fonctionelles:

### Génération de services et interfaces angular à partir des Dtos et controllers d'un prjet sping :

Pour faire cela, il faut avoir créer tout un backend fonctionnel, avec Dtos et controllers
Ensuite, en exécutant la commande:
```bash
python3 spring.py --angular
```
A partir d'un controller comme celui-ci:

```java
package fr.cicco.crud.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;    
    
import fr.cicco.crud.dto.CinemaDto;
import org.springframework.http.ResponseEntity;
import fr.cicco.crud.service.CinemaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;    
    

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/cinema")
public class CinemaController   {

   
    private final CinemaService cinemaService;

    @GetMapping("/all")
    public ResponseEntity<List<CinemaDto>> getAllCinema(){
        return ResponseEntity.ok(cinemaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CinemaDto> getCinema(@PathVariable Long id){
        return ResponseEntity.ok(cinemaService.findById(id));
    }

    @PostMapping
    public ResponseEntity<CinemaDto> saveCinema(@RequestBody CinemaDto dto){
        return ResponseEntity.ok(cinemaService.save(dto));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<CinemaDto> changeCinema(@PathVariable Long id, @RequestBody CinemaDto dto){
        return ResponseEntity.ok(cinemaService.change(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteCinema(@PathVariable Long id){
        return ResponseEntity.ok(cinemaService.delete(id));
    }

    
}

```

Vous obtiendrez un service comme celui-ci:

```typescript
//path du controller : /src/main/java/fr/cicco/crud/controller/CinemaController.java
import { environnement } from '../environnements/environnement';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import {Cinema} from "../models/cinema";

@Injectable({
  providedIn: 'root'
})
export class CinemaService{

   private URL_API_API_V1_CINEMA_ID = environnement.urlApi + "/api/v1/cinema/{id}";
   private URL_API_API_V1_CINEMA_ALL = environnement.urlApi + "/api/v1/cinema/all";
   private URL_API_API_V1_CINEMA = environnement.urlApi + "/api/v1/cinema";


    constructor(private http:HttpClient){}


    getAll(){
        return this.http.get<Cinema[]>(this.URL_API_API_V1_CINEMA_ALL)
    }


    getById(id: string){
    let newURL = this.URL_API_API_V1_CINEMA_ID
    newURL = newURL.replace('{id}', id);
        return this.http.get<Cinema>(newURL)
    }


    post(dto : Cinema){
        return this.http.post<Cinema>(this.URL_API_API_V1_CINEMA,dto)
    }


    patchById(id: string, dto : Cinema){
    let newURL = this.URL_API_API_V1_CINEMA_ID
    newURL = newURL.replace('{id}', id);
        return this.http.patch<Cinema>(newURL,dto)
    }


    deleteById(id: string){
    let newURL = this.URL_API_API_V1_CINEMA_ID
    newURL = newURL.replace('{id}', id);
        return this.http.delete<Object>(newURL)
    }



}

```
Et pour un Dto comme celui-ci:

```java
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
public class CinemaDto   {
    private Long id;
    private String nom;
    private Integer nbsVisiteurParJour;
    private List<SalleDto> salleList;
    private AdresseDto adresse;

}

```

Vous obtiendrez une interface comme celle-ci dans un dossier 'models/' 

```typescript

///home/hijokaidan/Documents/ProjetsCode/spring-CRUD-facilitator/crud/src/main/java/fr/cicco/crud/dto/CinemaDto.java
import {Salle} from "./salle";
import {Adresse} from "./adresse";


export interface Cinema {

  id:number,
  nom:string,
  nbsVisiteurParJour:number,
  salleList:Salle[],
  adresse:Adresse,

}

```
Ensuite, vous avez juste à créer un fichier environnement.ts dans un dossier environnement, placer les fichiers typescript dans les bons dossiers angular et vous aurez toutes vos interfaces et vos appels API définis dans votre projet Angular

### Fonctionnalité expérimentales:

La commande python3 spring.py --jpa -cname <nom_class> -f <attributs> permet de créer des fichiers pythons qui permettront de créer des entités et Dtos avec une autre commande

A priori, vous n'avez besoin que de préciser les noms des fields, par leur type.
En effet, le fichier /springCLI/utils/typefinder.py permet de déduire le type de l'attribut en fonciton de son nom
Sinon, on devrait pourvoir le préciser de la façon suivante <nom_attribut>:<type>
En suffixant les noms par List, cela créera automatiquement une liste
L'implémentation de la même chose pour les sets est à venir

Le projet reste un script personnel, et n'est pas forcément dénué de bugs.