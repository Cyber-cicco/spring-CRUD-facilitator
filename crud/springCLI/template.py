class JavaClass:

    
    def __init__(self, type, template, package='', imports='', class_name='', body='', extends='', implements='', annotations='', class_type='class' ):
        self.type = type
        self.package = package
        self.imports = imports
        self.class_name = class_name
        self.body = body
        self.template = template
        self.extends = extends
        self.implements = implements
        self.annotations = annotations
        self.class_type = class_type