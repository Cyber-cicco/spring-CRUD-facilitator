#!/usr/bin/env python3

import argparse
from springCLI.template import *
from springCLI.utils.fileUtils import *
from springCLI.services.java_writer_service import *
import springCLI.services.dto_parser as dtop
import springCLI.services.controller_parser as ctlp
import springCLI.services.jpa_entity_creator as jec
import springCLI.services.entites_getter as eg

# create mutually exclusive group for -cname and related arguments

parser = argparse.ArgumentParser(description='Create Spring classes')

group = parser.add_mutually_exclusive_group(required=True)
group.add_argument('-ng', '--angular', action='store_true', help='Parses the files of the current project and generate typescript according to the file structure')
group.add_argument('-j', '--jpa', action='store_true', help='Parses the files of the current project and generate typescript according to the file structure')
group.add_argument('-t', '--test', action='store_true', help='Test Shit')
group.add_argument('-s', '--spring', action='store_true', help='Creates classes in Spring')

parser.add_argument('-cname', '--class-name', nargs='+', help='Name of the class(es) to create')
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
parser.add_argument('-f', '--fields', nargs='+', help='LUCAS')


args = parser.parse_args()

if args.angular:
    fr = FileReader()
    current_directory = os.getcwd()
    fr.read_files_in_directory(current_directory, 'Dto.java', dtop.find_all_fields)
    fr.read_files_in_directory(current_directory, 'Controller.java', ctlp.generate_angular_service)
elif args.jpa:
    if len(args.class_name) == 0:
        parser.error("Vous devez préciser le nom d'une classe")
    if len(args.class_name) > 1:
        print("Il est déconseillé d'utiliser l'option --jpa pour plus d'une classe : elle auront toutes les mêmes attributs")
    jec.create_entites(args)
else:
    jws = JavaWriterService()
    jws.handle_args(args)
