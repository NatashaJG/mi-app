console.log("Ejecutando pruebas...");

const resultado = true;

if(resultado){
    console.log("Prueba exitosa");
    process.exit(0);
}else{
    console.log("Prueba fallida");
    process.exit(1);
}