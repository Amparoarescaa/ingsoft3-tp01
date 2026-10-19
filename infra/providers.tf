terraform {
  required_version = ">= 1.5.0"

  required_providers {
    render = {
      source  = "render-oss/render"
      version = "1.9.1"
    }

    neon = {
      source  = "kislerdm/neon"
      version = "0.18.0"
    }
  }
}