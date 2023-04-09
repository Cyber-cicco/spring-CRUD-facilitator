#!/usr/bin/env python3

import argparse
import os
from springCLI.template import *
import springCLI.java_class_content as jcc
from springCLI.utils.FileUtils import *

parser = argparse.ArgumentParser(description='Generate a basic Java class')
parser.add_argument('-cname', '--class-name', nargs='+', required=True, help='Name of the class(es) to create')
parser.add_argument('-pck', '--package', action='store_true', help='Package name (e.g. "com.example.mypackage")')
parser.add_argument('-a', '--all', action='store_true', help='Create all basic classes')
parser.add_argument('-ctrl', '--controller', action='store_true', help='Create a Spring controller')
parser.add_argument('-srv', '--service', action='store_true', help='Create a Spring service')
parser.add_argument('-m', '--mapper', action='store_true', help='Create a Spring mapper using mapstruct')
parser.add_argument('-rep', '--repository', action='store_true', help='Create a JPA Repository using a Long as a primary key')
parser.add_argument('-e', '--entity', action='store_true', help='Create an Entity with a Long as a primary key')
parser.add_argument('-c', '--crud', action='store_true', help='Write basic REST methods into classes')
parser.add_argument('-dto', '--dto', action='store_true', help='Creates a DTO of the entity')
parser.add_argument('-lucas', '--lucas', action='store_true', help='LUCAS')


args = parser.parse_args()
package_name = XmlParser.get_package_from_pom()
package_dir = "src/main/java/" + package_name.replace('.', '/') + (args.package.replace('.', '/')if args.package else '')
file_writer = FileWriter(package_name, package_dir)


#Create a template for each java class type
controller = JavaClass(
    'Controller',
    jcc.template,
    imports=jcc.controller['imports'],
    annotations=jcc.controller['annotations']


   )

service = JavaClass(
    'Service',
    jcc.template,
    imports=jcc.service['imports'],
    annotations=jcc.service['annotations']
)

mapper = JavaClass(
    'Mapper',
    jcc.template,
    imports=jcc.mapper['imports'],
    annotations=jcc.mapper['annotations'],
    class_type='interface'
)

entity = JavaClass(
    '',
    jcc.template,
    imports=jcc.entity['imports'],
    annotations=jcc.entity['annotations'],
    body=jcc.entity['body']
)


dto = JavaClass(
    'Dto',
    jcc.template,
    imports=jcc.dto['imports'],
    annotations=jcc.dto['annotations'],
    body=jcc.dto['body']
)

repo = JavaClass(
    'Repository',
    jcc.template,
    annotations=jcc.repository['annotations'],
    class_type='interface'
)

if args.lucas:
    file_writer.write_abstract_classes()


for class_name in args.class_name:
    # Create the package directory if it doesn't exist
    if not os.path.exists(package_dir):
        os.makedirs(package_dir)

    # Create the Java class file
    class_file = os.path.join(package_dir, class_name + '.java')

    #Setting up the class name for the filewriter
    file_writer.class_name = class_name

    # Setting up imports for every class type
    repo.imports=jcc.repository['imports'].format(package=package_name, class_name=class_name)
    controller.imports=jcc.controller['imports']
    service.imports=jcc.service['imports']
    entity.imports=jcc.entity['imports']
    dto.imports=jcc.dto['imports']
    mapper.imports=jcc.mapper['imports']

    repo.extends = jcc.repository['extends'].format(class_name=class_name)


    # Handle the args
    if args.crud:

        if args.lucas:
            controller.annotations = jcc.controller['abstract_annotations'].format(class_name_lower=class_name[0].lower() + class_name[1:])
            controller.body = jcc.controller['abstract_body'].format(class_name=class_name, class_name_lower=class_name[0].lower() + class_name[1:])
            controller.extends = jcc.controller['extends'].format(class_name=class_name)
            controller.imports = jcc.controller['abstract_imports'].format(package=package_name, class_name=class_name)

            service.implements = 'implements BaseService<{class_name}Dto>'.format(class_name = class_name)

        else:
            controller.body = jcc.controller['body'].format(class_name=class_name, class_name_lower=class_name[0].lower() + class_name[1:])
            controller.imports +=jcc.controller['opt_imports'].format(class_name=class_name, package=package_name)


        service.body=jcc.service['body'].format(
            class_name=class_name,
            class_name_lower=class_name[0].lower() + class_name[1:]
        )
        service.imports += jcc.service['opt_imports'].format(
            package=package_name,
            class_name=class_name
        )


        mapper.body = jcc.mapper['body'].format(class_name=class_name, class_name_lower=class_name[0].lower() + class_name[1:])
        mapper.imports += jcc.mapper['opt_imports'].format(package=package_name, class_name=class_name)

    if args.all:
        for java_class in [controller, service, mapper, repo, entity, dto]:
            file_writer.write(java_class)
    else:
        if args.controller:
            file_writer.write(controller)
        if args.service:
            file_writer.write(service)
        if args.mapper:
            file_writer.write(mapper)
        if args.repository:
            file_writer.write(repo)
        if args.entity:
            file_writer.write(entity)
        if args.dto:
            file_writer.write(dto)

