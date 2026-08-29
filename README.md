# Proyecto IngSoft3 - versión A

## Instalación

```bash
git clone https://github.com/Amparoarescaa/ingsoft3-tp01.git
```

---

# TP2 — PetStyle

PetStyle es la aplicación seleccionada para continuar con los trabajos prácticos de Ingeniería de Software 3.

Es un e-commerce de productos para mascotas compuesto por:

- Frontend: React + Vite
- Backend: Node.js + Express
- Base de datos: PostgreSQL
- Nginx para servir el frontend y redirigir las solicitudes `/api`
- Docker Compose para ejecutar los servicios

## Ejecución con Docker Compose

### Requisitos

Para ejecutar la aplicación es necesario tener instalados:

- Git
- Docker
- Docker Compose

### Instalación desde una máquina limpia

Clonar el repositorio:

```bash
git clone https://github.com/Amparoarescaa/ingsoft3-tp01.git
```

Ingresar al directorio de PetStyle:

```bash
cd ingsoft3-tp01/petstyle
```

Crear el archivo de variables de entorno a partir del archivo de ejemplo:

```bash
cp .env.example .env
```

Levantar todos los servicios:

```bash
docker compose up -d
```

Docker Compose construirá las imágenes necesarias e iniciará los tres servicios:

- `frontend`
- `backend`
- `db`

Una vez iniciados los servicios, PetStyle estará disponible en:

```text
http://localhost:8080
```

El backend estará disponible en:

```text
http://localhost:3000
```

Para verificar el estado de los servicios:

```bash
docker compose ps
```

Para detener la aplicación:

```bash
docker compose down
```

Los datos almacenados en PostgreSQL se conservan mediante un volumen de Docker.

Para detener la aplicación y eliminar también el volumen de la base de datos:

```bash
docker compose down -v
```

## Ejecución utilizando imágenes publicadas

Las imágenes del frontend y del backend se encuentran publicadas en GitHub Container Registry con la versión `v0.1.0`.

Para ejecutar PetStyle utilizando las imágenes publicadas en lugar de construirlas localmente:

```bash
docker compose -f docker-compose.registry.yml up -d
```

Las imágenes utilizadas son:

```text
ghcr.io/amparoarescaa/petstyle-frontend:v0.1.0
ghcr.io/amparoarescaa/petstyle-backend:v0.1.0
```

Para detener los servicios:

```bash
docker compose -f docker-compose.registry.yml down
```

## Estructura de PetStyle

```text
petstyle/
├── backend/
│   ├── database/
│   │   └── init.sql
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── db.js
│   └── server.js
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── nginx.conf
├── .env.example
├── docker-compose.yml
└── docker-compose.registry.yml
```

## Persistencia de datos

PostgreSQL utiliza un volumen de Docker llamado `petstyle_data`.

Al ejecutar:

```bash
docker compose down
```

se eliminan los contenedores, pero los datos almacenados en PostgreSQL se conservan.

En cambio, al ejecutar:

```bash
docker compose down -v
```

se elimina también el volumen. Al volver a iniciar la aplicación se crea una base de datos nueva y se ejecuta nuevamente `init.sql`, restaurando los productos iniciales.