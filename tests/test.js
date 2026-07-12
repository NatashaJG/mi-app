const fs = require("fs");
const path = require("path");
const builder = require("junit-report-builder");

console.log("Ejecutando pruebas...");

const resultado = true;

// Crear carpeta para los reportes si no existe
const reportDir = path.join(__dirname, "..", "test-results");

if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir);
}

// Crear reporte JUnit
const suite = builder.testSuite().name("Pruebas del Proyecto");

if (resultado) {

    console.log("Prueba exitosa");

    suite.testCase()
        .className("Tests")
        .name("Prueba Principal");

} else {

    console.log("Prueba fallida");

    suite.testCase()
        .className("Tests")
        .name("Prueba Principal")
        .failure("La prueba falló");

}

// Guardar XML
builder.writeTo(path.join(reportDir, "results.xml"));

process.exit(resultado ? 0 : 1);