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