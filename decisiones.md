# Decisiones del trabajo práctico

## Conflicto de merge

El conflicto se generó al crear dos ramas a partir de `main`: `feature/titulo-a` y `feature/titulo-b`. En ambas ramas se modificó la misma línea del archivo `README.md`, pero con contenidos diferentes.

Primero se realizó el merge de `feature/titulo-a` a `main`. Al intentar integrar posteriormente `feature/titulo-b`, GitHub detectó que la misma línea había sido modificada de dos maneras diferentes y no pudo resolver automáticamente cuál debía conservarse.

## Resolución del conflicto

El conflicto se resolvió manualmente desde el editor de GitHub. Se analizaron las dos versiones disponibles y se decidió conservar la versión A, que ya se encontraba en `main`.

Luego se marcó el conflicto como resuelto, se realizó el commit correspondiente y finalmente se completó el merge del Pull Request.

## Cómo se podría haber evitado el conflicto

El conflicto no habría aparecido si las dos ramas hubieran modificado líneas diferentes del archivo. También podría haberse evitado actualizando la segunda rama con los cambios de `main` antes de realizar su modificación, para trabajar sobre la versión más reciente del archivo.

## Problemas encontrados y soluciones

Durante el trabajo se comprobó que no era posible realizar un `push` directamente sobre la rama `main` debido a la regla de protección configurada. Esto confirmó que los cambios debían realizarse mediante ramas y Pull Requests.

También se produjo intencionalmente un conflicto de merge al modificar la misma línea del `README.md` desde dos ramas diferentes. El conflicto se solucionó comparando ambas versiones y seleccionando manualmente el contenido que debía conservarse.

## Uso de Inteligencia Artificial

Se utilizó ChatGPT como herramienta de apoyo durante la realización del trabajo práctico. Se utilizó principalmente para comprender los comandos de Git, configurar la protección de la rama `main`, realizar el flujo de trabajo con ramas y Pull Requests, generar y resolver el conflicto de merge, y organizar la documentación solicitada.

La información y los procedimientos sugeridos por la IA fueron verificados mediante su ejecución práctica. Se comprobó que la protección de `main` rechazara efectivamente un push directo, que los cambios pudieran incorporarse mediante Pull Requests, que GitHub detectara el conflicto generado entre las dos ramas y que, una vez resuelto manualmente, permitiera completar el merge. También se verificó en GitHub que el tag y la release `v1.0.0` quedaran publicados correctamente.

---

## TP2 — Contenedores

### Elección de la aplicación

Para los trabajos prácticos a partir del TP2 se eligió **PetStyle**, una aplicación de e-commerce de productos para mascotas.

La aplicación cuenta con los tres componentes requeridos para trabajar durante el semestre: un frontend desarrollado con React y Vite, un backend desarrollado con Node.js y Express, y una base de datos PostgreSQL.

Se partió de un frontend existente que originalmente obtenía los productos desde FakeStore API. Se decidió eliminar esta dependencia externa y desarrollar un backend propio conectado a PostgreSQL. De esta forma, la aplicación puede ejecutarse de manera independiente, se tiene control sobre los datos y la lógica de negocio, y se evitan posibles problemas derivados de depender de un servicio externo.

La aplicación permite actualmente consultar productos y realizar pedidos. Al crear un pedido, el backend verifica que el producto exista, que la cantidad solicitada sea válida y que haya stock suficiente. El total se calcula utilizando los precios almacenados en la base de datos y, al confirmar la compra, se actualiza el stock.

Se consideró que esta aplicación es adecuada para continuar durante el semestre porque es lo suficientemente simple como para comprenderla y modificarla, pero contiene lógica de negocio que podrá utilizarse posteriormente para pruebas, integración continua y los demás trabajos prácticos de la materia.

### Arquitectura de contenedores

Se decidió separar la aplicación en tres servicios: `frontend`, `backend` y `db`. Estos servicios se administran mediante Docker Compose para poder levantar la aplicación completa de forma reproducible.

El frontend se construye con Node.js y Vite y se sirve mediante Nginx. Se configuró Nginx como proxy para que las solicitudes a `/api` sean redirigidas al servicio `backend`. De esta manera, el frontend no necesita conocer una dirección fija del backend.

El backend se comunica con PostgreSQL utilizando `db` como nombre de host. Se eligió esta configuración porque Docker Compose crea una red interna en la que los servicios pueden encontrarse mediante sus nombres, evitando depender de direcciones IP.

### Dockerfiles multi-stage

Se utilizaron Dockerfiles multi-stage tanto para el frontend como para el backend.

En el frontend, una primera etapa basada en Node.js instala las dependencias y genera el build de producción con Vite. La segunda etapa utiliza Nginx y contiene únicamente los archivos generados necesarios para servir la aplicación.

En el backend, una primera etapa instala las dependencias de producción y una segunda etapa contiene las dependencias y los archivos necesarios para ejecutar el servidor con Node.js.

Esta separación permite que las imágenes finales no incluyan archivos y herramientas innecesarias utilizadas durante las etapas de construcción.

Para comprobar el beneficio del enfoque multi-stage se comparó el tamaño de la etapa de construcción del frontend con el de la imagen final. La imagen correspondiente a la etapa de build ocupó aproximadamente 607 MB, mientras que la imagen final basada en Nginx ocupó aproximadamente 77,6 MB.

### Base de datos y persistencia

Se utilizó PostgreSQL como base de datos de PetStyle. Para evitar perder la información cuando se eliminan o recrean los contenedores, se configuró un volumen de Docker llamado `petstyle_data`.

También se incorporó un archivo `init.sql` que crea las tablas necesarias y carga los productos iniciales cuando PostgreSQL inicializa una base de datos nueva.

La persistencia se verificó eliminando y volviendo a crear los contenedores con `docker compose down` y `docker compose up`. Los pedidos previamente almacenados continuaron disponibles porque el volumen no había sido eliminado.

También se verificó el comportamiento al eliminar el volumen mediante `docker compose down -v`. En este caso, los pedidos almacenados fueron eliminados junto con el volumen. Al volver a levantar los servicios se creó un volumen nuevo y PostgreSQL ejecutó nuevamente `init.sql`, restaurando los productos iniciales.

### Healthcheck y dependencia entre servicios

Se agregó un `healthcheck` al servicio de PostgreSQL utilizando `pg_isready` para comprobar que la base de datos esté preparada para recibir conexiones.

El backend utiliza `depends_on` con la condición `service_healthy`. De esta manera, no comienza a ejecutarse simplemente porque el contenedor de PostgreSQL haya sido creado, sino que espera hasta que la base de datos esté disponible para aceptar conexiones.

### Variables de entorno y manejo de secretos

Las credenciales y parámetros de conexión a PostgreSQL se configuraron mediante variables de entorno.

Se utiliza un archivo `.env` para los valores locales, pero este archivo no se versiona en Git para evitar publicar información sensible. En su lugar, se mantiene un archivo `.env.example` con los nombres de las variables necesarias para que otra persona pueda saber qué debe configurar.

Docker Compose utiliza estas variables para configurar PostgreSQL y el backend. Dentro de la red de Docker, el backend utiliza `db` como host de la base de datos.

También se configuraron archivos `.dockerignore` tanto para el frontend como para el backend, evitando copiar al contexto de construcción archivos innecesarios como `node_modules`, `.env`, archivos de Git y otros archivos locales.

### Publicación de imágenes en un registry

Las imágenes finales del frontend y del backend se publicaron en GitHub Container Registry (GHCR) utilizando la versión `v0.1.0`.

Se publicaron las siguientes imágenes:

- `ghcr.io/amparoarescaa/petstyle-frontend:v0.1.0`
- `ghcr.io/amparoarescaa/petstyle-backend:v0.1.0`

Ambos paquetes se configuraron con visibilidad pública para permitir que las imágenes puedan descargarse sin depender del entorno local donde fueron construidas.

Además, se creó `docker-compose.registry.yml`, que utiliza las imágenes publicadas mediante `image:` en lugar de construirlas localmente mediante `build:`.

Se verificó el funcionamiento levantando la aplicación con este archivo. Los servicios `frontend`, `backend` y `db` iniciaron correctamente, PostgreSQL alcanzó el estado `healthy` y se comprobó que los contenedores de frontend y backend estuvieran utilizando específicamente las imágenes publicadas en GHCR con la versión `v0.1.0`.

Finalmente, se realizó una prueba funcional completa de PetStyle utilizando estas imágenes, verificando la carga de productos, el funcionamiento del carrito y la realización de una compra.

### Problemas encontrados y soluciones

Durante las primeras pruebas con Docker Compose, el contenedor del backend no podía iniciarse porque el puerto `3000` de la computadora ya estaba siendo utilizado por una ejecución local del backend.

Para identificar el problema se revisó el estado de los contenedores y se ejecutó el servicio para observar el error. Se comprobó que Docker no podía vincular el puerto `3000` del contenedor porque ya se encontraba ocupado. Se detuvo la ejecución local del backend y luego Docker Compose pudo iniciar correctamente los servicios.

También fue necesario adaptar el frontend original para eliminar la dependencia de FakeStore API. Se reemplazó el consumo de esa API externa por endpoints del backend propio de PetStyle, permitiendo que los productos y pedidos sean administrados utilizando PostgreSQL.

Durante la configuración de la base de datos también se revisó el script `init.sql`. Se eliminó el uso de `TRUNCATE` para que la inicialización se limite a crear y cargar los datos iniciales cuando PostgreSQL crea una base de datos nueva, evitando conflictos con las relaciones entre las tablas.

Durante la publicación de las imágenes en GitHub Container Registry, algunos primeros intentos de `docker push` finalizaron con un error del registry. Al volver a ejecutar los comandos de publicación, Docker reutilizó las capas que ya habían sido cargadas y ambas imágenes se publicaron correctamente.

### Uso de Inteligencia Artificial

Se utilizó ChatGPT como herramienta de apoyo durante el desarrollo del TP2. Se utilizó principalmente para interpretar los requisitos del trabajo práctico, adaptar la aplicación PetStyle para contar con frontend, backend y base de datos, comprender y configurar los Dockerfiles multi-stage, Docker Compose, Nginx, la persistencia mediante volúmenes, el healthcheck de PostgreSQL, el manejo de variables de entorno y la publicación de imágenes en GitHub Container Registry.

También se utilizó como apoyo para analizar errores encontrados durante las pruebas, como el conflicto producido por tener el puerto 3000 ocupado y los errores encontrados durante los primeros intentos de publicación de las imágenes, y para organizar la documentación y las evidencias requeridas.

Las configuraciones y soluciones propuestas con asistencia de IA fueron verificadas mediante su ejecución práctica. Se construyeron las imágenes, se levantaron los servicios con Docker Compose, se comprobó la comunicación entre frontend, backend y PostgreSQL, se verificó el healthcheck de la base de datos y se realizaron pruebas de persistencia de los datos.

También se verificó la diferencia de tamaño entre la etapa de construcción y la imagen final del frontend, se publicaron las imágenes del frontend y backend en GitHub Container Registry y se levantó PetStyle mediante `docker-compose.registry.yml` utilizando las imágenes publicadas. Finalmente, se comprobó el funcionamiento completo de la aplicación realizando una compra.

---

## TP3 — Planificación DevOps

### Duración del Sprint

Se configuró un Sprint de una semana mediante un campo de tipo `Iteration` en GitHub Projects.

Se eligió esta duración porque el alcance definido para el Sprint es reducido y está centrado en comenzar la implementación de integración continua. Una semana permite trabajar sobre las tareas planificadas y revisar los avances en un período corto, manteniendo ciclos de trabajo frecuentes.

### Límite de trabajo en progreso (WIP)

Se configuró un límite WIP de 2 elementos para la columna `In Progress`.

Se eligió este valor utilizando como referencia la regla de cantidad de personas del equipo + 1. Al tratarse de un trabajo realizado por una sola persona, el límite establecido es 2.

El objetivo es evitar comenzar demasiadas tareas al mismo tiempo y priorizar la finalización del trabajo que ya se encuentra en progreso antes de iniciar nuevas tareas.

### Análisis de una historia de usuario

Se analizó la siguiente historia:

`Como desarrollador quiero crear la tabla usuarios para guardar los datos.`

Se considera una mala historia de usuario porque está formulada como una tarea técnica y describe directamente una implementación de base de datos. No expresa un valor o una funcionalidad observable para el usuario, sino una decisión interna sobre cómo desarrollar el sistema.

Una posible reformulación sería:

`Como usuario quiero registrarme en la aplicación para poder tener una cuenta y acceder a sus funcionalidades.`

De esta manera, la historia describe una necesidad y un valor observable para el usuario. La creación de la tabla de usuarios podría luego definirse como una tarea técnica necesaria para implementar esa historia.

### Problemas encontrados y soluciones

Durante la configuración del Project se observó inicialmente que la épica y el bug aparecían directamente en la tabla, mientras que la historia y las tareas no se visualizaban como filas independientes. Al desplegar la jerarquía de la épica se comprobó que la historia y sus tareas estaban correctamente incorporadas como sub-issues.

También fue necesario verificar el funcionamiento de la automatización del Project. Se configuró la tarea de implementación del workflow como `In Progress` y, luego de realizar el merge del Pull Request asociado utilizando `Closes #12`, GitHub cerró automáticamente el issue y el Project modificó su estado a `Done`.

De esta manera se comprobó la trazabilidad entre la planificación y la implementación: desde la tarea se puede acceder al Pull Request y al cambio realizado en el código, y desde la tarea también se puede navegar hacia la historia y la épica correspondientes.

### Uso de Inteligencia Artificial

Se utilizó ChatGPT como herramienta de apoyo durante el desarrollo del TP3. Se utilizó principalmente para interpretar los requisitos del trabajo práctico, organizar la jerarquía entre épica, historia de usuario y tareas, configurar el Sprint y el límite WIP, comprender la automatización del Project y realizar el flujo de trazabilidad entre un issue y un Pull Request.

También se utilizó como apoyo para crear el esqueleto inicial del workflow de GitHub Actions y organizar la documentación solicitada.

Las indicaciones proporcionadas con asistencia de IA fueron verificadas directamente en GitHub. Se comprobó que la jerarquía entre issues fuera navegable, que la historia y las tareas estuvieran asignadas al Sprint, que el límite WIP estuviera configurado en la columna `In Progress` y que la automatización `Item closed` estableciera el estado `Done`.

Finalmente, se verificó la trazabilidad realizando el Pull Request #15 con la referencia `Closes #12`. El workflow de CI se ejecutó correctamente sobre el Pull Request y, después del merge, GitHub cerró automáticamente la tarea #12 y la movió de `In Progress` a `Done`.