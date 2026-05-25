# Prueba Técnica QA Automation - CatFact API

## Descripción

Colección de pruebas automatizadas en Postman para la API pública
CatFact.ninja, cubriendo 4 endpoints con validaciones de status,
tipos de datos, formatos y tiempo de respuesta.

## Cómo importar y ejecutar

1. Clonar este repositorio
2. Abrir Postman → Import → seleccionar `postman/collection.json`
3. Abrir la colección y ejecutar con Collection Runner

## Endpoints probados

- GET /fact
- GET /fact?max_length=50
- GET /breeds
- GET /breeds?page=2

## Validaciones implementadas

- Status code 200
- Campos obligatorios en la respuesta
- Tipos de datos (string, number, array)
- Tiempo de respuesta < 2 segundos
- Validación de longitud máxima (max_length)
- Paginación correcta
- Estructura del array de breeds

## Variables utilizadas

- `baseUrl`: URL base de la API
- `maxLength`: longitud máxima para filtrar facts

## Mejoras si tuviera más tiempo

- Integración con Newman para ejecución por CLI
- Reporte HTML automatizado con newman-reporter-htmlextra
- Integración con GitHub Actions para CI/CD
- Tests negativos (parámetros inválidos, edge cases)
- Data-driven testing con archivo CSV

## Tiempo invertido

Aproximadamente X horas
