// ****** VARIABLES ***********

//evenlistener al clickear en botón Resumen
let ticketsResumen = document.querySelector("#ticketsResumen");
ticketsResumen.addEventListener("click", ticketsPrecio);

//evenlistener al clickear en botón Borrar
let ticketsBorrar = document.querySelector("#ticketsBorrar");
ticketsBorrar.addEventListener("click", borrarOutput);

//evenlistener al clickear en botón Cantidad
let ticketsCantidad = document.querySelector(".tickets-Cantidad");
ticketsCantidad.addEventListener("click", clearInput);

//evenlistener al clickear en botón Categoria
let ticketsCategoria = document.querySelector(".tickets-elegir-categoria");
ticketsCategoria.addEventListener("click", descuento);

//eventlistener al clickear en los div estudiante/trainee/junior
let descuentoEstudiante = document.querySelector(".estudiante");
descuentoEstudiante.addEventListener("click", updateCategory);
let descuentoTrainee = document.querySelector(".trainee");
descuentoTrainee.addEventListener("click", updateCategory);
let descuentoJunior = document.querySelector(".junior");
descuentoJunior.addEventListener("click", updateCategory);


// ******* FUNCION PARA CALCULAR LOS PRECIOS DE TICKETS *****************
function ticketsPrecio(evento) {
    //Usamos preventDefault() para que no se refresque el formulario
    evento.preventDefault(); 

    //leemos el valor ignresado en el input cantidad
    let ticketsCantidad = document.querySelector(".tickets-Cantidad");

    // Para que sea un numero valido (Al ser cantidad debe ser un numero entero) ingresa en el primer if
    if (Number(ticketsCantidad.value)) {
        let ticketsCategoria = document.querySelector(".tickets-elegir-categoria"); // variable que guarda la categoria
        let totalPagar; // Variable acumulador

        // Condicional switch para determinar segun la categoria del ticket hacer diferente caso de uso
        switch (ticketsCategoria.value) {
            case "estudiante": {
                totalPagar = 200 * ticketsCantidad.value * 0.2;
                break;
            }
            case "trainee": {
                totalPagar = 200 * ticketsCantidad.value * 0.5;
                break;
            }
            case "junior": {
                totalPagar = 200 * ticketsCantidad.value * 0.85;
                break;
            }
        }
        // totalPagar ya posee el valor segun el caso para mostrar en pantalla 

        // Traemos el objeto .tickets-salida y mostramos en pantalla totalPagar
        document.querySelector(".tickets-salida").textContent = `Total a pagar: $${totalPagar}`;

        //Agregamos la siguiente linea como recomendacion, como un pseudo enunciado
        // donde al tener el precio a gastar en los tickets, tengamos la opcion de "comprar"
        // como tal le agregamos un icono desde font awesome a la leyenda "comprar" y enviar formulario
        
        let salida = document.querySelector(".tickets-salida"); // guardamos el valor de .tickets-salida
        let span = document.createElement("span"); // Agregamos el text del span
        span.className = 'ticketsComprar';  
        let textNode = document.createTextNode("Comprar "); // Texto a mostrar en pagina
        span.append(textNode);  // El texto ingrese en la etiqueta span
        salida.append(span); // span que ingrese en el elemento de salida
       

        //eventlistener para detectar click en el span ticketsComprar
        let ticketsComprar = document.querySelector(".ticketsComprar");
        ticketsComprar.addEventListener("click", ticketsSubmit);

    } else {
        // Ingresa al else en caso de no ingresar un numero válido (false)
        document.querySelector(".tickets-Cantidad").style.border = "2px solid red"; // Marca en rojo el borde de la casilla de Cantidad de tickets para que ayude al usuario detectar el error en la pagina 
        ticketsCantidad.value = ""; // Borra el contenido ingresado en la casilla de Cantidad de tickets
        ticketsCantidad.placeholder = "Ingrese un numero valido"; // Saldra este texto a modo leyenda en la casilla de cantidad de  tickets
        alert("Ingrese un número válido! ");    // Alerta en la pagina para que el usuario de aceptar y continue con la transaccion
    }

}



// ******* FUNCION BORRAR OUTPUT PERMITE BORRAR EL FORMULARIO *****************
function borrarOutput() {

    document.querySelector(".tickets-salida").textContent = "Total a pagar:" // Guardamos el contenido del elemento

    let form = document.querySelector(".tickets-Formulario");
    for (i = 0; i < 4; i++) {
        document.querySelector("." + form[i].className).style.border = "1px solid grey"; // Deja en default las casillas
    }
}

// ******* FUNCION ACTUALIZAR LA CATEGORIA *****************
function updateCategory(evento) {
    
    let categoria = evento.target.parentNode.className; // Traemos el evento segun la categoria ingresado x el usuario

    // Condicional switch, que ingresa segun el caso del boton que ingresamos
    switch (categoria) {
        case "estudiante": {
            console.log("es estudiante");
            document.querySelector(".tickets-elegir-categoria").options.selectedIndex = 0;
            document.querySelector(".estudiante").style.backgroundColor = "#9DF3ED"; // Cambiamos el color al marcar la categoria elegida
            document.querySelector(".trainee").style.backgroundColor = "transparent";// Lo dejamos en transparente las categorias restantes
            document.querySelector(".junior").style.backgroundColor = "transparent"; // Lo dejamos en transparente las categorias restantes
            break;
        }
        case "trainee": {
            console.log("es trainee");
            document.querySelector(".tickets-elegir-categoria").options.selectedIndex = 1;
            document.querySelector(".estudiante").style.backgroundColor = "transparent";// Lo dejamos en transparente las categorias restantes
            document.querySelector(".trainee").style.backgroundColor = "#9DF3ED";   // Cambiamos el color al marcar la categoria elegida
            document.querySelector(".junior").style.backgroundColor = "transparent";    // Lo dejamos en transparente las categorias restantes
            break;
        }
        case "junior": {
            console.log("es junior");
            document.querySelector(".tickets-elegir-categoria").options.selectedIndex = 2;
            document.querySelector(".estudiante").style.backgroundColor = "transparent";// Lo dejamos en transparente las categorias restantes
            document.querySelector(".trainee").style.backgroundColor = "transparent";// Lo dejamos en transparente las categorias restantes
            document.querySelector(".junior").style.backgroundColor = "#9DF3ED";    // Cambiamos el color al marcar la categoria elegida
            break;
        }
    }
    
}
    
// ******* FUNCION TICKET SUBMIT para validar los datos de la persona que compra los tickets *****************

function ticketsSubmit() {
    // Traemos el objeto del formulario de cada input
    let form = document.querySelector(".tickets-Formulario");

    inputCheck(form); // variable para chequear los input del formulario

    function inputCheck(form) { // la funcion recibe como argumento el formulario
        let arrayCheck = [];    // Declaramos un array vacio

        // Realizamos un for de 0 a 3 elementos por cada input del formulario
        for (i = 0; i < 3; i++) { // 0: nombre - 1: apellido - 2: email

            arrayCheck[i] = form[i].value;  // Agregamos en el array el elemento del indice "i"

            if (form[i].value == "") {      // Condicional que verifica si esta vacio o no
                document.querySelector("." + form[i].className).style.border = "2px solid red"; // 
            } else {
                document.querySelector("." + form[i].className).style.border = "1px solid blue";
            }
        }

        // Condicional que verifica que no esta vacio, y que el campo mail posea un @ y un "." luego del dominio
        if (arrayCheck.every(element => element != "")) {
            if (form[2].value.includes('@') && form[2].value.includes('.')) { // Elemento 2 del array que contiene el mail
                // Al ser verdadero (Se lleno el formulario correctamente)
                alert("Formulario enviado");    // Muestra alerta en la pagina que se envia el formulario
                form.submit();                  // Se procede a enviarlo
                document.querySelector("." + form[2].className).style.border = "1px solid red";
            } else {
                // En caso que el mail no sea valido
                alert("Debe ingresar un correo válido"); // Se genera una alerta
                document.querySelector("." + form[2].className).style.border = "2px solid red" // Se marca en rojo el error en la casilla correspondiente
            }
        } else {
            alert("Completar los campos en rojo"); // Marca todos los campos en rojo
        }

    }
}

// ******* FUNCION QUE NOS PERMITE DEJAR LA CASILLA VACIA LUEGO DEL ERROR A MODO DE AYUDA PARA EL USUARIO *****************
function clearInput(evento) {
  
    document.querySelector("." + evento.target.className).style.border = "1px solid grey";
}

// ******* FUNCION DESCUENTO *****************
function descuento(evento) {
     
    switch (evento.target.value) {
        case "estudiante": {
            document.querySelector(".estudiante").style.backgroundColor = "#9DF3ED";// Cambiamos el color al marcar la categoria elegida
            document.querySelector(".trainee").style.backgroundColor = "transparent";// Lo dejamos en transparente las categorias restantes
            document.querySelector(".junior").style.backgroundColor = "transparent";// Lo dejamos en transparente las categorias restantes
            break;
        }
        case "trainee": {
            document.querySelector(".estudiante").style.backgroundColor = "transparent";// Lo dejamos en transparente las categorias restantes
            document.querySelector(".trainee").style.backgroundColor = "#9DF3ED";// Cambiamos el color al marcar la categoria elegida
            document.querySelector(".junior").style.backgroundColor = "transparent";// Lo dejamos en transparente las categorias restantes
            break;
        }
        case "junior": {
            document.querySelector(".estudiante").style.backgroundColor = "transparent";// Lo dejamos en transparente las categorias restantes
            document.querySelector(".trainee").style.backgroundColor = "transparent";// Lo dejamos en transparente las categorias restantes
            document.querySelector(".junior").style.backgroundColor = "#9DF3ED";// Cambiamos el color al marcar la categoria elegida
            break;
        }
    }
}