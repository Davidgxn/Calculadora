// Declaro las bariables que voy a necesitar dentro de la calculadora.
// La variable de botones es un array de html que contiene todos los botones de la calculadora.
// La variable output es el h2 que cuando se ejecuta la calculadora tiene un 0 y a medida que se van añadiendo numeros van saliendo en este output.
const botones = document.getElementsByClassName("calculadora_boton")
const output = document.getElementById("output");

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
                break;
            case "borrar":
                // Cuando se pulsa el boton de borrar va eliminando el ultimo numero del output, y cuando no hay ningun numero en el output pone un 0 para que no se quede vacio el string.
                output.innerHTML = output.innerHTML.slice(0, -1);
                if (output.innerHTML == "") {
                    output.innerHTML = "0";
                }
                break;
            // Los botones de dividir, multiplicar, sumar y restar hacen practicamente lo mismo que es llamar a la funcion comprobarPosible pasando por parametros el signo que tienen que comprobar. En el caso de que se pueda poner lo ponen y en el de que no se pueda poner no se pone.
            case "dividir":
                comprobarPosible("/");
                break;
            case "multiplicar":
                // Signo de multiplicacion en unicode de HTML &#215;
                comprobarPosible("&#215;");
                break;
            case "sumar":
                comprobarPosible("+");
                break;
            case "restar":
                comprobarPosible("-");
                break;
            case "resultado":
                calcularResultado();
                break;
        }
    });
}
function comprobarPosible(signo) {
    // Lo que hace esta funcion es comprobar si se puede poner el signo en el output
    if (signo === "-") {
        // Si se quiere poner el signo de menos lo que hace la funcion es comprobar si el ultimo caracter del output es un signo de suma o de resta, en el caso de que sea uno de estos lo sustituye por el signo negativo.
        if (output.innerHTML[output.innerHTML.length - 1] === "-" || output.innerHTML[output.innerHTML.length - 1] === "+") {
            output.innerHTML = output.innerHTML.slice(0, -1);
            output.innerHTML += signo;
        } else {
            // En el caso de que no sea ninguno de estos puede poner el signo de restar.
            output.innerHTML += signo;
        }
    } else {
        // Cuando el signo no sea un signo de restar lo que hace es comprobar si el signo anterior es otro signo, que no sea el de restar, en caso de que sea otro signo que no sea el de restar lo sustituye por el signo que queremos poner.
        if (output.innerHTML[output.innerHTML.length - 1] === "+" || output.innerHTML[output.innerHTML.length - 1] === "×" || output.innerHTML[output.innerHTML.length - 1] === "/") {
            output.innerHTML = output.innerHTML.slice(0, -1);
            output.innerHTML += signo;
        } else if (output.innerHTML[output.innerHTML.length - 1] === "-") {
            // Aqui ya sabemos que el ultimo caracter del output o no es ningun signo o es un signo de restar, en este caso comprobamos si es el de restar, y en caso de que sea comprobamos si el signo anterior al de restar es un signo de suma, multiplicacion o division, en este caso cambiamos los dos signos por el que queriamos.
            if (output.innerHTML[output.innerHTML.length - 2] === "+" || output.innerHTML[output.innerHTML.length - 2] === "×" || output.innerHTML[output.innerHTML.length - 2] === "/") {
                output.innerHTML = output.innerHTML.slice(0, -2);
                output.innerHTML += signo;
            } else {
                // En el caso que el ultimo signo solo sea un signo de restar lo que hace es cambiar este signo por el que queremos poner.
                output.innerHTML = output.innerHTML.slice(0, -1);
                output.innerHTML += signo;
            }
        } else {
            // En el caso de que no sea ningun signo lo que hace es añadirlo al final.
            output.innerHTML += signo;
        }
    }
}

function calcularResultado() {
    // Lo que hace esta funcion es separar la cadena en funcion de los elementos que la compongan para despues operar con ellos por separado y poder imprimir el resultado en el output.
    let operacion = output.innerHTML;
    let operandos;
    let resultado;
    if (operacion.includes("+")) {
        // En el caso de que el output tenga un signo de suma divide la cadena por este signo para que luego sume todos los elementos por separado y despues lo muetra por el output.
        operandos = operacion.split("+");
        resultado = 0;
        for (let i = 0; i<operandos.length; i++) {
            resultado += parseInt(operandos[i]);
        }
        console.log(resultado);
        output.innerHTML = resultado;
    } else if (operacion.includes("-")) {
        // En este caso hace lo mismo que antes pero dividiendo la cadena por el signo de restar y en vez de sumar los elementos, los resta.
        operandos = operacion.split("-");
        resultado = operandos[0];
        for (let i = 1; i<operandos.length; i++) {
            resultado -= parseInt(operandos[i]);
        }
        console.log(resultado);
        output.innerHTML = resultado;
    } else if (operacion.includes("×")) {
        // Otra vez lo mismo pero en este caso multiplicandom
        operandos = operacion.split("×");
        resultado = 1;
        for (let i = 0; i<operandos.length; i++) {
            resultado *= parseInt(operandos[i]);
        }
        console.log(resultado);
        output.innerHTML = resultado;
    } else if (operacion.includes("/")) {
        // En este caso hace lo mismo pero dividiendo.
        operandos = operacion.split("/");
        resultado = operandos[0];
        for (let i = 1; i<operandos.length; i++) {
            resultado /= parseInt(operandos[i]);
        }
        console.log(resultado);
        output.innerHTML = resultado;
    }
}