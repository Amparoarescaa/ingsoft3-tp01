# Base de datos independiente para el entorno de preproducción.
resource "neon_project" "preprod" {
  name                      = "petstyle-preprod"
  org_id                    = "org-tiny-cell-64871798"
  region_id                 = "aws-us-east-1"
  pg_version                = 16
  history_retention_seconds = 21600
}

# Backend independiente para preproducción.
resource "render_web_service" "backend_preprod" {
  name   = "petstyle-backend-preprod"
  plan   = "free"
  region = "oregon"

  runtime_source = {
    image = {
      image_url = "ghcr.io/amparoarescaa/petstyle-backend"
      tag       = "sha-f6b721baca3bfa3de528df9593924fed71ea96bd"
    }
  }

  health_check_path = "/health"

  env_vars = {
    APP_ENV = {
      value = "preprod"
    }

    DATABASE_URL = {
      value = neon_project.preprod.connection_uri
    }
  }
}

# Frontend independiente para preproducción.
resource "render_web_service" "frontend_preprod" {
  name   = "petstyle-frontend-preprod"
  plan   = "free"
  region = "oregon"

  runtime_source = {
    image = {
      image_url = "ghcr.io/amparoarescaa/petstyle-frontend"
      tag       = "sha-f6b721baca3bfa3de528df9593924fed71ea96bd"
    }
  }

  env_vars = {
    BACKEND_URL = {
      value = render_web_service.backend_preprod.url
    }

    DNS_RESOLVER = {
      value = "8.8.8.8"
    }
  }
}