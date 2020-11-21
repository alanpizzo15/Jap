function productoCarrito(array) {

    let htmlContenttoAppend = "";

    for (let i = 0; i < array.length; i++) {
        let articulos = array[i];
        var cambio = "";
        if (articulos.currency === "USD") {
            cambio = articulos.unitCost * 40;
        } else {
            cambio = articulos.unitCost;
        }

        htmlContenttoAppend += `
        <div class= "itemCarrito">
        <div class= "list-group-item list-group-item-action">
            <div class="row">
                <div class="col-2">
                    <img width="100%" src="` + articulos.src + `" alt=" ` + `" class=text-muted""> 
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                    <div class="nameDiv"><h4> ` + articulos.name + ` </h4> <br><h6>Cantidad: 
                    <input id="input` + i + `" type= "number" min="1" max="10" style="width: 18%">
                    </h6><br> 
                    <h6>Precio por Unidad: $` + cambio + ` </h6> </div>
                    <div id="total"><strong> SubTotal: <div id="resultado` + i + `">$0</div></strong></div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        
        
        `
    }
    document.getElementById("carrito").innerHTML = htmlContenttoAppend;
}

function totalCarrito(articulos) {

    let sumatoria = 0;

    for (let i = 0; i < articulos.length; i++) {
        var input = document.querySelector("#input" + i);

        const subtotal = document.getElementById("sumaTotal");

        input.addEventListener("change", (e) => {

            total = 0

            for (let i = 0; i < articulos.length; i++) {
                const id = document.getElementById("resultado" + i);
                let moneda = articulos[i];
                let variable = articulos[i].unitCost;
                let valor = document.getElementById("input" + i).value
                if (moneda.currency === "USD") {
                    sumatoria = (valor) * (variable) * 40;
                    id.innerHTML = "$" + sumatoria;
                    total += parseInt((valor) * (variable) * 40);
                } if (moneda.currency === "UYU") {
                    sumatoria = (valor) * (variable);
                    id.innerHTML = "$" + sumatoria;
                    total += parseInt((valor) * (variable));
                }
            }
            subtotal.innerHTML = "$" + total;
        })
    }
};

function porcentaje() {
    const porcentaje = document.getElementById("porcentaje");
    const totaltotal = document.getElementById("totaltotal");
    let mostrar = 0;
    document.addEventListener("click", function () {
        if (document.getElementById("cinco").checked) {
            mostrar = total * 0.05;
        } if (document.getElementById("siete").checked) {
            mostrar = total * 0.07;
        } if (document.getElementById("quince").checked) {
            mostrar = total * 0.15;
        }
        porcentaje.innerHTML = "$" + mostrar;
        totaltotal.innerHTML = "$" + (mostrar + total);
    })

}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_DESAFIATE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            let product = resultObj.data;

            productoCarrito(product.articles);
            totalCarrito(product.articles);
            porcentaje();
        }
    })
});


