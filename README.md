# Prueba Técnica - QA Automation Engineer

Repositorio con la solución a la prueba técnica para el rol de QA Automation Engineer. Incluye dos ejercicios: pruebas automatizadas de API con Postman sobre la API pública CatFact.ninja, y automatización web E2E con Playwright sobre el sitio EstraITegiaS.

## Autor

Mateo Enriquez

## Estructura del repositorio

```text
.
├── postman/
│   ├── collection.json       # Colección exportada de Postman
│   ├── reporte.png           # Captura de la ejecución del Collection Runner
│   └── README.md             # Documentación específica del ejercicio de API
├── playwright/
│   ├── tests/
│   │   └── contacto.spec.js  # Test E2E de navegación a Contacto
│   ├── playwright.config.js  # Configuración de Playwright
│   ├── package.json          # Dependencias del proyecto
│   ├── .gitignore
│   └── README.md             # Documentación específica del ejercicio web
└── README.md                 # Este archivo
```

## Ejercicios incluidos

### 1. Pruebas de API con Postman

Colección de Postman con 4 requests automatizados sobre la API pública CatFact.ninja, incluyendo validaciones de status code, tipos de datos, formatos, tiempos de respuesta y estructura de paginación.

**Endpoints probados:**

- `GET /fact` - Obtener un fact aleatorio sobre gatos
- `GET /fact?max_length=50` - Fact con longitud máxima configurable
- `GET /breeds` - Listado de razas de gatos
- `GET /breeds?page=2` - Paginación del listado de razas

**Ver detalles completos en:** [`postman/README.md`](./postman/README.md)

### 2. Automatización web con Playwright

Test end-to-end que valida la navegación al apartado de Contacto en el sitio https://www.estraitegias.com, verificando que el scroll funciona correctamente y que el email de contacto está visible en la sección destino.

**Validaciones implementadas:**

- Carga correcta de la página principal
- Click en el enlace "Contacto"
- Navegación (scroll) hacia la sección `#tab-contact`
- Visibilidad del email `Info@EstraITegiaS.com` dentro de la sección
- Manejo de errores ante elementos no encontrados

**Ver detalles completos en:** [`playwright/README.md`](./playwright/README.md)

## Tecnologías utilizadas

| Herramienta | Versión | Propósito |
|-------------|---------|-----------|
| Postman | 11.x | Cliente y runner de pruebas de API |
| JavaScript (Chai BDD) | - | Sintaxis de aserciones en tests de Postman |
| Playwright | 1.x | Framework de automatización web E2E |
| Node.js | 18+ | Runtime para ejecutar Playwright |
| Git / GitHub | - | Control de versiones y entrega |

## Cómo ejecutar los ejercicios

### Ejercicio 1: Postman

1. Abrir Postman (versión de escritorio recomendada).
2. Click en `Import` y seleccionar el archivo `postman/collection.json`.
3. Una vez importada, abrir el `Collection Runner`.
4. Seleccionar todos los requests y hacer click en `Run`.
5. Revisar el resumen de tests pasados.

### Ejercicio 2: Playwright

```bash
cd playwright
npm install
npx playwright install chromium
npx playwright test
```

Para ver el navegador durante la ejecución:

```bash
npx playwright test --headed
```

Para ver el reporte HTML después de la ejecución:

```bash
npx playwright show-report
```

## Decisiones técnicas

Algunas decisiones de diseño tomadas durante el desarrollo:

**En Postman:**

- Uso de variables de colección (`baseUrl` y `maxLength`) para centralizar configuración y permitir cambios rápidos sin tocar cada request.
- Validaciones de consistencia interna (por ejemplo, verificar que el campo `length` realmente coincide con la longitud del string `fact`), no solo de existencia de campos.
- Uso de `forEach` en validaciones de arrays para garantizar que cada elemento del array cumple con el contrato esperado, no solo el primero.

**En Playwright:**

- Uso de locators encadenados (`seccionContacto.locator(...)`) para hacer scoping preciso y evitar colisiones de selectores. La página tiene el email en dos lugares (header y contacto), por lo que validamos específicamente el del apartado correcto.
- Configuración de screenshots y videos automáticos solo en fallos para tener evidencia sin generar archivos innecesarios en ejecuciones exitosas.
- Uso de `waitUntil: 'domcontentloaded'` en lugar de `networkidle` para evitar timeouts en páginas con trackers o sockets activos.

## Criterios de evaluación cubiertos

| Criterio | Implementación |
|----------|----------------|
| Tests de API correctos | 4 requests con validaciones completas |
| Uso de variables | `baseUrl` y `maxLength` como variables de colección |
| Validaciones completas | Status, tipos, formatos, tiempos, longitudes, consistencia |
| Organización | Estructura clara por carpetas, READMEs específicos |
| Documentación | README raíz + README por ejercicio |
| Git | Commits descriptivos por funcionalidad |
| Bonus opcional | Automatización web con Playwright incluida |

## Tiempo total invertido

Aproximadamente entre 5 y 6 horas distribuidas en:

- Exploración de la API y diseño de tests: 1 hora
- Implementación y ejecución en Postman: 1.5 horas
- Documentación del ejercicio de Postman: 30 minutos
- Setup e implementación de Playwright: 2 horas
- Documentación final y organización del repo: 1 hora

## Contacto

Para cualquier duda sobre la implementación, contactar a través del usuario de GitHub.
