#!/bin/bash

while [[ $# -gt 0 ]]; do
    key="$1"

    case $key in
        -cname|--class-name)
        class_name="$2"
        shift # past argument
        shift # past value
        ;;
        -pck|--package)
        package_name="$2"
        shift # past argument
        shift # past value
        ;;
        -srv|--service)
        service_class=true
        shift # past argument
        ;;
        -ctrl|--controller)
        controller_class=true
        shift # past argument
        ;;
        -e|--entity)
        entity_class=true
        shift
        ;;
        -rep|--repository)
        entity_class=true
        shift
        ;;
        -m|--repository)
        entity_class=true
        shift
        ;;
        *)
        echo "Unknown option: $1"
        exit 1
        ;;
    esac
done

if [ -z "$class_name" ]; then
    echo "Please specify a class name using the -cname or --class-name option"
    exit 1
fi

if [ -z "$package_name" ]; then
    package_path=""
else
    package_path=$(echo "$package_name" | tr '.' '/')
    package_path="$package_path/"
fi

if [ "$service_class" = true ]; then
    service_class_name="${class_name}Service"
    mkdir -p "$package_path"service
    cat << EOF > "$package_path"service/"$service_class_name.java"
package $package_name.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

@Service
@Validated
@RequiredArgsConstructor
public class $service_class_name {
}
EOF
    echo "Java service class $service_class_name.java created successfully in package $package_name.service"
fi

if [ "$controller_class" = true ]; then
    controller_class_name="${class_name}Controller"
    mkdir -p "$package_path"controller
    cat << EOF > "$package_path"controller/"$controller_class_name.java"
package $package_name.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("filler")
public class $controller_class_name {
}
EOF
    echo "Java controller class $controller_class_name.java created successfully in package $package_name.controller"
fi

if [ "$service_class" != true ] && [ "$controller_class" != true ]; then
    cat << EOF > "$package_path$class_name.java"
package $package_name;

public class $class_name {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
EOF
    echo "Java class $class_name.java created successfully in package $package_name"
fi