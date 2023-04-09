import xml.etree.ElementTree as ET
from ..template import JavaClass
import os
from ..java_class_content import *

class XmlParser:
    
    def get_package_from_pom():
        return ET.parse("./pom.xml").getroot().find('{http://maven.apache.org/POM/4.0.0}groupId').text

    
    def __init__(self) -> None:
        pass

class FileWriter:

    
    def __init__(self, package_name, package_dir) -> None:
        self.package_name=package_name
        self.package_dir = package_dir
        self.class_name = ''


    def write(self, jc:JavaClass):
        dir = os.path.join(self.package_dir, 'entity' if jc.type == '' else jc.type.lower())
        if not os.path.exists(dir):
            os.makedirs(dir)
        class_file = os.path.join(dir, self.class_name + jc.type + '.java')
        class_template = jc.template.format(
            package=self.package_name,
            type_lower= 'entity' if jc.type == '' else jc.type.lower(),
            imports=jc.imports,
            annotations=jc.annotations,
            class_type=jc.class_type,
            class_name=self.class_name,
            type=jc.type,
            extends=jc.extends,
            implements=jc.implements,
            body=jc.body,
            class_name_lower=self.class_name[0].lower() + self.class_name[1:],
        )
        with open(class_file, 'w') as f:
            f.write(class_template)

    def write_abstract_classes(self):
        dir = os.path.join(self.package_dir, 'controller')
        dir_service = os.path.join(self.package_dir, 'service')
        if not os.path.exists(dir):
            os.makedirs(dir)
        if not os.path.exists(dir_service):
            os.makedirs(dir_service)
        class_file = os.path.join(dir,'BaseController.java')
        class_file_service = os.path.join(dir_service, 'BaseService.java')
        class_template = abs_controller['abs'].format(package=self.package_name)
        class_template_service = abs_service.format(package=self.package_name)
        with open(class_file, 'w') as f:
            f.write(class_template)
        with open(class_file_service, 'w') as f:
            f.write(class_template_service)