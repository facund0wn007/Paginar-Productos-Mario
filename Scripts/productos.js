// Función para cargar los productos desde un archivo JSON
const cargarProductosDesdeBD = async () => {
    try {
        const response = await fetch('data.json');
        const data = await response.json();   
        
        listaProductos = data.productos;
        listaCategorias = data.categoria;
        productosFiltrados = listaProductos;
       
        // Después de cargar los productos, mostrarlos en la página
        cargarProductos(listaProductos);
        CargarCategorias(listaCategorias)
  
    } catch (error) {
        // Manejo de errores en caso de problemas al cargar los productos
        Swal.fire({
            title: "Upss tenemos un problema",
            text: 'Ocurrió un error en el servidor. Por favor intenta más tarde',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
};
cargarProductosDesdeBD();

//variables para cargar los productos y tener el carrito pe
let listaProductos=[]
let carrito =[]


//cargar los productos
const listaProductosHtml = document.querySelector("#listaProductosHtml")

const cargarProductos=(lista)=>{
    listaProductosHtml.innerHTML = '';
    lista.forEach(producto => {
        listaProductosHtml.innerHTML+=//html
        `
        <div class="producto">
            <h4 id="titulou">${producto.nombre}</h4>
                <img src="${producto.imagen}">
                <p class="agregar">${producto.precio}</p>
                <input type="number" id="cantidad-${producto.id}" min="1" value="1">
                <button class="agregar" data-id="${producto.id}">Agregar al carrito</button>
        </div>`
    });
    const agregarBotones = document.querySelectorAll('.agregar');
    agregarBotones.forEach(boton => {
        boton.addEventListener('click', function () {
            // Obtener el ID del producto y la cantidad seleccionada
            const id = parseInt(this.dataset.id);
            const cantidadInput = document.getElementById(`cantidad-${id}`);
            let cantidad = parseInt(cantidadInput.value);
            if (isNaN(cantidad) || cantidad < 1) {
                cantidad = 0;
            }
            const producto = listaProductos.find(item => item.id === id);
            
            // Verificar si el producto ya está en el carrito y actualizar la cantidad o agregarlo al carrito
            const productoExistenteIndex = carrito.findIndex(item => item.id === id);
            if (productoExistenteIndex !== -1) {
                carrito[productoExistenteIndex].cantidad += cantidad;
            } else {
                carrito.push({...producto, cantidad});
            }
            //lo carga en el carrito como dice el nombre daun
            cargarCarrito(carrito);
            // Mostrar el carrito después de agregar un producto
            cantidadInput.value = 1;
        });
    });
};

//selector de categoria
const selecFiltro = document.querySelector("#filtroCategoria")
//cargar categorias
const CargarCategorias=(categoria)=>{
    selecFiltro.innerHTML=''
    categoria.forEach(categoria=>{
        selecFiltro.innerHTML+=//html
        `<option value="${categoria.id_categoria}">${categoria.name}</option>`
    })
    
}
let productosFiltrados = []

// Función para filtrar productos por categoria
const filtrarPorCategoria = (id) => {
    inputBusqueda.value="";
    if(id!=0){
        productosFiltrados = listaProductos.filter(producto => producto.id_categoria == id);
    }
    if(id==0){
        productosFiltrados=listaProductos;
    }
    cargarProductos(productosFiltrados);
};

// Event listeners para los botones de filtro por categoria wasa
    selecFiltro.addEventListener('change', () => {
        const id = selecFiltro.value;
        filtrarPorCategoria(id);
    });




let btnpo = false;
let btnpl = false;

    // Función para ordenar productos por precio
const ordenarPorPrecio = (productos, ascendente) => {
    productos.sort((a, b) => ascendente ? a.precio - b.precio : b.precio - a.precio);
    cargarProductos(productos);
}

// Event listener para el botón de "Pobreza"
const botonPobreza = document.querySelector("#botonPobreza")
botonPobreza.addEventListener('click', () => {
    btnpo = true;
    btnpl = false;
    const productos = inputBusqueda.value === "" ? productosFiltrados : productosFiltradosBusq;
    ordenarPorPrecio(productos, true);
});

// Event listener para el botón de "Plata"
const botonPlata = document.querySelector("#botonPlata")
botonPlata.addEventListener('click', () => {
    btnpo = false;
    btnpl = true;

    const productos = inputBusqueda.value === "" ? productosFiltrados : productosFiltradosBusq;
    ordenarPorPrecio(productos, false);
});

// Event listener para la búsqueda de productos por nombre

const inputBusqueda = document.querySelector("#campoBusqueda")
inputBusqueda.addEventListener('input', () => {
    const terminoBusqueda = inputBusqueda.value.trim();
    buscarProductos(terminoBusqueda);
});

let productosFiltradosBusq = []
let nueva_lista = [];
// Función para buscar productos por wasa
const buscarProductos = (termino) => {
    const categoriaSeleccionada = parseInt(selecFiltro.value);
    
    // Función para filtrar productos por nombre y categoría
    const filtrarProductos = (productos) => {
        return productos.filter(producto => 
            producto.nombre.toLowerCase().includes(termino.toLowerCase()) &&
            (categoriaSeleccionada === 0 || producto.id_categoria === categoriaSeleccionada)
        );
    };

    // Filtrar productos dependiendo del estado de los botones
    if (!btnpl && !btnpo) {
        productosFiltrados = filtrarProductos(listaProductos);
    } else {
        nueva_lista = filtrarProductos(productosFiltrados);
    }

    productosFiltradosBusq = btnpl || btnpo ? nueva_lista : productosFiltrados;
    cargarProductos(productosFiltradosBusq);
};