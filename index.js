// Declaro las bariables que voy a necesitar dentro de la calculadora.
// La variable de botones es un array de html que contiene todos los botones de la calculadora.
// La variable output es el h2 que cuando se ejecuta la calculadora tiene un 0 y a medida que se van añadiendo numeros van saliendo en este output.
const botones = document.getElementsByClassName("calculadora_boton")
const output = document.getElementById("output");
const operandoOutput = document.getElementById("operando");
const operacionOutput = document.getElementById("operacion");
let operando1, operacion;

// Con un bucle for recorro todos los botones del array de botones y luego les añado un event listener para que cuando pulses sobre un boton ejecute la funcion.
for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", (event) => {
        switch (event.target.id) {
            // Uso el switch para identificar que boton ha pulsado el usuario y dependiendo de que boton haya pulsado y dependiendo de que boton se haya pulsado se hace una cosa y otra.
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                // En el caso de que se pulse un numero lo añade a la string del output, y en el caso de que solo haya un 0 en el output, que seria cuando no hay nada, quita primero el 0 y luego añade todo lo demas
                if (output.innerHTML === "0") {
                    output.innerHTML = event.target.id;
                } else {
                    output.innerHTML += event.target.id;
                }
                break;
            case "reset":
                // En el caso de pulsar el boton con la "C" se borra todo lo que esta en el output de la calculadora.
                output.innerHTML = "0";
                operandoOutput.innerHTML = "";
                operacionOutput.innerHTML = "";
                operando1 = null;
                break;
            case "borrar":
                // Cuando se pulsa el boton de borrar va eliminando el ultimo numero del output, y cuando no hay ningun numero en el output pone un 0 para que no se quede vacio el string.
                output.innerHTML = output.innerHTML.slice(0, -1);
                if (output.innerHTML == "") {
                    output.innerHTML = "0";
                }
                break;
            case "sumar":
            case "restar":
            case "multiplicar":
            case "dividir":
            case "elevar":
                añadirOperando(event.target.id);
                break;
            case "resultado":
                calcularResultado();
                break;
            case "coma":
                if (!output.innerHTML.includes(".")) {
                    output.innerHTML += ".";
                }
                break;
        }
    });
}

function añadirOperando(tipoOperacion) {
    if (operando1 != null) {
        calcularResultado();
    }
    operando1 = parseFloat(output.innerHTML);
    operandoOutput.innerText = operando1;
    operacion = tipoOperacion;
    switch (tipoOperacion) {
        case "sumar":
            operacionOutput.innerHTML = "+";
            break;
        case "restar":
            operacionOutput.innerHTML = "-";
            break;
        case "multiplicar":
            operacionOutput.innerHTML = "&#215;";
            break;
        case "dividir":
            operacionOutput.innerHTML = "/";
            break;
        case "elevar":
            operacionOutput.innerHTML = "^"
            break;
    }
    output.innerHTML = "0";
}

function calcularResultado() {
    switch (operacion){
        case "sumar":
            output.innerText = operando1 + parseFloat(output.innerHTML);
            operandoOutput.innerHTML = "";
            operacionOutput.innerHTML = "";
            break;
        case "restar":
            output.innerText = operando1 - parseFloat(output.innerHTML);
            operandoOutput.innerHTML = "";
            operacionOutput.innerHTML = "";
            break;
        case "multiplicar":
            output.innerText = operando1 * parseFloat(output.innerHTML);
            operandoOutput.innerHTML = "";
            operacionOutput.innerHTML = "";
            break;
        case "dividir":
            output.innerText = operando1 / parseFloat(output.innerHTML);
            operandoOutput.innerHTML = "";
            operacionOutput.innerHTML = "";
            break;
        case "elevar":
            output.innerHTML = Math.pow(operando1, parseFloat(output.innerHTML));
            operandoOutput.innerHTML = "";
            operacionOutput.innerHTML = "";
            break;
    }
    operando1 = null;
    operacion = null;
}