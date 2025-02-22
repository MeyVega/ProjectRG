// Se define un array con una lista de flores
let floresEmpresa = [
  { nombre: "Rosa Roja", precio: 10, imagen: "/Proyecto Final/img/rosas.jpg", disponibilidad: "Disponible" },
  { nombre: "Girasol", precio: 8, imagen: "/Proyecto Final/img/girasoles.jpg", disponibilidad: "Disponible" },
  { nombre: "Tulipán", precio: 12, imagen: "/Proyecto Final/img/tulipanes.jpg", disponibilidad: "Agotado" },
  { nombre: "Petunia", precio: 12, imagen: "/Proyecto Final/img/Petunias.jpg", disponibilidad: "Agotado" },
  { nombre: "Hortensias", precio: 12, imagen: "/Proyecto Final/img/hortensias.jpg", disponibilidad: "Disponible" },
  { nombre: "Orquídeas", precio: 12, imagen: "/Proyecto Final/img/orquideas.jpg", disponibilidad: "Agotado" },
  { nombre: "Próximamente", precio: "", imagen: "/Proyecto Final/img/proximamente.jpg", disponibilidad: "Muy Pronto" } 
];

let indiceCarrusel = 0; // Controla la posicion en que va iniciar el carrusel, 0
const floresTotal = floresEmpresa.length; // Guarda la cantidad de flores

// Elementos del DOM, selecion de elementos html, getElementById y querySelector
const carruselContenedor = document.getElementById("carruselContenedor");
const btnAnterior = document.querySelector(".carrusel-btn.anterior");
const btnSiguiente = document.querySelector(".carrusel-btn.siguiente");

// Función para crear una tarjeta de flor
function crearTarjetaFlor(flor) { // Genera una tarjeta con la informacion de flor como parametro
  const card = document.createElement("div"); // Se crea un div dinamico con la clase carrusel-item
  card.className = "carrusel-item";
  card.innerHTML = `
    <img src="${flor.imagen}" alt="${flor.nombre}">
    <h3>${flor.nombre}</h3>
    ${flor.precio ? `<p>Precio: $${flor.precio}</p>` : ""} 
    <p>Disponibilidad: ${flor.disponibilidad}</p>
  `;
  return card;
}

// Función para renderizar el carrusel
function renderizarCarrusel() {
  carruselContenedor.innerHTML = ""; // Se vacia el contenido 

  floresEmpresa.forEach((flor) => { // Se recorre el array de flores, se crean las tarjetas y se agregan al contenedor como una carta
    const card = crearTarjetaFlor(flor);
    carruselContenedor.appendChild(card);
  });

  // Ajustar tamaño del contenedor del carrusel
  carruselContenedor.style.display = "flex";
  carruselContenedor.style.transition = "transform 0.5s ease-in-out";

  // Posicionar correctamente
  actualizarCarrusel();
}

// Función para mover el carrusel
function moverCarrusel(direccion) {
  const anchoTarjeta = carruselContenedor.children[0].offsetWidth; // Ancho de una tarjeta

  if (direccion === -1 && indiceCarrusel > 0) { // Movimiento derecha
    indiceCarrusel--;
  } else if (direccion === 1 && indiceCarrusel < floresTotal - 1) { // Movimiento izquierda
    indiceCarrusel++;
  } else {
    return; 
  }

  actualizarCarrusel(anchoTarjeta);
}

// Función para actualizar la posición del carrusel
function actualizarCarrusel() {
  const anchoTarjeta = carruselContenedor.children[0].offsetWidth; // Ancho de una tarjeta
  carruselContenedor.style.transform = `translateX(${-indiceCarrusel * anchoTarjeta}px)`;
}

// Event Listeners para los botones
btnAnterior.addEventListener("click", () => moverCarrusel(-1));
btnSiguiente.addEventListener("click", () => moverCarrusel(1));

// Iniciar el carrusel
renderizarCarrusel();