var relatedProducts = [];
var link = {};

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `
    }
}

function obtenerEstrella(puntaje) {
    let estrella = "";
    for (let i = 0; i < puntaje; i++) {
        estrella += `<span class="fa fa-star checked"></span>`
    }
    return estrella;
}

function showCommentsList(array) {

    let htmlComments = "";
    for (let i = 0; i < array.length; i++) {
        let comment = array[i];

        htmlComments += `
                <div class="row">
                    <div class="list-group-item list-group-item-action">
                    <div class="text-center p-2">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ comment.user + `</h4>
                            <small class="text-muted">` + comment.dateTime + `</small>
                        </div>
                        <p class="mb-1">` + comment.description + `</p>

                        <div class="row text-center text-lg-left p-2">
                        <p id="commentScore">` + comment.score + " " + `
                        <div class="stars-outer"> ` + obtenerEstrella(comment.score) + ` </div>
                        </p>

                        </div>
                        </div>
                    </div>
                </div>
            
            `
    }
    document.getElementById("comments").innerHTML = htmlComments;
}

function getQueryVariable(informacion) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == informacion) {
            return pair[1];
        }
    }
    return false;
}

let nombre = getQueryVariable('products');
let name = decodeURIComponent(nombre);

function getGET() {

    var loc = document.location.href;
    if (loc.indexOf('?') > 0) {

        var getString = loc.split('?')[1];
        var GET = getString.split('&');
        var get = {};

        for (var i = 0, l = GET.length; i < l; i++) {
            var tmp = GET[i].split('=');
            get[tmp[0]] = unescape(decodeURI(tmp[l]));
        }
        return get;
    }
}

window.onload = function () {
    var valores = getGET();
    if (valores) {
        var nombre = valores['Nombre'];
    }
    let productNameHTML = document.getElementById("infoname");
    productNameHTML.innerHTML = nombre;
}

function showProducts(arrayproducts) {

    let htmlProducts = "";
    for (let i = 0; i < relatedProducts.length; i++) {
        let comment = relatedProducts[i];
        let link = arrayproducts[comment];

        htmlProducts += `
        <div class="col-sm-3">
             <div class="card" style="height: 100%; border: solid;">
            <a href="product-info.html?Nombre=` + link.name + ` class="card-text">
                <img class="bd-placeholder-img card-img-top" src="` + link.imgSrc + `"style="width:85%">
                <h3 class="m-3">` + link.name + `</h3>
                <div class="card-body">
                    <p class="card-text">` + link.description + `</p>
                    <dt class="card-text">`+ link.currency + link.cost + `</dt>
                </div>
            </div>
        </div>
            </a>
             
            `
    }
    document.getElementById("cat-list2").innerHTML = htmlProducts;
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (informacion) {
        if (informacion.status === "ok") {
            category = informacion.data;

            let infoName = document.getElementById("infoname");
            let infoDescripcion = document.getElementById("infodescipcion");
            let infoSoldCout = document.getElementById("infosold");
            let infoCosto = document.getElementById("infocosto");

            infoName.innerHTML = category.name;
            infoDescripcion.innerHTML = category.description;
            infoSoldCout.innerHTML = category.soldCount;
            infoCosto.innerHTML = category.currency + " " + category.cost;

            showImagesGallery(category.images)
            relatedProducts = category.relatedProducts;
        }
        getJSONData(PRODUCTS_URL).then(function (producto) {
            if (producto.status === "ok") {
                link = producto.data;
                showProducts(link);
            }
        });
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (informacion) {
        if (informacion.status == "ok") {
            showCommentsList(informacion.data);
        }
    });
});





