# Backend-Intellegent-Tourism-System

Índice
---------

[[_TOC_]]

## Descripción
Estructura de fondo del proyecto sistema inteligente para turistas (Pandar) que tiene como objetivo brindar las rutas, datos y demas medios de conexión para lograr el funcionamiento del Frontend de la aplicación.


## Documentación

### Tecnologías
|Tecnología                                                             |Versión         | Vesión                       
|:----------------------------------------------------------------------|:--------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|<img src="https://img.shields.io/badge/Node.js-darkgreen">             |^11.1.0        | Mayor dominio general en el equipo, nos permite utilizar JavaScript para construir el backend de una aplicación web e inmensa comunidad para recibir apoyo en los proyectos.|
|<img src="https://img.shields.io/badge/JWT-yellow">                    |^8.5.1         | Gran seguridad al momento de controlar las sesiones al usar payload, firma y secreto como medios de encriptación |
|<img src="https://img.shields.io/badge/Mongoose-darkred">              |^5.10          | Permite construir estructuras para los documentos al usar en MongoDB y realizar consultas de una forma más eficiente |
|<img src="https://img.shields.io/badge/Express.js-lightgrey">          |^4.17.1        | Metodos sencillos al crear servidores y generar rutas de comunicación|
|<img src="https://img.shields.io/badge/MongoDB-dark">                  |^4.0           | Permite tener una base de datos NoSQL de forma gratuita en linea, con posibilidad de configuracion publica y privada permitiendo un mejor desarrollo a nivel de equipo, ademas el uso de  documentos facilita la inserción de archivos tipo JSON.|


### Equipo Backend y Data

|Miembro            |Rol                 |Tareas            |
|:------------------|:-------------------|:-----------------|
|Adrian Gutierrez   |**Data Scientist**  | Desarrollo del algoritmo inteligente, Diagrama del algoritmo inteligente |
|Ildebrando Mora    |**Backend**         | Desarrollo del sistema de sesiones, Conexión con API TripAdvisor, Desarrollo CRUD Users, Construcción de rutas auth y search-site|
|Juan Espitia       |**Backend**         | Creación de la estructura base del servidor, Desarrollo CRUD surveys,  Mejora de la ruta search-site, Diagrama de Flujo|
|Francisco Suarez   |**Backend**         | Conexión con MongoDB, Desarrollo CRUD touristic-sites, Implementación de busquedas API TripAdvisor a ruta search-site  |
|Todos              |**Todos**           | Inserción de registros a la base de datos |

### Enlaces de Interés

|Nombre                  |Enlace|
|:-----------------------|:------------|
|Videos de las Reuniones |https://drive.google.com/drive/folders/1w8EpKRT_nDAw7tfnhyzEgh_CbkFCXN6l|
|Diagrama de Flujo       |https://www.notion.so/Diagrama-de-Flujo-Backend-2836250100424aadadd74dd77455c411|
|Diagrama del Algoritmo  |https://www.notion.so/Diagrama-del-Algoritmo-Inteligente-6037c6f234eb4bbda9f9d5f3e6bf6270|
|Collección Postman      |https://documenter.getpostman.com/view/12073893/TVCgxmr8|

## Pasos para Colaborar
1. Hacer fork del proyecto: al dar click al boton fork (ubicado en la parte superior derecha)
2. Clonar el proyecto: `git clone https://gitlab.com/<Tu usuario>/backend-intellegent-tourism-system.git`
3. Instalar las dependencias: `npm install` o usar `npm i`
4. Ejecutar el proyecto: `npm run dev`
5. Realizar las mejoras necesarias y hacer un commit: `git commit -am "<Mensaje del commit>"` o usar `git add .` y luego `git commit -m "<Mensaje del commit>"`
6. Subir los cambios al repositio creado con el fork: `git push origin <rama que se uso>`
7. Crear un merge request al proyecto original.

## Maneras de Consumir el Servicio

### Search-Site
#### • GET Search-Site

- URL: `http://localhost:4000/search-site?city=<ciudad>&categories=<categoria>`
- Categorias: `Eventos`, `Cultura`, `Zonas arqueologicas`, `Parques Tematicos`, `Ecoturismo`, `Sitios Religiosos`, `Arquitectura`, `Compras`, `Universidades`, `Bares y Discotecas`, `Playas`, `Al aire libre`, `Otros`.
- Ejemplo: `http://localhost:4000/search-site?city=aguascalientes&categories=cultura`

> Response
```
{
    "categories": [
        "Cultura"
    ],
    "_id": "5f4c2540d0553c080c79634d",
    "location_name": "Museo Nacional de la Muerte",
    "country": "México",
    "city": "Aguascalientes",
    "latitude": "21.883992",
    "length": "-102.295501",
    "rating": 4.5,
    "address": "Rivero y Gutiérrez x, José María Morelos y Pavón, Zona Centro, 20000 Aguascalientes, Ags., México",
    "average_price": "$20",
    "phone": "+524499107400",
    "web": "http://museonacionaldelamuerte.uaa.mx/",
    "image": "https://lh5.googleusercontent.com/p/AF1QipMT8lLoVMEihj2Ps-8TR912yW4OECzFfy_Dy1C6=w408-h544-k-no",
    "createdAt": "2020-08-30T22:16:32.673Z",
    "updatedAt": "2020-08-30T22:18:03.428Z",
    "__v": 0
}
```

#### • GET Search-Site (TripAdvisor)

- URL: `http://localhost:4000/search-site?city=<ciudad>&categories=<categoria>`
- Categorias: `Hotel`, `Restaurante`
- Ejemplo: `http://localhost:4000/search-site?city=Medellin&categories=Hotel`

> Response
```
{
    "location_id": "14059002",
    "name": "Hotel Novotel Medellin El Tesoro",
    "latitude": "6.198585",
    "longitude": "-75.55829",
    "num_reviews": "769",
    "timezone": "America/Bogota",
    "location_string": "Medellín, Departamento de Antioquia",
    "photo": {
        "images": {
            "small": {
                "width": "150",
                "url": "https://media-cdn.tripadvisor.com/media/photo-l/12/d9/32/b1/atton-el-tesoro.jpg",
                "height": "150"
            },
            "thumbnail": {
                "width": "50",
                "url": "https://media-cdn.tripadvisor.com/media/photo-t/12/d9/32/b1/atton-el-tesoro.jpg",
                "height": "50"
            },
            "original": {
                "width": "2000",
                "url": "https://media-cdn.tripadvisor.com/media/photo-o/12/d9/32/b1/atton-el-tesoro.jpg",
                "height": "1333"
            },
            "large": {
                "width": "1024",
                "url": "https://media-cdn.tripadvisor.com/media/photo-w/12/d9/32/b1/atton-el-tesoro.jpg",
                "height": "682"
            },
            "medium": {
                "width": "550",
                "url": "https://media-cdn.tripadvisor.com/media/photo-s/12/d9/32/b1/atton-el-tesoro.jpg",
                "height": "367"
            }
        },
        "is_blessed": true,
        "uploaded_date": "2018-05-04T15:07:23-0400",
        "caption": "",
        "id": "316224177",
        "helpful_votes": "4",
        "published_date": "2018-05-04T15:07:23-0400",
        "user": {
            "user_id": null,
            "member_id": "0",
            "type": "user"
        }
    },
    "awards": [
        {
            "award_type": "CERTIFICATE_OF_EXCELLENCE",
            "year": "2020",
            "images": {
                "small": "https://www.tripadvisor.co/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_small-0-5.jpg",
                "large": "https://www.tripadvisor.co/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_2020_es_CO_large-0-5.jpg"
            },
            "categories": [],
            "display_name": "Certificado de Excelencia 2020"
        }
    ],
    "preferred_map_engine": "default",
    "raw_ranking": "4.514866352081299",
    "ranking_geo": "Medellín",
    "ranking_geo_id": "297478",
    "ranking_position": "1",
    "ranking_denominator": "1467",
    "ranking_category": "hotel",
    "ranking": "N.º 1 en relación calidad-precio de 1.467 lugares donde alojarse en Medellín",
    "subcategory_type": "hotel",
    "subcategory_type_label": "Hotel",
    "distance": "3.452290507148298",
    "distance_string": null,
    "bearing": "south",
    "rating": "4.5",
    "is_closed": false,
    "is_long_closed": false,
    "price_level": "$",
    "price": "US$ 58 - US$ 98",
    "hotel_class": "4.0",
    "business_listings": {
        "desktop_contacts": [],
        "mobile_contacts": []
    },
    "special_offers": {
        "desktop": [],
        "mobile": []
    },
    "listing_key": "a09444a7-5f8f-4d95-9d3a-869083789adb"
}
```

### Login

#### • POST Register

- URL: `http://localhost:4000/register`

> Body
```
{
    "first_name": "mario",
    "last_name": "bros",
    "email": "mariobros@gmail.com",
    "password": "123456",
    "country": "mexico",
    "city": "rosarito"
}
```
> Response
```
{
    "status": 201,
    "message": "registered user",
    "body": {
        "_id": "5f51b6234757c94650678304",
        "email": "mariobros@gmail.com",
        "password": "$2b$10$1jQ2kKbyIwBBCbdvV2xIsOzQvr9NA4ZOMxq9f7Jhu1BTem5QCYilm",
        "first_name": "mario",
        "last_name": "bros",
        "country": "mexico",
        "city": "rosarito",
        "createdAt": "2020-09-04T03:36:03.164Z",
        "updatedAt": "2020-09-04T03:36:03.164Z",
        "__v": 0
    }
}
```

#### • POST Login

- URL: `http://localhost:4000/login`

> Body
```
{
    "email": "mariobros@gmail.com",
    "password": "123456"
}
```
> Response
```
{
    "user": {
        "_id": "5f51b6234757c94650678304",
        "email": "mariobros@gmail.com",
        "password": "$2b$10$1jQ2kKbyIwBBCbdvV2xIsOzQvr9NA4ZOMxq9f7Jhu1BTem5QCYilm",
        "first_name": "mario",
        "last_name": "bros",
        "country": "mexico",
        "city": "rosarito",
        "createdAt": "2020-09-04T03:36:03.164Z",
        "updatedAt": "2020-09-04T03:36:03.164Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUxYjYyMzQ3NTdjOTQ2NTA2NzgzMDQiLCJlbWFpbCI6Im1hcmlvYnJvc0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCQxalEya0tieUl3QkJDYmR2VjJ4SXNPelF2cjlOQTRaT014cTlmN0podTFCVGVtNVFDWWlsbSIsImZpcnN0X25hbWUiOiJtYXJpbyIsImxhc3RfbmFtZSI6ImJyb3MiLCJjb3VudHJ5IjoibWV4aWNvIiwiY2l0eSI6InJvc2FyaXRvIiwiY3JlYXRlZEF0IjoiMjAyMC0wOS0wNFQwMzozNjowMy4xNjRaIiwidXBkYXRlZEF0IjoiMjAyMC0wOS0wNFQwMzozNjowMy4xNjRaIiwiX192IjowLCJpYXQiOjE1OTkxOTA2NTZ9.BRzr3w2fSdTUw0dM4M0ir-EbL1KzLBpPJqWs5YrYU8c"
}
```

### Touristic-Sites

#### • GET Touristic-Sites

- URL: `http://localhost:4000/touristic-site`

> Response
```
{
    "categories": [
        "Playa"
    ],
    "_id": "5f4c4ac6aab2cb39c467ba26",
    "location_name": "Playa Arcangel",
    "country": "México",
    "city": "Rosarito",
    "latitude": "32.325953",
    "length": "-117.050420",
    "rating": 4.6,
    "address": "Carretera Libre Tijuana, Ensenada KM28.5, Villas Corona, 22710 Rosarito, B.C., México",
    "average_price": "$35",
    "phone": "+526193564505",
    "web": "http://www.playaarcangel.com/",
    "image": "https://lh5.googleusercontent.com/p/AF1QipPc-KkN_O5WAAmsPufbzfKHil8W0iKmszg4LU34=w426-h240-k-no",
    "createdAt": "2020-08-31T00:56:38.230Z",
    "updatedAt": "2020-08-31T00:56:38.230Z",
    "__v": 0
},
{
    "categories": [
        "Playa"
    ],
    "_id": "5f4c4ae9aab2cb39c467ba27",
    "location_name": "Playas de Rosarito",
    "country": "México",
    "city": "Rosarito",
    "latitude": "32.343034",
    "length": "-117.061636",
    "rating": 4.6,
    "address": "Abeto 246, Centro Playas, 22710 Rosarito, B.C., México",
    "average_price": "Gratis",
    "phone": "",
    "web": "",
    "image": "https://lh5.googleusercontent.com/p/AF1QipNOexywzZayCAPmbz6eAWSP7TNCUEPX85Ijkrek=w408-h306-k-no",
    "createdAt": "2020-08-31T00:57:13.401Z",
    "updatedAt": "2020-08-31T00:57:13.401Z",
    "__v": 0
}
```

#### • GET One Touristic-Site

- URL: `http://localhost:4000/touristic-site/<_id del sitio turistico>`
- Ejemplo: `http://localhost:4000/touristic-site/5f4c2540d0553c080c79634d`

> Response
```
{
    "categories": [
        "Cultura"
    ],
    "_id": "5f4c2540d0553c080c79634d",
    "location_name": "Museo Nacional de la Muerte",
    "country": "México",
    "city": "Aguascalientes",
    "latitude": "21.883992",
    "length": "-102.295501",
    "rating": 4.5,
    "address": "Rivero y Gutiérrez x, José María Morelos y Pavón, Zona Centro, 20000 Aguascalientes, Ags., México",
    "average_price": "$20",
    "phone": "+524499107400",
    "web": "http://museonacionaldelamuerte.uaa.mx/",
    "image": "https://lh5.googleusercontent.com/p/AF1QipMT8lLoVMEihj2Ps-8TR912yW4OECzFfy_Dy1C6=w408-h544-k-no",
    "createdAt": "2020-08-30T22:16:32.673Z",
    "updatedAt": "2020-08-30T22:18:03.428Z",
    "__v": 0
    }
```

#### • POST Touristic-Site

- URL: `http://localhost:4000/touristic-site`
- Token de Autorización: Requerido

> Body
```
{
    "location_name": "Museo Nacional de la Muerte",
    "country": "México",
    "city": "Aguascalientes",
    "latitude": "21.883992",
    "length": "-102.295501",
    "rating": 4.5,
    "address": "Rivero y Gutiérrez x, José María Morelos y Pavón, Zona Centro, 20000 Aguascalientes, Ags., México",
    "average_price": "$20",
    "phone": "+524499107400",
    "web": "http://museonacionaldelamuerte.uaa.mx/",
    "image": "https://lh5.googleusercontent.com/p/AF1QipMT8lLoVMEihj2Ps-8TR912yW4OECzFfy_Dy1C6=w408-h544-k-no",
    "categories": [
      "Cultura"
    ]
}
```

> Response
```
{
    "status": 201,
    "message": "Touristic site created",
    "body": {
        "categories": [
            "Cultura"
        ],
        "_id": "5f5244cc89e724361cca0f28",
        "location_name": "Museo Nacional de la Muerte",
        "country": "México",
        "city": "Aguascalientes",
        "latitude": "21.883992",
        "length": "-102.295501",
        "rating": 4.5,
        "address": "Rivero y Gutiérrez x, José María Morelos y Pavón, Zona Centro, 20000 Aguascalientes, Ags., México",
        "average_price": "$20",
        "phone": "+524499107400",
        "web": "http://museonacionaldelamuerte.uaa.mx/",
        "image": "https://lh5.googleusercontent.com/p/AF1QipMT8lLoVMEihj2Ps-8TR912yW4OECzFfy_Dy1C6=w408-h544-k-no",
        "createdAt": "2020-09-04T13:44:44.764Z",
        "updatedAt": "2020-09-04T13:44:44.764Z",
        "__v": 0
    }
}
```

#### • PATCH Touristic-Site

- URL: `http://localhost:4000/touristic-site/<_id del sitio turistico>`
- Ejemplo: `http://localhost:4000/touristic-site/5f51b3684757c94650678303`
- Token de Autorización: Requerido

> Body
```
{
    "rating": 5
}
```

> Response
```
{
    "status": 200,
    "message": "Touristic site updated",
    "body": {
        "rating": 5
    }
}
```

#### • DELETE Touristic-Site

- URL: `http://localhost:4000/touristic-site/<_id del sitio turistico>`
- Ejemplo: `http://localhost:4000/touristic-site/5f51b3684757c94650678303`
- Token de Autorización: Requerido

> Response
```
{
    "status": 200,
    "message": "Touristic site 5f51b3684757c94650678303 deleted"
}
```

### Surveys

#### • GET Surveys

- URL: `http://localhost:4000/survey`

> Response
```
{
    "status": 200,
    "body": [
        {
            "categories": [
                "playa",
                "bares y discotecas",
                "ecoparques"
            ],
            "_id": "5f519aed665b2206fea231f1",
            "user": {
                "_id": "5f3a001e747bf745042b59b7",
                "first_name": "Maria",
                "last_name": "Sanchez",
                "password": "$2b$10$TiCLZ9cZcl0GWn/xKTRIRuQA.T44ZVjHTztbSLHwfI1aWitaNFcIe",
                "email": "maria@gmail.com",
                "country": "Colombia",
                "city": "Cali",
                "createdAt": "2020-08-17T03:57:18.686Z",
                "updatedAt": "2020-08-17T03:57:18.686Z",
                "__v": 0
            },
            "country": "Mexico",
            "budget": 200,
            "createdAt": "2020-09-04T01:39:57.519Z",
            "updatedAt": "2020-09-04T01:39:57.519Z",
            "__v": 0
        },
        {
            "categories": [
                "playa",
                "zonas arqueologicas",
                "cultura"
            ],
            "_id": "5f5241fa89e724361cca0f27",
            "user": {
                "_id": "5f4291f24f239a3986e753f6",
                "email": "Carlossanchez@gmail.co",
                "password": "$2b$10$seklywowo4q7VbKRAvxSd.16GCsLUodLRi/NZxMJGTZ7C/zBpdN6m",
                "first_name": "Carlos",
                "last_name": "Sanchez",
                "country": "mexico",
                "city": "puebla",
                "createdAt": "2020-08-23T15:57:38.677Z",
                "updatedAt": "2020-08-23T15:57:38.677Z",
                "__v": 0
            },
            "country": "Colombia",
            "budget": 50,
            "createdAt": "2020-09-04T13:32:42.168Z",
            "updatedAt": "2020-09-04T13:32:42.168Z",
            "__v": 0
        }
    ]
}
```

#### • GET One Survey

- URL: `http://localhost:4000/survey/<_id del cuestionario>`
- Ejemplo: `http://localhost:4000/survey/5f5241fa89e724361cca0f27`

> Response
```
{
    "status": 200,
    "body": {
        "categories": [
            "playa",
            "zonas arqueologicas",
            "cultura"
        ],
        "_id": "5f5241fa89e724361cca0f27",
        "user": {
            "_id": "5f4291f24f239a3986e753f6",
            "email": "Carlossanchez@gmail.co",
            "password": "$2b$10$seklywowo4q7VbKRAvxSd.16GCsLUodLRi/NZxMJGTZ7C/zBpdN6m",
            "first_name": "Carlos",
            "last_name": "Sanchez",
            "country": "mexico",
            "city": "puebla",
            "createdAt": "2020-08-23T15:57:38.677Z",
            "updatedAt": "2020-08-23T15:57:38.677Z",
            "__v": 0
        },
        "country": "Colombia",
        "budget": 50,
        "createdAt": "2020-09-04T13:32:42.168Z",
        "updatedAt": "2020-09-04T13:32:42.168Z",
        "__v": 0
    }
}
```

#### • POST Survey

- URL: `http://localhost:4000/survey`
- Token de Autorización: Requerido

> Body
```
{
    "user": "5f4291f24f239a3986e753f6",
    "country":"Colombia",
    "budget": 50,
    "categories":["playa","zonas arqueologicas","cultura"]
}
```

> Response
```
{
    "status": 201,
    "body": {
        "categories": [
            "playa",
            "zonas arqueologicas",
            "cultura"
        ],
        "_id": "5f5241fa89e724361cca0f27",
        "user": "5f4291f24f239a3986e753f6",
        "country": "Colombia",
        "budget": 50,
        "createdAt": "2020-09-04T13:32:42.168Z",
        "updatedAt": "2020-09-04T13:32:42.168Z",
        "__v": 0
    }
}
```

#### • PATCH Survey

- URL: `http://localhost:4000/survey/<_id del cuestionario>`
- Ejemplo: `http://localhost:4000/survey/5f51b3684757c94650678303`
- Token de Autorización: Requerido

> Body
```
{
    "budget": 300
}
```
> Response
```
{
    "status": 200,
    "message": "Survey updated",
    "body": {
        "budget": 300
    }
}
```

#### • DELETE Survey

- URL: `http://localhost:4000/survey/<_id del cuestionario>`
- Ejemplo: `http://localhost:4000/survey/5f5240ef89e724361cca0f26`
- Token de Autorización: Requerido

> Response
```
{
    "status": 200,
    "message": "Survey 5f5240ef89e724361cca0f26 deleted"
}
```

### Users

#### • GET Users

- URL: `http://localhost:4000/user`

> Response
```

{
    "status": 200,
    "message": "Users listed",
    "body": [
        {
            "_id": "5f3a001e747bf745042b59b7",
            "first_name": "Maria",
            "last_name": "Sanchez",
            "password": "$2b$10$TiCLZ9cZcl0GWn/xKTRIRuQA.T44ZVjHTztbSLHwfI1aWitaNFcIe",
            "email": "maria@gmail.com",
            "country": "Colombia",
            "city": "Cali",
            "createdAt": "2020-08-17T03:57:18.686Z",
            "updatedAt": "2020-08-17T03:57:18.686Z",
            "__v": 0
        },
        {
            "_id": "5f3ea8784eb5b31c7cc8a818",
            "email": "juan@juan.co",
            "password": "$2b$10$aRItGAo/qqH8hyDsc/CNp.DqU3YuvAckX5OWUiasH/skSmEO4aznW",
            "first_name": "juan",
            "last_name": "Gomez",
            "country": "Colombia",
            "city": "Bogota",
            "createdAt": "2020-08-20T16:44:40.956Z",
            "updatedAt": "2020-08-20T16:44:40.956Z",
            "__v": 0
        }
    ]
}

```

#### • GET One User

- URL: `http://localhost:4000/user/<_id del usuario>`
- Ejemplo: `http://localhost:4000/user/5f3a001e747bf745042b59b7`

> Response
```
{
    "status": 200,
    "message": "User listed",
    "body": {
        "_id": "5f3a001e747bf745042b59b7",
        "first_name": "Maria",
        "last_name": "Sanchez",
        "password": "$2b$10$TiCLZ9cZcl0GWn/xKTRIRuQA.T44ZVjHTztbSLHwfI1aWitaNFcIe",
        "email": "maria@gmail.com",
        "country": "Colombia",
        "city": "Cali",
        "createdAt": "2020-08-17T03:57:18.686Z",
        "updatedAt": "2020-08-17T03:57:18.686Z",
        "__v": 0
    }
}
```

#### • POST User

- URL: `http://localhost:4000/user`
- Token de Autorización: Requerido

> Body
```
{
    "first_name": "Sergio",
    "last_name": "Rodriguez",
    "password": "123456",
    "email": "sergior@gmail.com",
    "country": "Peru",
    "city": "Lima"
}
```

> Response
```
{
    "status": 201,
    "message": "User created",
    "body": {
        "_id": "5f5246a589e724361cca0f29",
        "first_name": "Sergio",
        "last_name": "Rodriguez",
        "password": "$2b$10$N3Lo7T7lHOKCn0esdlphs..NDC20g6vWa5WbuG.tNTqupDQVKX/Cm",
        "email": "sergior@gmail.com",
        "country": "Peru",
        "city": "Lima",
        "createdAt": "2020-09-04T13:52:37.936Z",
        "updatedAt": "2020-09-04T13:52:37.936Z",
        "__v": 0
    }
}
```

#### • PATCH User #####

- URL: `http://localhost:4000/user/< _id del usuario >`
- Ejemplo: `http://localhost:4000/user/5f5246a589e724361cca0f29`
- Token de Autorización: Requerido

> Body
```
{
    "email": "rogriduez@gmail.com",
    "city": "Cusco",
    "password": "123456"
}
```
> Response
```
{
    "status": 200,
    "message": "User 5f5249b6f7b29249c8b470bc updated",
    "body": {
        "password": "$2b$10$oKyVkfhHZo9t8oGpu6g25.m4ke8F0dwdgHEcIl0fNx6cWjBMkbq66",
        "email": "rogriduez@gmail.com",
        "city": "Cusco"
    }
}
```

#### • DELETE User

- URL: `http://localhost:4000/user/<_id del usuario>`
- Ejemplo: `http://localhost:4000/user/5f5246a589e724361cca0f29`
- Token de Autorización: Requerido

> Response
```
{
    "status": 200,
    "message": "User 5f5246a589e724361cca0f29 deleted"
}
```

