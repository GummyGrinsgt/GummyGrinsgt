let todosLosProductos = [];

// 1. Cargar productos desde JSON
fetch('productos.json')
    .then(res => res.json())
    .then(data => {
        todosLosProductos = data;
        mostrarProductos(data); // Mostrar todos al principio
    })
    .catch(err => console.error('Error al cargar productos:', err));

// 2. Función para mostrar productos
function mostrarProductos(lista) {
    const contenedor = document.querySelector('.cajaproductos');
    contenedor.innerHTML = ''; // Limpiar antes de volver a pintar

    lista.forEach(producto => {
        if (!producto.nombre || !producto.imagen || !producto.descripcion || !producto.precio) return;

        const div = document.createElement('div');
        div.className = 'productos';
        div.innerHTML = `
        <h3>${producto.nombre}</h3>
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <p>${producto.descripcion}</p>
        <p><strong>${producto.precio}</strong></p>
      `;
        contenedor.appendChild(div);
    });

    if (lista.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron productos 😢</p>';
    }
}

// 3. Escuchar el input y filtrar
document.getElementById('search').addEventListener('input', function () {
    const texto = this.value.toLowerCase();
    const filtrados = todosLosProductos.filter(producto =>
        producto.nombre.toLowerCase().includes(texto) ||
        producto.descripcion.toLowerCase().includes(texto)
    );

    mostrarProductos(filtrados);
    const seccion = document.querySelector('.cajaproductos');
    seccion.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

