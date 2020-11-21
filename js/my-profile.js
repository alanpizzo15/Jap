//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function guardarLocal() {
    document.getElementById("guardar").addEventListener("click", function (e) {

        let informacion = {

            Nombre: document.getElementById("pila").value,
            Apellidos: document.getElementById("apellido").value,
            Email: document.getElementById("correoe").value,
            Edad: document.getElementById("años").value,
            Numero: document.getElementById("numero").value
        }

        localStorage.setItem("click", JSON.stringify(informacion));
    })
    var informacion = JSON.parse(localStorage.getItem('click'));

    document.getElementById("nombre").innerHTML = informacion.Nombre;
    document.getElementById("apellidos").innerHTML = informacion.Apellidos;
    document.getElementById("email").innerHTML = informacion.Email;
    document.getElementById("edad").innerHTML = informacion.Edad;
    document.getElementById("celular").innerHTML = informacion.Numero;

};

function perfil() {
    var informacion = JSON.parse(localStorage.getItem('click'));

    document.getElementById("nombre").innerHTML = informacion.Nombre;
    document.getElementById("apellidos").innerHTML = informacion.Apellidos;
    document.getElementById("email").innerHTML = informacion.Email;
    document.getElementById("edad").innerHTML = informacion.Edad;
    document.getElementById("celular").innerHTML = informacion.Numero;

};


document.addEventListener("DOMContentLoaded", function (e) {
    guardarLocal();
    perfil();


});