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

Se utilizó ChatGPT como herramienta de apoyo durante la realización del trabajo práctico. Se consultó principalmente para comprender el funcionamiento de la protección de ramas, el flujo de trabajo con Pull Requests y el procedimiento para generar y resolver un conflicto de merge.

Las acciones realizadas en GitHub y las decisiones tomadas durante la resolución del conflicto fueron verificadas durante el desarrollo del trabajo.