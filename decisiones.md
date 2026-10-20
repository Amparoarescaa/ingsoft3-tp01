# Decisiones del trabajo práctico

## Enlaces del TP7

### Repositorio y release

- Repositorio público:
  https://github.com/Amparoarescaa/ingsoft3-tp01

- Release v7.0.0:
  https://github.com/Amparoarescaa/ingsoft3-tp01/releases/tag/v7.0.0

- Commit desplegado en producción:
  f6b721baca3bfa3de528df9593924fed71ea96bd

### Imágenes Docker publicadas en GHCR

- Backend (público):
  https://github.com/Amparoarescaa/ingsoft3-tp01/pkgs/container/petstyle-backend

- Frontend (público):
  https://github.com/Amparoarescaa/ingsoft3-tp01/pkgs/container/petstyle-frontend

- Etiqueta de la imagen backend:
  sha-f6b721baca3bfa3de528df9593924fed71ea96bd

- Etiqueta de la imagen frontend:
  sha-f6b721baca3bfa3de528df9593924fed71ea96bd

Ambas imágenes se construyeron una sola vez y se utilizaron
para desplegar primero en QA y después en producción.

### Error intencional y bloqueo de producción

- Commit que introdujo el error:
  56ed77a

- Ejecución con integración verde y E2E roja:
  https://github.com/Amparoarescaa/ingsoft3-tp01/actions/runs/39088755475

- Artefacto de integración (verde):
  playwright-integration-report

- Artefacto E2E (rojo):
  playwright-report-html

Ambos artefactos están disponibles en la sección Artifacts
de la ejecución fallida indicada anteriormente.

El error se introdujo en el código de la aplicación,
impidiendo que el carrito guardara correctamente los productos.

Las pruebas de integración finalizaron correctamente,
pero las pruebas E2E detectaron el problema.

Como consecuencia, el pipeline bloqueó el despliegue
a producción.

### Corrección y despliegue exitoso

- Commit de corrección:
  ea82c12

- Ejecución completa en verde, con aprobación manual
  y despliegue exitoso a producción:
  https://github.com/Amparoarescaa/ingsoft3-tp01/actions/runs/39089520592

### Aplicación desplegada

- Frontend QA:
  https://petstyle-frontend-qa.onrender.com

- Backend QA:
  https://petstyle-backend-qa.onrender.com

- Frontend Producción:
  https://petstyle-frontend-prod.onrender.com

- Backend Producción:
  https://petstyle-backend-prod.onrender.com

## Enlaces de este TP — TP6

### Aplicación desplegada

- Frontend QA: https://petstyle-frontend-qa.onrender.com
- Backend QA: https://petstyle-backend-qa.onrender.com
- Frontend Producción: https://petstyle-frontend-prod.onrender.com
- Backend Producción: https://petstyle-backend-prod.onrender.com

### Versión estable

- Tag v6.0.0: https://github.com/Amparoarescaa/ingsoft3-tp01/releases/tag/v6.0.0
- Commit estable: 0e267a0e3f9205b8e4345c908d7a40537f6cf03e

### Ejecuciones de GitHub Actions

- Ejecución #30 — Despliegue a QA exitoso y producción rechazada:
  https://github.com/Amparoarescaa/ingsoft3-tp01/actions/runs/38010356393

- Ejecución #32 — Despliegue a QA exitoso y producción aprobada:
  https://github.com/Amparoarescaa/ingsoft3-tp01/actions/runs/38063635460

### Imágenes Docker publicadas en GHCR

- Backend (público):
  https://github.com/Amparoarescaa/ingsoft3-tp01/pkgs/container/petstyle-backend

- Frontend (público):
  https://github.com/Amparoarescaa/ingsoft3-tp01/pkgs/container/petstyle-frontend

Las imágenes se publican automáticamente desde GitHub Actions
cuando los tests finalizan correctamente y los cambios llegan
a la rama main.

Cada imagen se identifica mediante un tag basado en el SHA
del commit, lo que permite relacionarla con una versión
específica del código.


## TP1 — Git colaborativo

### Conflicto de merge

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

## TP4 — CI: Pipelines as Code

### Estructura del pipeline

El pipeline de CI tiene dos jobs separados: `build-backend` y `build-frontend`, porque la aplicación PetStyle tiene un Dockerfile para cada uno de esos componentes. Los jobs se ejecutan en paralelo porque ninguno depende del resultado del otro para poder construir su imagen. Esto permite verificar ambos componentes de forma independiente y reduce el tiempo total del pipeline.

El workflow se ejecuta tanto en los Pull Requests hacia `main` como en los pushes a `main`. Los Pull Requests permiten verificar los cambios antes del merge, mientras que la ejecución sobre `main` permite comprobar el estado de la rama principal una vez integrado el cambio.

### Cache de capas

Se configuró cache de Docker Buildx de forma independiente para backend y frontend. En una segunda ejecución, las capas que no cambiaron pueden reutilizarse y aparecen como `CACHED` en los logs.

Por ejemplo, pueden reutilizarse capas correspondientes a dependencias, archivos copiados o pasos de build mientras sus entradas no hayan cambiado. Si cambia una instrucción o alguno de los archivos de los que depende una capa, esa capa y las posteriores que correspondan deben reconstruirse.

Si el cache desaparece, el pipeline sigue funcionando correctamente, pero Docker debe volver a construir las capas desde cero, por lo que la ejecución tarda más. El cache es una optimización y no un requisito para que el build sea correcto.

### Uso de los Dockerfiles

El pipeline construye las imágenes utilizando los mismos Dockerfiles creados en el TP2, en lugar de implementar un proceso de compilación diferente dentro del workflow. De esta forma, la definición utilizada por CI es la misma que se utiliza para construir los contenedores de la aplicación, evitando tener dos procesos de build distintos que podrían producir resultados diferentes.

### Problemas encontrados y soluciones

Al configurar el workflow aparecieron inicialmente problemas con las rutas de los contextos de build y con la indentación del archivo YAML. Se corrigieron las rutas para que apunten a los Dockerfiles reales de PetStyle y se corrigió la estructura del workflow hasta lograr que ambos jobs finalizaran correctamente.

También se provocó intencionalmente una falla en el Dockerfile del backend para comprobar el funcionamiento del pipeline como gate. El job `build-backend` falló y GitHub bloqueó el merge del Pull Request. Luego se corrigió el Dockerfile, el pipeline volvió a ejecutarse correctamente y el merge quedó habilitado.

Se configuraron `build-backend` y `build-frontend` como required status checks de `main` y se activó el requisito de mantener la rama actualizada antes del merge. Esto se verificó con un Pull Request que quedó marcado como desactualizado después de que `main` recibiera otro cambio; al actualizar la rama, los checks volvieron a ejecutarse y el merge quedó habilitado.

### Uso de IA

Se utilizó ChatGPT como asistencia para interpretar la consigna, configurar el workflow de GitHub Actions, diagnosticar errores del YAML y de las rutas de build, y guiar la configuración y verificación de las protecciones de `main`.

Las sugerencias fueron verificadas ejecutando el pipeline en GitHub Actions y observando los resultados reales: ambos builds en paralelo, reutilización del cache mediante capas `CACHED`, bloqueo del merge ante una falla intencional, ejecución correcta después del fix, required status checks y comportamiento de una rama desactualizada. También se verificó que el badge agregado al README muestre el estado del workflow y enlace a su historial de ejecuciones.

## TP5 — Testing y Calidad

### Lógica testeada

Se incorporaron tests unitarios tanto en el backend como en el frontend de PetStyle, priorizando reglas de negocio que pueden verificarse de manera aislada.

En el backend se extrajo lógica relacionada con los pedidos a `src/pedidos.js`. Se probaron reglas como la validación de cantidades, validación de stock, cálculo de subtotales y totales, y obtención de productos mediante un repositorio. Estas reglas son relevantes porque intervienen directamente en la creación de un pedido y permiten detectar cantidades inválidas, falta de stock y errores en los cálculos antes de persistir información.

En el frontend se extrajo lógica del carrito a `src/logica/carrito.js`. Se probaron el cálculo de subtotales y totales, la detección de un carrito vacío y el cálculo y validación de descuentos. También se separó el envío de pedidos en `src/servicios/pedidos.js` para poder probar esa interacción sin realizar una petición HTTP real.

Los tests utilizan la estructura Arrange, Act y Assert. Además, tanto backend como frontend incluyen tests parametrizados, casos inválidos o de error y tests con mocks.

### Refactor para permitir mocks

En el backend, la obtención de un producto dependía directamente de PostgreSQL a través del pool de conexiones. Para poder probar esa lógica de forma aislada se creó `obtenerProducto`, que recibe el repositorio como dependencia. En producción se utiliza `repositorioProductos`, mientras que en el test se proporciona un repositorio falso mediante `vi.fn()`.

En el frontend se aplicó el mismo criterio al envío de pedidos. La función `enviarPedido` recibe el cliente HTTP como parámetro. La aplicación real le pasa la instancia de Axios, mientras que el test utiliza un cliente simulado con `vi.fn()`. De esta manera el test verifica la interacción sin depender de la red ni del backend real.

### Herramientas utilizadas

Debido a que PetStyle utiliza Node.js tanto para las herramientas del frontend como para el backend, se utilizó Vitest 5.0.3 como framework de testing y `@vitest/coverage-v8` para medir cobertura.

Los tests parametrizados se implementaron mediante `it.each`. Los dobles y mocks se implementaron con `vi.fn()` y `mockResolvedValue`. La cobertura se obtuvo mediante el provider V8 y los thresholds se configuraron en `vitest.config.js`.

Para definir qué archivos forman parte de la medición de coverage se utilizó coverage.include en la configuración de Vitest.

### Threshold de cobertura

Se estableció un threshold global de 90% tanto para líneas como para branches en backend y frontend.

Se eligió 90% porque permite exigir una cobertura alta sobre la lógica seleccionada sin exigir artificialmente un 100% en todos los casos. Además, controlar branches junto con lines permite detectar situaciones en las que una línea fue ejecutada pero no se recorrieron todas las decisiones posibles de un `if`.

Antes de la demostración del gate, el backend obtuvo 93,75% de cobertura de líneas y 90% de branches. El frontend alcanzó 100% de líneas y 100% de branches una vez incorporados todos los tests.

El threshold se aplica directamente desde Vitest. Si cualquiera de las métricas configuradas queda por debajo del 90%, el comando termina con código de error y el job correspondiente de GitHub Actions queda en rojo.

### Exclusiones de cobertura

En el backend se mide específicamente `src/pedidos.js`, donde se concentró la lógica de negocio que se decidió probar unitariamente. Se dejaron fuera del cálculo `server.js`, encargado principalmente de Express, rutas y coordinación HTTP, y `db.js`, encargado de la conexión con PostgreSQL.

En el frontend se incluyen `src/logica/**/*.js` y `src/servicios/pedidos.js`. Los componentes React y la configuración de Axios no se incluyeron porque este TP se enfocó en tests unitarios sin DOM y en aislar la lógica de negocio y las dependencias externas.

Las exclusiones no se utilizaron para ocultar reglas incluidas en los módulos seleccionados: la lógica que se extrajo para ser testeada permanece dentro del cálculo de cobertura.

### Coverage alto no garantiza calidad

Un porcentaje alto de coverage solamente indica qué código fue recorrido durante los tests, pero no demuestra por sí mismo que las verificaciones sean correctas.

Por ejemplo, un test podría ejecutar `calcularSubtotal(1000, 2)` y aumentar la cobertura de esa función, pero si no verificara que el resultado sea `2000`, el código estaría cubierto sin comprobar realmente el comportamiento esperado. Por eso los tests implementados incluyen assertions sobre los resultados y casos de error, y no se utilizó el porcentaje de cobertura como única medida de calidad.

### Primer Pull Request bloqueado por coverage

En el Pull Request #23 se agregó intencionalmente la nueva regla `calcularDescuento` sin agregar inicialmente sus tests. Los 9 tests existentes del frontend continuaron pasando, pero la cobertura descendió a 66,66% de líneas y 50% de branches.

Como ambas métricas quedaron por debajo del threshold de 90%, Vitest finalizó con error y el required check `build-frontend` quedó en rojo. GitHub bloqueó el merge aunque todos los tests existentes hubieran pasado.

Luego se agregaron únicamente los tests correspondientes a `calcularDescuento`, incluyendo descuento normal, porcentaje cero y porcentajes inválidos. El frontend pasó a 13 tests y recuperó 100% de lines y branches. El mismo Pull Request volvió a ejecutar el pipeline, los checks `build-backend` y `build-frontend` quedaron verdes y recién entonces se realizó el merge.

### Análisis de un camino sin cubrir

Al revisar el reporte de coverage del backend se detectó que `src/pedidos.js` tenía 93,75% de cobertura de líneas y 90% de branches. El reporte marcó como no cubierta la línea correspondiente al `throw new Error("Producto no encontrado")` dentro de `obtenerProducto`.

El camino no cubierto ocurre cuando `repositorio.buscarPorId(productoId)` no encuentra el producto y devuelve un valor nulo. Un caso concreto que recorrería ese camino sería utilizar un repositorio simulado cuyo método `buscarPorId` devuelva `null`, por ejemplo al consultar un identificador de producto inexistente.

Se decidió no agregar un test adicional para ese camino en esta instancia. El comportamiento fue identificado y analizado a partir del reporte de coverage, y el backend igualmente cumple el threshold definido: 93,75% de líneas y 90% de branches. Esta decisión también permite mostrar que alcanzar el umbral no implica necesariamente tener cubiertos todos los caminos posibles y que el reporte debe analizarse, no solamente observar su porcentaje final.

### Evidencias del quality gate

La primera demostración se realizó en el Pull Request #23:

https://github.com/Amparoarescaa/ingsoft3-tp01/pull/23

Primero se agregó la función `calcularDescuento` sin sus tests. Los 9 tests existentes pasaban, pero el frontend tenía 66,66% de cobertura de líneas y 50% de branches. Como el mínimo configurado es 90%, `build-frontend` quedó en rojo y GitHub no permitió realizar el merge.

Ejecución donde falló por coverage:

https://github.com/Amparoarescaa/ingsoft3-tp01/actions/runs/37678239441/job/112987203139

Luego se agregaron los tests de la nueva función. El frontend pasó a tener 13 tests y 100% de cobertura de líneas y branches. Los dos checks quedaron verdes y el Pull Request pudo ser mergeado.

Ejecución correcta, donde también se puede ver el resumen y descargar los reportes de coverage:

https://github.com/Amparoarescaa/ingsoft3-tp01/actions/runs/37679586705?pr=23

### Segundo Pull Request bloqueado

Para comprobar que el control de coverage seguía funcionando, se creó el Pull Request #25 agregando una nueva función `calcularCostoEnvio` sin sus tests:

https://github.com/Amparoarescaa/ingsoft3-tp01/pull/25

Los 11 tests del backend pasan, pero la cobertura baja a 71,42% de líneas y 64,28% de branches. Como no llega al 90%, `build-backend` queda en rojo y el merge permanece bloqueado.

Ejecución del backend:

https://github.com/Amparoarescaa/ingsoft3-tp01/actions/runs/37681654368/job/112998945145?pr=25

Este Pull Request se deja abierto y en rojo para mostrar el funcionamiento del quality gate durante la defensa.

### Problemas encontrados y soluciones

Al comenzar con los tests del backend apareció un error por la forma en que se estaba importando Vitest. Se solucionó configurando `globals: true`.

Cuando se creó la carpeta `src` del backend también fue necesario modificar el Dockerfile para que esa carpeta se copie dentro de la imagen.

Además, se agregó `coverage/` al `.gitignore` porque los reportes de cobertura son archivos generados automáticamente y no es necesario guardarlos en el repositorio.

Los tests y el coverage se agregaron dentro de los jobs `build-backend` y `build-frontend` que ya existían desde el TP4. De esta manera se mantuvieron los mismos checks obligatorios de `main`, pero ahora también verifican los tests y el porcentaje de coverage.

### Uso de Inteligencia Artificial

Se utilizó ChatGPT como apoyo para interpretar la consigna, organizar los tests, configurar el coverage y el threshold, resolver errores durante la implementación y documentar las decisiones tomadas.

Las sugerencias se verificaron ejecutando los tests y el coverage localmente y mediante GitHub Actions. También se comprobó mediante los Pull Requests #23 y #25 que GitHub bloquea el merge cuando la cobertura queda por debajo del mínimo configurado.

---

## TP6 — Continuous Delivery y entornos

### Estrategia de despliegue

Se implementó un pipeline de Continuous Delivery utilizando GitHub Actions, GitHub Container Registry (GHCR), Render y Neon PostgreSQL.

El pipeline ejecuta automáticamente las pruebas del backend y frontend. Cuando los cambios llegan a la rama `main` y las verificaciones finalizan correctamente, se publican las imágenes Docker en GHCR, identificadas mediante el SHA del commit.

Los Pull Requests ejecutan las verificaciones de CI, pero no publican imágenes ni despliegan la aplicación.

**Evidencia del pipeline en un Pull Request:**

En la ejecución #35, correspondiente al Pull Request #30,
se completaron exitosamente los trabajos `build-backend`
y `build-frontend`.

Los trabajos `Deploy QA` y `Deploy Producción` fueron omitidos.
Además, las imágenes Docker no se publicaron en GHCR,
ya que la publicación está limitada a la rama `main`.

Ejecución #35:
https://github.com/Amparoarescaa/ingsoft3-tp01/actions/runs/38081467859

### Separación de entornos

Se configuraron dos entornos independientes:

- **QA:** permite verificar automáticamente los cambios antes de llegar a producción.
- **Producción:** requiere una aprobación manual mediante GitHub Environments.

Cada entorno cuenta con servicios separados de backend y frontend en Render y con su propia base de datos PostgreSQL en Neon (`app_qa` y `app_prod`).

Esta separación permite realizar pruebas en QA sin modificar los datos de producción.

### Configuración y despliegue

Las variables de configuración, como `DATABASE_URL` y `BACKEND_URL`, se administran mediante variables de entorno y no se incluyen directamente en las imágenes Docker.

El frontend utiliza una plantilla de Nginx que permite configurar la dirección del backend durante el inicio del contenedor.

Los despliegues se realizan mediante deploy hooks de Render, indicando el SHA del commit que debe desplegarse.

Se desactivó el Auto-Deploy de Render para que GitHub Actions controle cuándo se inicia cada despliegue.

### Verificación de los despliegues

Después de iniciar los despliegues, el pipeline ejecuta smoke tests para comprobar:

- La disponibilidad del backend mediante `/health`.
- El acceso a los productos mediante `/api/productos`.
- La disponibilidad del frontend mediante `/`.

Se incorporaron reintentos para contemplar los tiempos de inicio de los servicios gratuitos de Render.

Además, se verificaron manualmente los cambios visibles en QA y producción para confirmar que las nuevas versiones estuvieran efectivamente desplegadas.

### Aprobación y rechazo de producción

Se configuró el entorno `production` en GitHub Environments
con un revisor obligatorio. De esta manera, el despliegue a
producción no comienza hasta que una persona lo autoriza.

**Prueba de rechazo:**

En la ejecución #30 de GitHub Actions se completaron
correctamente las verificaciones y el despliegue a QA,
pero se rechazó manualmente el despliegue a producción.

El motivo fue evitar promover una versión antes de completar
su validación funcional en QA.

El rechazo inicial quedó registrado en la ejecución #30,
aunque no se ingresó una justificación escrita en ese momento.

Posteriormente, se repitió la ejecución #36 y se rechazó
manualmente el despliegue a producción con una justificación
escrita en GitHub Actions.

El motivo fue preservar la versión estable v6.0.0, recuperada
y verificada durante la prueba de rollback, evitando promover
el commit 9f6c659 a producción.

La justificación quedó registrada en la sección
"Deployment protection rules" de GitHub Actions.

**Prueba de aprobación:**

Posteriormente, se incorporó un cambio visible en el frontend:
"¡Nueva experiencia PetStyle 2026!".

En la ejecución #32 se verificó el cambio en QA y luego
se aprobó manualmente su despliegue a producción.

Finalmente, se comprobó que el mensaje aparecía también
en la aplicación de producción.

Esto permitió demostrar que QA se despliega automáticamente,
mientras que producción requiere autorización explícita.

### Prueba de rollback

Se publicó la versión estable `v6.0.0`, correspondiente al commit
`0e267a0e3f9205b8e4345c908d7a40537f6cf03e`.

Esta versión mostraba en el frontend el mensaje:
"¡Nueva experiencia PetStyle 2026!".

Posteriormente, se creó un Pull Request con un segundo cambio
visible que reemplazaba ese mensaje por:
"¡Promoción especial PetStyle!".

El cambio pasó las verificaciones de CI, se desplegó
automáticamente en QA y se aprobó manualmente para producción.

Se comprobó que el nuevo mensaje aparecía en producción.

**Ejecución del rollback:**

Desde Render, en el servicio `petstyle-frontend-prod`,
se utilizó la opción `Manual Deploy → Specific Commit`
para restaurar el commit exacto de `v6.0.0`.

- Versión recuperada: `v6.0.0`.
- Commit: `0e267a0e3f9205b8e4345c908d7a40537f6cf03e`.
- Inicio registrado: 15:54.
- Finalización: 15:55:07.
- Duración del despliegue informada por Render: 37,1 segundos.
- Resultado: `Deploy succeeded`, estado `Live`.

**Verificación del resultado:**

Se actualizó la aplicación de producción y se comprobó que
volvió a aparecer el mensaje "¡Nueva experiencia PetStyle 2026!".

También se verificó que había desaparecido el mensaje
"¡Promoción especial PetStyle!".

De esta manera, se demostró la recuperación de una versión
anterior mediante el despliegue de un commit específico.

El rollback se realizó sobre el frontend de producción,
que era el componente modificado. No fue necesario restaurar
el backend ni la base de datos, ya que no habían cambiado.

### Limitaciones y decisiones técnicas

Se utilizaron servicios gratuitos de Render y Neon para
implementar los entornos de QA y producción sin costos.

**Limitaciones de Render Free:**

- Los servicios pueden entrar en reposo después de un período
  de inactividad, provocando demoras en la primera solicitud.
- Los despliegues pueden tardar varios minutos debido a la
  construcción de las imágenes y al inicio de los contenedores.
- Los deploy hooks inician el despliegue, pero no esperan
  necesariamente a que la nueva versión esté disponible.

Por este último motivo, los smoke tests podrían ejecutarse
mientras todavía está funcionando la versión anterior.

Para reducir este problema se incorporaron reintentos en los
smoke tests y se verificaron manualmente los cambios visibles
en QA y producción.

**Decisiones adoptadas:**

Se eligió Render por su integración con GitHub y su
compatibilidad con aplicaciones Docker.

Se utilizó Neon para disponer de bases de datos PostgreSQL
separadas para QA y producción.

Aunque las imágenes Docker se publican en GHCR, Render
construye sus propias imágenes desde el repositorio GitHub.
Por lo tanto, en este TP las imágenes de GHCR funcionan como
artefactos publicados y versionados, pero no son las que
Render utiliza directamente para ejecutar la aplicación.

Esta limitación se tendrá en cuenta en los siguientes
trabajos prácticos.

## TP7 — Contenedores y pruebas E2E

### Build once, deploy many

En el TP6 habíamos configurado la publicación de imágenes Docker en GHCR, pero los servicios de Render todavía construían sus propias imágenes a partir del repositorio de GitHub. En este trabajo modificamos esa configuración para que Render utilice directamente las imágenes que publica GitHub Actions en GHCR.

Se implementó la estrategia Build once, deploy many, que consiste en construir una imagen Docker una sola vez y reutilizarla en diferentes entornos. En nuestro caso, las imágenes del backend y frontend se construyen y publican en GHCR, luego se despliegan en QA para realizar las pruebas y, si todas finalizan correctamente, esas mismas imágenes se utilizan en producción sin volver a construirlas.

Elegimos esta estrategia porque permite asegurarnos de que la versión que llega a producción sea exactamente la misma que fue probada previamente en QA, evitando diferencias que podrían aparecer si las imágenes se construyeran nuevamente.

### Versionado de imágenes

Para identificar las imágenes Docker se utilizaron etiquetas que incluyen el SHA del commit, es decir, un identificador único que Git asigna a cada versión del código. Esto permite saber a qué commit corresponde cada imagen publicada en GHCR y comprobar que QA y producción utilizan la misma versión.

Se eligió este sistema en lugar de utilizar solamente una etiqueta genérica como `latest`, porque permite identificar con mayor precisión qué versión se está desplegando y facilita el seguimiento de los cambios.

Además, se creó la release `v7.0.0`, asociada al commit `f6b721baca3bfa3de528df9593924fed71ea96bd`, que corresponde a la versión que superó todas las pruebas y fue desplegada correctamente en producción.

### Pruebas de integración

Se incorporaron pruebas de integración utilizando Playwright, que realizan solicitudes HTTP al backend desplegado en QA para comprobar que sus funcionalidades respondan correctamente. A diferencia de los tests unitarios, estas pruebas permiten verificar el comportamiento de la API en un entorno donde la aplicación ya está desplegada.

Las pruebas comprueban que se pueda consultar el listado de productos, crear un pedido de prueba, consultar ese pedido y eliminarlo correctamente. También se verifica que la API rechace solicitudes con datos inválidos y que un pedido eliminado ya no pueda consultarse.

Se decidió ejecutar estas pruebas en QA porque necesitábamos comprobar el funcionamiento del backend desplegado sin afectar el entorno de producción. Para ello se utilizaron pedidos identificados como datos de prueba y se incorporaron endpoints auxiliares que solamente están habilitados en QA y protegidos mediante un token.

### Pruebas End-to-End (E2E)

También se agregaron pruebas End-to-End con Playwright, que permiten simular acciones reales de un usuario dentro de un navegador. Mientras que las pruebas de integración verifican principalmente las respuestas del backend, las pruebas E2E comprueban que determinadas funcionalidades del frontend se comporten correctamente desde el punto de vista del usuario.

En PetStyle se decidió verificar que los productos se muestren correctamente, que se puedan agregar productos al carrito y que la aplicación redirija al inicio de sesión cuando un usuario intenta acceder al carrito sin estar autenticado.

Se eligieron estas funcionalidades porque forman parte del recorrido habitual de un usuario dentro de la aplicación. Además, las pruebas E2E permiten detectar errores que no necesariamente aparecen en las pruebas de integración, como problemas al guardar información del carrito en el navegador.

### Quality gate y despliegue a producción

Se configuró el pipeline para que, después de construir las imágenes Docker y desplegarlas automáticamente en QA, se ejecuten las pruebas de integración y las pruebas E2E. El despliegue a producción depende de que ambas etapas finalicen correctamente, por lo que si alguna falla, el pipeline no permite avanzar hacia producción.

Cuando todas las verificaciones terminan en verde, el despliegue queda esperando una aprobación manual desde GitHub Actions. Se mantuvo esta aprobación porque permite controlar cuándo se publica una nueva versión y evita que los cambios lleguen directamente a producción sin autorización.

Una vez aprobada la ejecución, GitHub Actions utiliza la API de Render para desplegar las mismas imágenes de GHCR que ya habían sido probadas en QA. El pipeline también espera a que los servicios terminen de desplegarse y realiza comprobaciones para verificar que respondan correctamente.

### Demostración del bloqueo de producción

Para demostrar que el bloqueo de producción funcionaba, se introdujo intencionalmente un error en el frontend que impedía guardar correctamente los productos agregados al carrito. Este cambio se realizó en una rama y posteriormente se integró mediante un Pull Request, provocando una nueva ejecución del pipeline.

En esa ejecución, las pruebas de integración finalizaron correctamente porque el backend continuaba funcionando como se esperaba. Sin embargo, las pruebas E2E detectaron que los productos agregados al carrito no se guardaban correctamente, por lo que esa etapa terminó en rojo y el despliegue a producción quedó bloqueado.

Después se creó otra rama para corregir el problema, restaurando el guardado del carrito en `localStorage`. La corrección se integró mediante un nuevo Pull Request y se ejecutó nuevamente el pipeline. Esta vez todas las pruebas finalizaron correctamente, se habilitó la aprobación manual y se completó el despliegue a producción.

De esta manera se comprobó que las pruebas E2E podían detectar un error real del frontend y evitar que una versión defectuosa llegara a producción. Los enlaces a las dos ejecuciones de GitHub Actions y sus reportes de Playwright se encuentran al comienzo de este documento.

### Problemas encontrados y soluciones

**Configuración de las pruebas de integración:** Para poder comprobar la creación, consulta y eliminación de pedidos fue necesario incorporar endpoints auxiliares al backend. Como estas operaciones se utilizarían solamente para las pruebas, se decidió habilitarlas únicamente en QA y protegerlas mediante un token, evitando que pudieran utilizarse de la misma manera en producción. Durante las primeras ejecuciones apareció un error en la validación del token, que se solucionó ajustando su comparación para evitar problemas provocados por espacios en blanco.

**Despliegue de imágenes Docker:** Al comenzar este trabajo, los servicios de Render todavía construían sus propias imágenes desde GitHub, como se había documentado en el TP6. Esto no permitía garantizar que se estuvieran reutilizando las imágenes publicadas en GHCR, por lo que fue necesario modificar la configuración de los servicios y el pipeline. Se solucionó configurando Render para utilizar las imágenes de GHCR y GitHub Actions para desplegarlas indicando la etiqueta SHA correspondiente a cada commit.

**Demoras en Render:** Durante las verificaciones también fue necesario tener en cuenta que los servicios gratuitos de Render pueden tardar en responder después de un período de inactividad. Para evitar que las pruebas comenzaran antes de que los servicios estuvieran disponibles, se incorporaron verificaciones del estado de los despliegues y reintentos en las solicitudes.

### Uso de inteligencia artificial

Se utilizó inteligencia artificial como herramienta de apoyo durante el desarrollo del TP7, principalmente para comprender la estrategia Build once, deploy many, revisar la configuración del pipeline de GitHub Actions y preparar las pruebas de integración y E2E con Playwright.

También se utilizó para analizar los errores que aparecieron durante las ejecuciones, revisar posibles soluciones y organizar la documentación del trabajo. Los cambios realizados se comprobaron mediante las ejecuciones reales de GitHub Actions y las pruebas sobre los entornos de QA y producción.
---

## TP8 — Infraestructura como Código (IaC)

### Implementación de Terraform

En este trabajo se incorporó Terraform para administrar la infraestructura de PetStyle mediante archivos de configuración, en lugar de crear y configurar todos los servicios manualmente desde las plataformas.

Se creó el directorio `infra`, donde se definieron los proveedores y los recursos necesarios para desplegar un entorno de preproducción. Se utilizaron los proveedores de Render y Neon, que permiten administrar los servicios de la aplicación y la base de datos PostgreSQL.

Se eligió Terraform porque permite describir la infraestructura mediante código, conocer los cambios antes de aplicarlos y volver a crear los recursos de manera reproducible.

### Entorno de preproducción

Se creó un entorno independiente de QA y producción, compuesto por una base de datos PostgreSQL en Neon, un backend en Render y un frontend en Render.

Para el backend y el frontend se reutilizaron las imágenes Docker publicadas en GitHub Container Registry durante el TP7, identificadas mediante una etiqueta SHA. De esta manera, no fue necesario construir imágenes diferentes para preproducción y se mantuvo la estrategia de reutilizar los mismos artefactos entre entornos.

El backend se configuró con la variable `APP_ENV=preprod` y con la conexión a la base de datos creada por Terraform. El frontend se configuró para comunicarse con el backend de preproducción mediante Nginx.

Los tres recursos se definieron utilizando planes gratuitos, evitando incorporar servicios pagos para realizar el trabajo.

### Configuración de la base de datos

Terraform se utilizó para crear el proyecto de PostgreSQL en Neon. Sin embargo, la creación del proyecto no incorpora automáticamente las tablas y los datos iniciales de PetStyle.

Por ese motivo, después de crear la infraestructura se ejecutó el archivo `petstyle/backend/database/init.sql`, que crea las tablas de productos y pedidos y carga seis productos iniciales.

La dirección de conexión se obtuvo desde una salida sensible de Terraform, sin escribir la contraseña directamente en los archivos de configuración ni publicarla en el repositorio.

### Verificación del funcionamiento

Después del primer despliegue se comprobó que el backend respondiera correctamente en `/health` y que pudiera conectarse a PostgreSQL mediante `/db`.

También se verificó que el endpoint `/api/productos` devolviera los seis productos cargados en la base de datos.

Luego se comprobó que el frontend estuviera disponible y que pudiera consultar los productos a través de su configuración de Nginx. Finalmente, se abrió la aplicación desde el navegador y se confirmó que la tienda mostrara correctamente los productos, sus imágenes y sus precios.

### Prueba de destrucción y reconstrucción

Para demostrar que la infraestructura podía administrarse mediante código, primero se ejecutó `terraform plan -destroy`. El resultado indicó que se eliminarían únicamente los tres recursos de preproducción, sin incluir los servicios de QA ni producción.

Después se ejecutó `terraform destroy`, que eliminó correctamente la base de datos, el backend y el frontend de preproducción.

A continuación, se ejecutó nuevamente `terraform apply` utilizando los mismos archivos de configuración. Terraform creó otra vez los tres recursos, sin necesidad de configurarlos manualmente en Render o Neon.

Como la nueva base de datos estaba vacía, se volvió a ejecutar `init.sql` para crear las tablas y cargar los productos iniciales. Finalmente, se consultó `/api/productos` a través del frontend reconstruido y se obtuvo una respuesta HTTP 200 con los seis productos.

Esta prueba permitió comprobar que la infraestructura podía destruirse y recrearse a partir del código Terraform, manteniendo separados los entornos de preproducción, QA y producción.

### Problemas encontrados y soluciones

**Configuración de Neon:** Durante los primeros intentos de creación, Neon requirió indicar explícitamente el identificador de la organización. Además, el valor predeterminado de retención del historial superaba el permitido por el plan gratuito. Se solucionó agregando `org_id` y configurando `history_retention_seconds = 21600`, equivalente a seis horas.

**Base de datos sin tablas:** Después de crear el proyecto de Neon, la conexión a PostgreSQL funcionaba, pero la consulta de productos devolvía un error porque todavía no existían las tablas. Se solucionó ejecutando el archivo SQL de inicialización de PetStyle.

**Administración de credenciales:** Para evitar incluir claves de acceso y contraseñas en el repositorio, se utilizaron variables de entorno para las API de Render y Neon. También se configuró `.gitignore` para excluir archivos de estado de Terraform y archivos de variables que pudieran contener información sensible.

### Uso de inteligencia artificial

Se utilizó inteligencia artificial como herramienta de apoyo para comprender el funcionamiento de Terraform, preparar los archivos de infraestructura y revisar los errores que aparecieron durante la configuración de los proveedores.

También se utilizó para organizar las verificaciones del entorno, interpretar los resultados de los comandos `plan`, `apply` y `destroy`, y documentar las decisiones técnicas. El funcionamiento se comprobó mediante ejecuciones reales de Terraform y solicitudes HTTP a la aplicación desplegada.

---

## TP9 — DevSecOps y Observabilidad

### Seguridad y análisis de dependencias

Se configuró Dependabot para revisar las dependencias npm del backend y frontend, y las acciones utilizadas por GitHub Actions. Se verificó su funcionamiento mediante la actualización de una dependencia, integrada a main con las pruebas de CI exitosas.

Actualización integrada: Dependabot generó el Pull Request #42 para actualizar la dependencia pg del backend, utilizada para la conexión con PostgreSQL, desde la versión 8.23.0 a 8.23.1.

Se decidió aceptar la actualización porque corresponde a una versión de parche que permite mantener actualizada la dependencia sin introducir cambios mayores de versión. Antes de integrarla se verificó que las seis comprobaciones automáticas finalizaran correctamente. El PR fue fusionado a main mediante el commit c3dbe24.

También se habilitó CodeQL para realizar análisis estático de seguridad y se activó la protección contra la publicación de secretos (Push Protection).

### Monitoreo de disponibilidad

Se configuró UptimeRobot para monitorear el endpoint `/health` del backend de producción.

Para comprobar las alertas se modificó temporalmente la URL monitoreada, provocando una respuesta HTTP 404 sin detener realmente el backend.

UptimeRobot registró el incidente el 19/10/2026 a las 19:20:14 y su recuperación a las 19:21:18, con una duración total de 1 minuto y 4 segundos. Se recibieron las notificaciones DOWN y UP por correo electrónico.

Tiempo de notificación: Durante la prueba del 19/10/2026, UptimeRobot registró el inicio del incidente a las 19:20:14 y el correo de alerta DOWN se recibió a las 19:20, según Gmail. Esto permite confirmar que la notificación llegó durante el mismo minuto del incidente. Gmail informó un tiempo de entrega del mensaje de 5 segundos, aunque este valor corresponde al transporte del correo y no al tiempo total de detección de la caída. El incidente tuvo una duración de 1 minuto y 4 segundos.

Finalizada la prueba, se restauró la URL correcta y se pausó el monitor para evitar consumir horas del plan gratuito de Render.

### Observabilidad con Sentry

Se integró Sentry en el backend Express y en el frontend React para registrar errores y analizar el rendimiento de la aplicación.

La integración se realizó mediante un pull request, con las pruebas de CI y CodeQL exitosas.

Se comprobó la recepción de errores de prueba en ambos proyectos de Sentry y se analizaron las transacciones registradas en producción.

Entre las transacciones observadas, Navigation presentó una duración p75 de 1,09 segundos, Pageload de 725,25 ms y GET /api/productos de 187,88 ms.

A partir de estos datos se creó una tarjeta en el tablero del TP3 para investigar posibles mejoras en el rendimiento de la navegación del frontend.

### Problemas encontrados y soluciones

**Configuración del frontend:** Como Vite incorpora sus variables de entorno durante la compilación, fue necesario configurar el DSN de Sentry como argumento de construcción de la imagen Docker desde GitHub Actions.

**Verificación de errores:** Se generaron errores controlados para comprobar que Sentry recibiera eventos tanto del frontend como del backend, sin modificar el funcionamiento normal de la aplicación.

### Uso de inteligencia artificial

Se utilizó inteligencia artificial como apoyo para configurar Dependabot, CodeQL, UptimeRobot y Sentry, interpretar los resultados de las pruebas y revisar la integración con Docker y GitHub Actions.

También se utilizó para analizar las métricas de rendimiento y organizar la documentación. Las configuraciones se verificaron mediante las ejecuciones reales del pipeline, las alertas de UptimeRobot y los eventos registrados en Sentry.