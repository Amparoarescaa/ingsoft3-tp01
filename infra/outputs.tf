output "database_url" {
  description = "Conexión a PostgreSQL de preproducción"
  value       = neon_project.preprod.connection_uri
  sensitive   = true
}