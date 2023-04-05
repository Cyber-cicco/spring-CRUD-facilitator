#!/usr/bin/env python3

import argparse
import os

parser = argparse.ArgumentParser(description='Generate a basic Java class')
parser.add_argument('-cname', '--class-name', nargs='+', required=True, help='Name of the class(es) to create')
parser.add_argument('-ctrl', '--controller', action='store_true', help='Create a Spring controller')
parser.add_argument('-srv', '--service', action='store_true', help='Create a Spring service')
parser.add_argument('-m', '--mapper', action='store_true', help='Create a Spring mapper using mapstruct')
parser.add_argument('-pck', '--package', required=True, help='Package name (e.g. "com.example.mypackage")')

args = parser.parse_args()

def write(type, template):
    controller_dir = os.path.join(package_dir, type.lower())
    if not os.path.exists(controller_dir):
        os.makedirs(controller_dir)
    class_file = os.path.join(controller_dir, class_name + type + '.java')
    class_template = template.format(
        package=args.package,
        class_name=class_name
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

    class_template = '''package {package};

    {imports}

    {annotations}
    public class {class_name} {extends_clause} {implements_clause} {{
    {body}
    }}
    '''

    controller_template = '''package {package}.controller;

    import lombok.RequiredArgsConstructor;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RestController;

    @RestController
    @RequiredArgsConstructor
    @RequestMapping("filler")
    public class {class_name}Controller {{
    }}
    '''

    service_template = '''package {package}.service;

    import lombok.RequiredArgsConstructor;
    import org.springframework.stereotype.Service;
    import org.springframework.validation.annotation.Validated;

    @Service
    @Validated
    @RequiredArgsConstructor
    public class {class_name}Service {{
    }}
    '''

    if args.controller:
        write('Controller', controller_template)
    if args.service:
        write('Service', service_template)


