# Spring CRUD facilitator

Petit CLI pour Spring, permettant d'autogénérer du code répétitif pour ses différentes entités JPA. Demande d'avoir déjà initialisé un projet Spring, et d'avoir les dépendances vers Lombok, spring-boot-starter-data-jpa et mapstruct
Demande également d'avoir configuré l'ordre de prise en compte de mapstruct et lombok dans la partie plugins du pom.xml. Vous pouvez vous référer au pom du projet. Ne fonctionne qu'avec un projet maven


## L'installer :

Copiez-coller le fichier spring.py et le dossier springCli dans le même dossier que le pom.xml d'un projet Spring boot.
Installez python3 si ce n'est pas déjà fait.

Et c'est tout!


## L'utiliser

Ouvrez un terminal dans le dossier où se trouve spring.py

Tappez la commande suivante :

python3 spring.py -a -cname Test1 Test2

Normalement, si tout s'est bien passé, vous avez un controller, un service, une entité, un dto, un repository et un mapper de créé pour les entités Test1 et Test2 dans votre projet, et vous n'avez plus qu'à implémenter la logique, sans avoir à créer les classes à la main où en utilisant IntelliJ

```java
package fr.cicco.crud.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;    
    

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/test1")
public class Test1Controller   {

}
```
```java
package fr.cicco.crud.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;    
    

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/test2")
public class Test2Controller   {

}

```
```java
package fr.cicco.crud.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;    
    

@Service
@Validated
@RequiredArgsConstructor
public class Test1Service   {

}
```
```java
package fr.cicco.crud.repository;

import fr.cicco.crud.entity.Test1;
import org.springframework.data.jpa.repository.JpaRepository;    

import java.util.Optional;
    

public interface Test1Repository extends JpaRepository<Test1, Long>  {

}

```
```java
package fr.cicco.crud.mapper;
import org.mapstruct.Mapper;    
    

@Mapper(componentModel = "spring")
public interface Test1Mapper   {

}

```
```java
package fr.cicco.crud.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;    
    

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Builder
public class Test1   {

    @Id()
    private Long id;      
    
}
```
```java
package fr.cicco.crud.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;    
    

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Test1Dto   {

    private Long id;
    
}

```

Vous pouvez également créer juste un type de classe, avec les options --controller, --service, etc.

Vous pouvez aussi préciser le nom du package dans le lequel vous voulez mettre vos fichiers, avec l'option --package


Maintenant, plus intéressant:

python3 spring.py -cname Test1 Test2 --all --crud

Et voilà le résultat pour le controller:

```java
package fr.cicco.crud.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;    
    
import fr.cicco.crud.dto.Test1Dto;
import org.springframework.http.ResponseEntity;
import fr.cicco.crud.service.Test1Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;    
    

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/test1")
public class Test1Controller   {

   
    private final Test1Service test1Service;

    @GetMapping("all")
    public ResponseEntity<List<Test1Dto>> getAllTest1(){
        return ResponseEntity.ok(test1Service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Test1Dto> getTest1(@PathVariable Long id){
        return ResponseEntity.ok(test1Service.findById(id));
    }

    @PostMapping
    public ResponseEntity<Test1Dto> saveTest1(@RequestBody Test1Dto dto){
        return ResponseEntity.ok(test1Service.save(dto));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Test1Dto> changeA(@PathVariable Long id, @RequestBody Test1Dto dto){
        return ResponseEntity.ok(test1Service.change(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteTest1(@PathVariable Long id){
        return ResponseEntity.ok(test1Service.delete(id));
    }

    
}
```

L'option --crud permet de remplir les controllers et services avec des méthodes de base pour accéder à vos entités en base de données. Si vous avez bien configuré votre application.properties, avec spring.data.jpa.generate-dll : true, et que vous avez aussi créer et configurer les accès à la base de données, vous devriez pouvoir post, get et delete sur les tables de la base de données. Pour l'instant, les entités contiennent que des Id et pas d'autres champs.

Enfin, encore plus intéressant, l'option --lucas, qui permet de créer un controller abstrait et une interface pour les services.

## Personaliser le script

Le contenu des classes java se trouvent dans le script java_class_content. Si vous voulez rajouter une annotation, changer le contenu des classes lors de l'utilisation de l'option CRUD, il suffit d'aller regarder dans ce script pour trouver ce qui vous intéresse. 
Pour rajouter des arguments, il faut toucher au spring.py.
FileUtils est la classe servant à écrire dans les fichiers.

A l'avenir, j'essaierai aussi d'implémenter un script qui permet de transformer une classe Java en un dictionaire python semblable à ce qui se trouve dans le fichier java_class_content.py. c
Comme ça dès que vous verrez une classe qui utilise du code redondant et que l'utilisation de l'héritage vous semble compliqué, vous aurez juste à générer le dictionnaire python, le rajouter dans java_class_content.py, rajouter une option d'argument dans spring.py, valoriser les paramètres de la même façon que les autres classes, et vous aurez votre propre générateur de code redondant adapté à la façon dont vous travaillez.

## Fonctionalités à venir:

  - Création des fichiers de test
  - Possibilité de configurer les champs des entités, avec les relations associées, et la façon dont les DTOs changent ces champs
  - Création en conséquence des fonctions dans les mappers
  - Création de l'utilitaire de transformateur de classe java en dictionaire python
  - Possibilité de rajouter une option --angular, qui, si il y a un projet d'angular initialisé dans le même dossier, créera les interfaces correspondant aux entités, ainsi que les services avec les fonctions de base pour faire les appels à l'API.
  - Éventuellement un script qui crée le fichier de config des entités à partir du dump du script de la création d'une base de données par IntelliJ

## Avertissement

Le script comporte peut être des bugs, surtout si vous décider de l'utiliser au mauvais endroit. Ce n'est pas un produit finit, juste un petit projet personnel
