# Backend-Intellegent-Tourism-System
Estructura de fondo del proyecto sistema inteligente para turistas (Pandar) que tiene como objetivo brindar las rutas, datos y demas medios de conexión para lograr el funcionamiento del Frontend de la aplicación.

## Documentación

### Tecnologías
|Tecnología                                                             |Ventajas |
|:----------------------------------------------------------------------|---------|
|<img src="https://img.shields.io/badge/Node.js^11.1.0-darkgreen">             | Mayor dominio general en el equipo, nos permite utilizar JavaScript para construir el backend de una aplicación web e inmensa comunidad para recibir apoyo en los proyectos.|
|<img src="https://img.shields.io/badge/jsonwebtoken-^8.5.1-yellow">    | Gran seguridad al momento de controlar las sesiones al usar payload, firma y secreto como medios de encriptación |
|<img src="https://img.shields.io/badge/mongoose-^5.10-darkred">         | Permite construir estructuras para los documentos a usar en MongoDB e realizar consultas de un forma más eficiente |
|<img src="https://img.shields.io/badge/Express.js-^4.17.1-lightgrey">   | Facilidad en desarrollo de servidores y generacioón de rutas|
|<img src="https://img.shields.io/badge/MongoDB-dark">                  || 


### Equipo Backend y Data

|Miembro            |Rol                 |Tareas            |
|:------------------|:-------------------|:-----------------|
|Adrian Gutierrez   |**Data Scientist**  | Desarrollo algoritmo inteligente, Diagrama del algoritmo inteligent |
|Ildebrando Mora    |**Backend**         | Desarrollo del sistema de sesiones, Conexión con API TripAdvisor, Construcción de rutas users, auth y search-site|
|Juan Espitia       |**Backend**         | Creación de la estructura base del servidor, Mejora de la ruta search-site, Diagrama de Flujo|
|Francisco Suarez   |**Backend**         | Conexión con MongoDB, Desarrollo de turas touristic-sites  |
|Todos              | **Todos**          | Inserción de registros a la base de datos |

### Enlaces de Interes
|Nombre                  |Enlace|
|:-----------------------|:------------|
|Videos de las Reuniones |https://drive.google.com/drive/folders/1w8EpKRT_nDAw7tfnhyzEgh_CbkFCXN6l|
|Diagrama de Flujo       |             |
|Diagrama de Algoritmo   |             |

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

#### GET Search-Site

#### GET Search-Site (TripAdvisor)

### Touristic-Sites

#### GET Touristic-Sites

#### GET Touristic-Site

#### POST Touristic-Site

#### UPDATE Touristic-Site

#### DELETE Touristic-Site

### Users

#### GET Users

#### GET User

#### POST User

#### UPDATE User

#### DELETE User

