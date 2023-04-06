#!/usr/bin/env python3

import argparse
import os
from template import *

parser = argparse.ArgumentParser(description='Generate a basic Java class')
parser.add_argument('-cname', '--class-name', nargs='+', required=True, help='Name of the class(es) to create')
parser.add_argument('-pck', '--package', required=True, help='Package name (e.g. "com.example.mypackage")')
parser.add_argument('-a', '--all', action='store_true', help='Create all basic classes')
parser.add_argument('-ctrl', '--controller', action='store_true', help='Create a Spring controller')
parser.add_argument('-srv', '--service', action='store_true', help='Create a Spring service')
parser.add_argument('-m', '--mapper', action='store_true', help='Create a Spring mapper using mapstruct')
parser.add_argument('-rep', '--repository', action='store_true', help='Create a JPA Repository using an Integer as a primary key')
parser.add_argument('-e', '--entity', action='store_true', help='Create a JPA Repository using an Integer as a primary key')
parser.add_argument('-c', '--crud', action='store_true', help='Write basic REST methods into classes')
parser.add_argument('-dto', '--dto', action='store_true', help='Creates a DTO of the entity')


args = parser.parse_args()

def write(template:Template):
    controller_dir = os.path.join(package_dir, 'entity' if template.nom == '' else template.nom.lower())
    if not os.path.exists(controller_dir):
        os.makedirs(controller_dir)
    class_file = os.path.join(controller_dir, template.class_name + template.nom + '.java')
    class_template = template.template.format(
        package=args.package,
        class_name=template.class_name,
        imports=template.imports,
        body=template.body,
        class_name_lower=class_name.lower()
    )
    with open(class_file, 'w') as f:
        f.write(class_template)

for class_name in args.class_name:
    # Create the package directory if it doesn't exist
    package_dir = "src/main/java/" + args.package.replace('.', '/')
    if not os.path.exists(package_dir):
        os.makedirs(package_dir)

    # Create the Java class file
    class_file = os.path.join(package_dir, class_name + '.java')


    #Create a template for each java class type
    controller = Template(
        'Controller',
        '''package {package}.controller;

{imports}

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/{class_name_lower}")
public class {class_name}Controller {{
{body}
}}
        ''',
        imports='''import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;''',
        class_name=class_name

    )



    service = Template(
        'Service',
        '''package {package}.service;

{imports}

@Service
@Validated
@RequiredArgsConstructor
public class {class_name}Service {{
{body}
}}
    ''',
        imports='''import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;''',
        class_name=class_name
    )



    mapper = Template(
        'Mapper',
        '''package {package}.mapper;

{imports}

@Mapper(componentModel = "spring")
public interface {class_name}Mapper {{
{body}
}}
    ''',
        imports='import org.mapstruct.Mapper;',
        class_name=class_name
        )



    entity = Template(
        '',
        '''package {package}.entity;

{imports}


@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Builder
public class {class_name} {{
    @Id()
    private Integer id;
    
}}
    ''',
        imports='''
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
    ''',
        class_name=class_name
    )


    dto = Template(
        'Dto',
        '''package {package}.dto;

{imports}

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class {class_name}Dto {{
    private Integer id;
}}
    ''',
        imports='''
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
    ''',
        class_name=class_name
    )

    repo = Template(
        'Repository',
        '''package {package}.repository;

{imports}

import java.util.Optional;

public interface {class_name}Repository extends JpaRepository<{class_name}, Long> {{
}}
    ''',
        imports='''import {package}.entity.{class_name};
import org.springframework.data.jpa.repository.JpaRepository;
    '''.format(package=args.package, class_name=class_name),
        class_name=class_name
        )


    #gestion des arguments
    if args.crud:
        controller.body = '''
            private final {class_name}Service service;

    @GetMapping("all")
    public ResponseEntity<List<{class_name}>> getAll{class_name}(){{
        return ResponseEntity.ok(service.findAll());
    }}

    @GetMapping("/{{id}}")
    public ResponseEntity<{class_name}Dto> get{class_name}(@PathVariable Long id){{
        return ResponseEntity.ok(service.find(id));
    }}

    @PostMapping
    public ResponseEntity<{class_name}Dto> save{class_name}(@RequestBody {class_name}Dto dto){{
        return ResponseEntity.ok(service.save(dto));
    }}

    @PatchMapping("/{{id}}")
    public ResponseEntity<{class_name}Dto> changeA(@PathVariable Long id, @RequestBody {class_name}Dto dto){{
        return ResponseEntity.ok(service.change(id, dto));
    }}

    @DeleteMapping("{{id}}")
    public ResponseEntity<Map<String, String>> delete{class_name}(@PathVariable Long id){{
        return ResponseEntity.ok(service.delete(id));
    }}
        '''.format(class_name=controller.class_name)

        controller.imports +='''
import {package}.dto.{class_name}Dto;
import org.springframework.http.ResponseEntity;
import {package}.entity.{class_name};
import {package}.service.{class_name}Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
        '''.format(class_name=controller.class_name, package=args.package)


        service.body='''private final {class_name}Repository repository;
private final {class_name}Mapper mapper;

public List<{class_name}> findAll() {{
    return repository.findAll();
}}

public {class_name}Dto find(Long id) {{
    //TODO change type of exception with custom exception. Add exception handler
    return mapper.to{class_name}Dto(repository.findById(id).orElseThrow(RuntimeException::new));
}}

public {class_name}Dto save({class_name}Dto {class_name_lower}Dto) {{
    repository.save(mapper.to{class_name}({class_name_lower}Dto));
    return {class_name_lower}Dto;
}}

public {class_name}Dto change(Long id, {class_name}Dto {class_name_lower}Dto) {{
    //TODO implement logic. For now, it throws a NullPointerException
    return null;
}}

public Map<String, String> delete(Long id) {{
    //TODO customiser le message de réponse
    Map<String, String> response = new HashMap<>();
    response.put("message", "entity has been deleted");
    repository.deleteById(id);
    return response;
}}
        '''.format(
            class_name=service.class_name,
            class_name_lower=class_name.lower()
        )

        service.imports += '''
import {package}.dto.{class_name}Dto;
import {package}.mapper.{class_name}Mapper;
import {package}.entity.{class_name};
import {package}.repository.{class_name}Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
        '''.format(
            package=args.package,
            class_name=class_name
        )


        mapper.body += '''
    {class_name} to{class_name}({class_name}Dto {class_name_lower}dto);

    {class_name}Dto to{class_name}Dto({class_name} {class_name_lower});
        '''.format(class_name=class_name, class_name_lower=class_name.lower())

        mapper.imports += '''
import {package}.entity.{class_name};
import {package}.dto.{class_name}Dto;
        '''.format(package=args.package, class_name=class_name)


    if args.all:
        write(controller)
        write(service)
        write(mapper)
        write(repo)
        write(entity)
        write(dto)
    else:
        if args.controller:
            write(controller)
        if args.service:
            write(service)
        if args.mapper:
            write(mapper)
        if args.repository:
            write(repo)
        if args.entity:
            write(entity)
        if args.dto:
            write(dto)

