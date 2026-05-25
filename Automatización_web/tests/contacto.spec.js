// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('EstraITegiaS - Navegacion a Contacto', () => {

  test.beforeEach(async ({ page }) => {
    // Captura errores de consola del navegador para debugging
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('Error en consola del navegador:', msg.text());
      }
    });

    // Captura errores de pagina no controlados
    page.on('pageerror', error => {
      console.log('Error de pagina:', error.message);
    });
  });

  test('Debe navegar a la seccion Contacto y mostrar el email', async ({ page }) => {
    // Paso 1: Abrir la pagina principal
    console.log('Navegando a la pagina principal...');
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Verificacion de que la pagina cargo correctamente
    await expect(page).toHaveTitle(/EstraITegiaS/i);
    console.log('Pagina cargada correctamente');

    // Paso 2: Localizar y hacer clic en el enlace "Contacto"
    console.log('Buscando el enlace de Contacto...');
    const enlaceContacto = page.locator('a[href="#tab-contact"]').first();

    // Esperamos a que sea visible antes de interactuar
    await expect(enlaceContacto).toBeVisible({ timeout: 10000 });
    await enlaceContacto.click();
    console.log('Click en Contacto realizado');

    // Paso 3: Verificar que la seccion #tab-contact existe y esta visible
    console.log('Verificando navegacion a la seccion de contacto...');
    const seccionContacto = page.locator('#tab-contact');
    await expect(seccionContacto).toBeVisible({ timeout: 10000 });

    // Verificamos que la seccion este en el viewport (scroll ocurrio)
    await seccionContacto.scrollIntoViewIfNeeded();
    const enViewport = await seccionContacto.isVisible();
    expect(enViewport).toBeTruthy();
    console.log('Seccion de contacto visible en pantalla');

    // Paso 4: Verificar que el email esta visible
    console.log('Verificando email de contacto...');
    const emailEsperado = 'Info@EstraITegiaS.com';

    // Buscamos el email en la seccion de contacto (no en el header)
    const emailEnContacto = seccionContacto.locator(
      `a[href*="mailto"]:has-text("${emailEsperado}")`
    );

    await expect(emailEnContacto).toBeVisible({ timeout: 10000 });
    const textoEmail = await emailEnContacto.textContent();
    expect(textoEmail?.trim()).toBe(emailEsperado);
    console.log('Email visible: ' + textoEmail);

    // Captura final como evidencia
    await page.screenshot({
      path: 'evidencia-contacto.png',
      fullPage: false,
    });
    console.log('Captura de evidencia guardada');
  });

  test('Manejo de errores: elemento no encontrado', async ({ page }) => {
    await page.goto('/');

    try {
      // Intentamos localizar un elemento que NO existe a proposito
      const elementoInexistente = page.locator('#elemento-que-no-existe');
      await expect(elementoInexistente).toBeVisible({ timeout: 3000 });
    } catch (error) {
      // Verificacion de tipo: error es 'unknown' por defecto en TypeScript
      // Hay que validar que sea una instancia de Error antes de usar sus propiedades
      if (error instanceof Error) {
        console.log('Error capturado correctamente:');
        console.log('   Tipo:', error.constructor.name);
        console.log('   Mensaje:', error.message.split('\n')[0]);
      } else {
        console.log('Error desconocido capturado:', String(error));
      }

      // Tomamos captura para inspeccion visual
      await page.screenshot({
        path: 'error-elemento-no-encontrado.png',
        fullPage: true,
      });

      console.log('Manejo de error funciono como se esperaba');
    }
  });
});