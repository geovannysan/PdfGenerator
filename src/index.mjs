import fs from 'fs/promises';
import puppeteer from 'puppeteer';
(async () => {
  try {
    // Cargar la plantilla HTML como cadena
    const htmlContent = await fs.readFile('src/template.html', 'utf8');

    // Datos dinámicos
    const data = {
      nombre: 'Juan Pérez',
      edad: '30',
      ciudad: 'Quito',
      email: 'juan.perez@example.com',
      telefono: '0987654321',
      ocupacion: 'Ingeniero',
      empresa: 'TechCorp',
    };

    // Reemplazar las variables dinámicas en la plantilla
    let finalHtml = htmlContent;
    for (const [key, value] of Object.entries(data)) {
      const regex = new RegExp(`{${key}}`, 'g'); // Crear un regex dinámico
      finalHtml = finalHtml.replace(regex, value);
    }

    console.log(finalHtml);
    

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(finalHtml, { waitUntil: 'load' });
    await page.pdf({ path: 'output/reporte.pdf', format: 'A4', printBackground: true });
    await browser.close();
    
    // Aquí podrías usar `finalHtml` para generar un PDF, guardarlo, etc.
  } catch (error) {
    console.error('Error:', error);
  }
})();
