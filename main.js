let cartIcon = document.querySelector("#cart-icon");
let carrito = document.querySelector(".carrito");
let cerrarCarrito = document.querySelector("#cerrar-carrito");

// Abrir y Cerrar Carrito
cartIcon.onclick = () => {
    carrito.classList.add("active");
};
cerrarCarrito.onclick = () => {
    carrito.classList.remove("active");
};

// Carrito funcional
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// Haciéndolo funcional
function ready() {
    var removeCartButtons = document.getElementsByClassName('eliminar-carrito');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    // Cambios de cantidad
    var cantidadIntroducida = document.getElementsByClassName("cantidad-carrito");
    for (var i = 0; i < cantidadIntroducida.length; i++) {
        var introducir = cantidadIntroducida[i];
        introducir.addEventListener("change", cantidadModificada);
    }
    // Añadir al Carrito
    var añadir = document.getElementsByClassName("add-cart-icon");
    for (var i = 0; i < añadir.length; i++) {
        var boton = añadir[i];
        boton.addEventListener("click", añadircarritoClicked);
    }
    // Boton de compra Funcional
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", botondecompra)
}

function botondecompra(){
    alert("Su Pedido se Realizó");
    var contenidocarrito = document.getElementsByClassName("contenido-carrito")[0];
    while (contenidocarrito.hasChildNodes()){
        contenidocarrito.removeChild(contenidocarrito.firstChild);
    }
    actualizarTotal();
}

// Añadir al Carrito 
function añadircarritoClicked(event) {
    var boton = event.target;
    var productos = boton.parentElement;
    var titulo = productos.getElementsByClassName("titulo-producto")[0].innerText;
    var precio = productos.getElementsByClassName("price")[0].innerText;
    var imagenproducto = productos.getElementsByClassName("imagen-del-producto")[0];
    if (imagenproducto) {
        var srcImagen = imagenproducto.src;
        añadirProductoAcarrito(titulo, precio, srcImagen);
    }
    añadirProductoAcarrito(titulo, precio, srcImagen);
    actualizarTotal();
}

function añadirProductoAcarrito(titulo, precio, imagenproducto) {
    var carritoBox = document.createElement("div");
    carritoBox.classList.add("cart-box");

    var carritoItems = document.getElementsByClassName("contenido-carrito")[0];

    var NombrescarritoItems = carritoItems.getElementsByClassName("carrito-titulo-producto");
    for (var i = 0; i < NombrescarritoItems.length; i++) {
        if (NombrescarritoItems[i].innerText == titulo) {
            alert("¡Ya añadiste este producto!");
            return;
        }
    }
    var ContenidoboxCarrito = `
                        <img src="${imagenproducto}" alt="" class="carrito-imagen">
                        <div class="detalles-box">
                            <div class="carrito-titulo-producto">${titulo}</div>
                            <div class="carrito-precio">${precio}</div>
                            <input type="number" value="1" class="cantidad-carrito">
                        </div>
                        <!-- Eliminar -->
                        <i class='bx bx-trash eliminar-carrito'></i> ` ;
    carritoBox.innerHTML = ContenidoboxCarrito;
    carritoItems.append(carritoBox);

    carritoBox
        .getElementsByClassName("eliminar-carrito")[0]
        .addEventListener("click", removeCartItem);
    carritoBox
        .getElementsByClassName("cantidad-carrito")[0]
        .addEventListener("change", cantidadModificada);
}
document.addEventListener('DOMContentLoaded', function () {
    var botonesAñadirCarrito = document.getElementsByClassName("add-cart-icon");
    for (var i = 0; i < botonesAñadirCarrito.length; i++) {
        botonesAñadirCarrito[i].addEventListener('click', añadircarritoClicked);
    }
});

function cantidadModificada(event) {
    var ingresar = event.target;
    if (isNaN(ingresar.value) || ingresar.value <= 0) {
        ingresar.value = 1;
    }
    actualizarTotal();
}

// Actualizar el total
function actualizarTotal() {
    var contenidocarrito = document.getElementsByClassName("contenido-carrito")[0];
    var cartBoxes = contenidocarrito.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var preciodelElemento = cartBox.getElementsByClassName("carrito-precio")[0];
        var cantidaddelElemento = cartBox.getElementsByClassName("cantidad-carrito")[0];
        var precio = parseFloat(preciodelElemento.innerText.replace("₡", ""));
        var cantidad = cantidaddelElemento.value;
        total = total + precio * cantidad;
    }
    document.getElementsByClassName("precio-total")[0].innerText = "₡" + total;
}

// Eliminar
function removeCartItem(event) {
    var buttonCliked = event.target;
    buttonCliked.parentElement.remove();
    actualizarTotal();
}