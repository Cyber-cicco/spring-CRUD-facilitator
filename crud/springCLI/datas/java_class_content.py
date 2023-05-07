template = '''package {package}.{type_lower};
{imports}
{annotations}
public {class_type} {class_name}{type} {extends} {implements} {{
{body}
}}
'''


abs_controller = {
    'abs':
'''package {package}.controller;

import {package}.service.BaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public abstract class BaseController<T> {{

    private final BaseService<T> service;

    @GetMapping("/all")
    public ResponseEntity<List<T>> getAll(){{
        return ResponseEntity.ok(service.findAll());
    }}

    @GetMapping("/{{id}}")
    public ResponseEntity<T> get(@PathVariable Long id){{
        return ResponseEntity.ok(service.findById(id));
    }}

    @PostMapping
    public ResponseEntity<T> save(@RequestBody T dto){{
        return ResponseEntity.ok(service.save(dto));
    }}

    @PatchMapping("/{{id}}")
    public ResponseEntity<T> change(@PathVariable Long id, @RequestBody T dto){{
        return ResponseEntity.ok(service.change(id, dto));
    }}

    @DeleteMapping("/{{id}}")
    public ResponseEntity<Map<String, String>> delete(@PathVariable Long id){{
        return ResponseEntity.ok(service.delete(id));
    }}
}}
    ''',
    'controller_body':
    '''
    public {class_name}Controller({class_name}Service {class_name_lower}Service){{
    super({class_name_lower}Service);
}}
'''}

abs_service = '''package fr.cicco.crud.service;

import java.util.List;
import java.util.Map;

public interface BaseService<T> {{

    List<T> findAll();

    T findById(Long id);

    T save(T dto);

    T change(Long id, T dto);

    Map<String, String> delete(Long id);

}}
'''

controller = {
    'annotations':
    '''
@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/v1/{class_name_lower}")''',
    'body':
    '''
   
    private final {class_name}Service {class_name_lower}Service;

    @GetMapping("/all")
    public ResponseEntity<List<{class_name}Dto>> getAll{class_name}(){{
        return ResponseEntity.ok({class_name_lower}Service.findAll());
    }}

    @GetMapping("/{{id}}")
    public ResponseEntity<{class_name}Dto> get{class_name}(@PathVariable Long id){{
        return ResponseEntity.ok({class_name_lower}Service.findById(id));
    }}

    @PostMapping
    public ResponseEntity<{class_name}Dto> save{class_name}(@RequestBody {class_name}Dto dto){{
        return ResponseEntity.ok({class_name_lower}Service.save(dto));
    }}

    @PatchMapping("/{{id}}")
    public ResponseEntity<{class_name}Dto> change{class_name}(@PathVariable Long id, @RequestBody {class_name}Dto dto){{
        return ResponseEntity.ok({class_name_lower}Service.change(id, dto));
    }}

    @DeleteMapping("/{{id}}")
    public ResponseEntity<Map<String, String>> delete{class_name}(@PathVariable Long id){{
        return ResponseEntity.ok({class_name_lower}Service.delete(id));
    }}

    ''',

    'imports': 
    '''
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;    
    ''',
    'opt_imports':
    '''
import {package}.dto.{class_name}Dto;
import org.springframework.http.ResponseEntity;
import {package}.service.{class_name}Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;    
    ''',
    'extends':'extends BaseController<{class_name}Dto>',
    'implements':'',
    'abstract_imports':'''
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;    

import {package}.dto.{class_name}Dto;
import {package}.service.{class_name}Service;
    ''',
    'abstract_annotations':'''
@RestController
@RequestMapping("api/v1/{class_name_lower}")''',
    'abstract_body': '''
    public {class_name}Controller({class_name}Service {class_name_lower}Service){{
        super({class_name_lower}Service);
    }}
    '''
    }

service = {
    'annotations':
    '''
@Service
@Validated
@RequiredArgsConstructor''',
    'body':
    '''

    private final {class_name}Repository {class_name_lower}Repository;
    private final {class_name}Mapper {class_name_lower}Mapper;

    public List<{class_name}Dto> findAll() {{
        return {class_name_lower}Repository.findAll().stream()
            .map({class_name_lower}Mapper::to{class_name}Dto)
            .toList();
    }}

    public {class_name}Dto findById(Long id) {{
        //TODO change type of exception with custom exception. Add exception handler
        return {class_name_lower}Mapper.to{class_name}Dto({class_name_lower}Repository.findById(id).orElseThrow(RuntimeException::new));
    }}
    
    public {class_name}Dto save({class_name}Dto {class_name_lower}Dto) {{
        {class_name_lower}Repository.save({class_name_lower}Mapper.to{class_name}({class_name_lower}Dto));
        return {class_name_lower}Dto;
    }}
    
    public {class_name}Dto change(Long id, {class_name}Dto {class_name_lower}Dto) {{
        //TODO implement logic.
        return null;
    }}
    
    public Map<String, String> delete(Long id) {{
        //TODO customiser le message de réponse
        Map<String, String> response = new HashMap<>();
        response.put("message", "entity has been deleted");
        {class_name_lower}Repository.deleteById(id);
        return response;
    }}      
    ''',
    'imports': 
    '''
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;    
    ''',
    'opt_imports':
    '''
import {package}.dto.{class_name}Dto;
import {package}.mapper.{class_name}Mapper;
import {package}.repository.{class_name}Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;    
    ''',
    'extends':'',
    'implements':'implements BaseService<{class_name}Dto>'}

mapper = {
    'body':
    '''
    {class_name} to{class_name}({class_name}Dto {class_name_lower}dto);

    {class_name}Dto to{class_name}Dto({class_name} {class_name_lower});      
    ''',
    'annotations':
    '''
@Mapper(componentModel = "spring")''',
    'imports': 
    '''import org.mapstruct.Mapper;    
    ''',
    'opt_imports':
    '''
import {package}.entity.{class_name};
import {package}.dto.{class_name}Dto;    
    ''',
    'extends':'',
    'implements':''}

entity = {

    'body':
    '''
    @Id()
    private Long id;      
    ''',
'annotations':
    '''
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Builder''',
    'imports': 
    '''
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;    
    ''',
    'opt_imports':
    '''
    
    ''',
    'extends':'',
    'implements':''}

dto = {
    'imports': 
    '''
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;    
    ''',
    'opt_imports':
    '''
    
    ''',
    'annotations':
    '''
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder''',
    'body':
    '''
    private Long id;
    ''',
    'extends':'',
    'implements':''}

repository = {
    'body':
    '''
      
    ''',
    'annotations':
    '''''',
    'imports': 
    '''
import {package}.entity.{class_name};
import org.springframework.data.jpa.repository.JpaRepository;    

import java.util.Optional;
    ''',
    'opt_imports':
    '''
    
    ''',
    'extends':'extends JpaRepository<{class_name}, Long>',
    'implements':''
    }