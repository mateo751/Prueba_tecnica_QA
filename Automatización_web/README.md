# Automatización Web - EstraITegiaS

Test E2E que valida la navegación a la sección de contacto
en https://www.estraitegias.com y verifica la visibilidad
del email de contacto.

## Herramienta elegida: Playwright

Elegí Playwright por las siguientes razones técnicas:

- **Auto-waiting integrado**: espera automáticamente a que los
  elementos sean visibles, estables y clickeables antes de
  interactuar, eliminando la necesidad de waits manuales.
- **Selectores potentes**: soporta CSS, XPath, texto, roles ARIA
  y selectores propios como `:has-text()`.
- **Velocidad**: ejecución más rápida que Selenium gracias a su
  arquitectura basada en CDP (Chrome DevTools Protocol).
- **Debugging excelente**: trace viewer, screenshots automáticos
  en fallos, videos de la ejecución.
- **Multi-navegador**: Chromium, Firefox y WebKit con la misma API.

## Requisitos previos

- Node.js 18 o superior
- npm

## Instalación

```bash
cd playwright
npm install
npx playwright install chromium
```

## Ejecución

Ejecutar todos los tests (modo headless):

```bash
npx playwright test
```

Ejecutar con navegador visible:

```bash
npx playwright test --headed
```

Ejecutar en modo debug (paso a paso):

```bash
npx playwright test --debug
```

Ver el reporte HTML:

```bash
npx playwright show-report
```

## Validaciones implementadas

1. La página carga correctamente (título contiene "EstraITegiaS")
2. El enlace "Contacto" es visible y clickeable
3. Al hacer click, la sección `#tab-contact` se vuelve visible
4. El scroll ocurre hacia la sección esperada
5. El email `Info@EstraITegiaS.com` está visible dentro de
   la sección de contacto
6. El texto del email coincide exactamente con el esperado

## Manejo de errores

El test implementa varias estrategias de manejo de errores:

- **Listeners de consola**: captura errores JavaScript del
  navegador para diagnóstico.
- **Listener de pageerror**: detecta errores no controlados
  en la página.
- **Timeouts explícitos**: cada `expect().toBeVisible()` tiene
  un timeout que falla con un mensaje claro si el elemento no
  aparece.
- **Screenshots automáticos**: configurado en
  `playwright.config.js` para capturar pantalla solo en caso
  de fallo.
- **Videos de fallo**: graba la ejecución completa cuando un
  test falla.
- **Trace viewer**: con `trace: 'on-first-retry'` se puede
  inspeccionar paso a paso qué ocurrió.

### ¿Qué pasa si el elemento no aparece?

Playwright esperará durante el tiempo configurado en el timeout
(10 segundos en este caso). Si el elemento no aparece, lanza
una excepción `TimeoutError` con detalles sobre qué selector
falló. Esto detiene el test y genera automáticamente un
screenshot y un video del estado en el momento del fallo.

### ¿Cómo depurar el problema?

1. Ejecutar con `--debug` para pausar antes de cada acción.
2. Ejecutar con `--headed` para ver el navegador en tiempo real.
3. Revisar el `trace.zip` generado con `npx playwright show-trace`.
4. Revisar screenshots y videos en `test-results/`.
5. Usar `await page.pause()` dentro del test para inspección
   manual con DevTools.
6. Usar el codegen para generar selectores:
   `npx playwright codegen https://www.estraitegias.com`.

### ¿Cómo documentar el problema?

- Capturar el screenshot del momento del fallo.
- Guardar el HTML del DOM en ese instante.
- Registrar la versión de Playwright y el navegador usado.
- Anotar el selector que falló y por qué se eligió.
- Verificar si el cambio fue intencional (refactor del frontend)
  o un bug.

## Documentación consultada

- [Playwright Docs - Locators](https://playwright.dev/docs/locators)
- [Playwright Docs - Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Docs - Auto-waiting](https://playwright.dev/docs/actionability)
- [Playwright Docs - Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright Docs - Debugging](https://playwright.dev/docs/debug)

## Dificultades encontradas

- La página tiene dos elementos con el email (uno en el header
  y otro en la sección de contacto). Tuve que usar un selector
  más específico que buscara el email **dentro** de
  `#tab-contact` para evitar falsos positivos.
- El scroll suave de la página requería esperar a que la
  animación terminara antes de validar visibilidad. Playwright
  lo maneja automáticamente con `toBeVisible()`.

## Qué aprendí

- El sistema de auto-waiting de Playwright simplifica
  enormemente el código en comparación con waits explícitos
  de Selenium.
- Los locators encadenados (`seccion.locator('a[href*="mailto"]')`)
  permiten scoping preciso evitando colisiones de selectores.
- El trace viewer es una herramienta diferencial frente a otros
  frameworks: muestra timeline, DOM snapshots, network y consola.
- La diferencia entre `page.locator()` (lazy) y
  `page.$()` (eager) y por qué los locators son la opción
  recomendada actualmente.

## Qué mejoraría con más tiempo

- Implementar **Page Object Model** para separar selectores
  de la lógica de testing.
- Agregar **tests cross-browser** ejecutando en Firefox y WebKit
  además de Chromium.
- Configurar **GitHub Actions** para ejecución automatizada
  en cada push.
- Agregar **tests de accesibilidad** con
  `@axe-core/playwright`.
- Implementar **fixtures personalizados** para reusar setup.
- Agregar **tests de regresión visual** con
  `expect(page).toHaveScreenshot()`.
- Parametrizar URLs y datos esperados en variables de entorno.

## Tiempo invertido

Aproximadamente 2 horas (instalación, exploración del sitio,
escritura de tests, documentación).
