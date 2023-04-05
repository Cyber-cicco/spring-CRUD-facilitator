# Spring CRUD facilitator

A lot of basic spring Rest APIs just boil down to writing the same thing again and again.
We initialize entities and we create a lot of classes to do CRUD operations. Since we can't send entites without through sending the whole database or close
to it, we use DTOs. But for the basics, everything has, aside from some details, the same logic. And the details make it frustrating, as it causes
you to write a lot of the same code that you can hardly refactor. Mapstruct, JPA and Lombok tend to make this process less painful than it could be, but it's
quite boring to have to do those kinds of operations.

So it would be really handy to have a library that allows you to create a Java Library that uses annotations on entites to autogenerate DTOs, services, respositories, controllers and
mappers at compile time

And that's not what we're going to do yet, cause I have basically no idea what I'm doing. So this repo is made for weird experiments with annotation 
processing until I git gud and make this repo public.
