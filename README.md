# AltEthical: The ethical alternative
[![made-with-Go](https://img.shields.io/badge/Made%20with-Go-1f425f.svg)](http://golang.org) [![Website epicportfol.io](https://img.shields.io/website-up-down-green-red/http/altethical.com)](http://altethical.com)


A website for finding ethical alternatives to popular products.

## Made using
- Go
- GCP Vision API
- React
- GCP cloud run

## Directory structure

- `.github` github actions and github settings
- `backend` backend systems, written in go
- `build` all build configurations, including dockerfiles, docker-compose, cloudbuild, and envoy configuration files
- `config` system config for configuring database and application settings
- `database` database schema and scripts
- `frontend` react frontend
- `proto` protobuf representation of the grpc services used in this project
- `sysl` system specification language; a diagramming tool to describe how our service works 
