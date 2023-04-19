template_ts_service ='''//path du controller : {path}
{imports}

@Injectable({{
  providedIn: 'root'
}})
export class {class_name}{{

{urls}

    constructor(private http:HttpClient){{}}

{http}

}}
'''

template_http = '''
    {method}{target_name}{by}({required_args}){{{url_changer}
        return this.http.{method}{return_type}({url_changed}{request_params}{body})
    }}

'''