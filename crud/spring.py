#!/usr/bin/env python3

import argparse
from springCLI.template import *
from springCLI.utils.FileUtils import *
from springCLI.services.java_writer_service import *

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
parser.add_argument('-ng', '--angular', action='store_true', help='Parses the files of the current project')


args = parser.parse_args()

if args.angular:
    pass
else:
    jws = JavaWriterService()
    jws.handle_args(args)