// Lista de flores con la última tarjeta "Próximamente"
let floresEmpresa = [
  { nombre: "Rosa Roja", precio: 10, imagen: "/Proyecto Final/img/rosas.jpg", disponibilidad: "Disponible" },
  { nombre: "Girasol", precio: 8, imagen: "/Proyecto Final/img/girasoles.jpg", disponibilidad: "Disponible" },
  { nombre: "Tulipán", precio: 12, imagen: "/Proyecto Final/img/tulipanes.jpg", disponibilidad: "Agotado" },
  { nombre: "Petunia", precio: 12, imagen: "/Proyecto Final/img/Petunias.jpg", disponibilidad: "Agotado" },
  { nombre: "Hortensias", precio: 12, imagen: "/Proyecto Final/img/hortensias.jpg", disponibilidad: "Disponible" },
  { nombre: "Orquídeas", precio: 12, imagen: "/Proyecto Final/img/orquideas.jpg", disponibilidad: "Agotado" },
  { nombre: "Próximamente", precio: "", imagen: "/Proyecto Final/img/proximamente.jpg", disponibilidad: "Muy Pronto" } // Tarjeta final
];

let indiceCarrusel = 0;
const floresTotal = floresEmpresa.length;

// Elementos del DOM
const carruselContenedor = document.getElementById("carruselContenedor");
const btnAnterior = document.querySelector(".carrusel-btn.anterior");
const btnSiguiente = document.querySelector(".carrusel-btn.siguiente");

// Función para crear una tarjeta de flor
function crearTarjetaFlor(flor) {
  const card = document.createElement("div");
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
  carruselContenedor.innerHTML = ""; // Limpiar contenido

  floresEmpresa.forEach((flor) => {
    const card = crearTarjetaFlor(flor);
    carruselContenedor.appendChild(card);
  });

  // Ajustar tamaño del contenedor del carrusel
  carruselContenedor.style.width = `${floresTotal * 100}%`;

  // Posicionar correctamente
  actualizarCarrusel();
}

// Función para mover el carrusel
function moverCarrusel(direccion) {
  if (direccion === -1 && indiceCarrusel > 0) {
    indiceCarrusel--;
  } else if (direccion === 1 && indiceCarrusel < floresTotal - 1) {
    indiceCarrusel++;
  } else {
    return; // No mover si está en los extremos
  }

  actualizarCarrusel();
}

// Función para actualizar la posición del carrusel
function actualizarCarrusel() {
  const anchoTarjeta = 100 / floresTotal; // Calcula el ancho de cada tarjeta en porcentaje
  carruselContenedor.style.transition = "transform 0.5s ease-in-out";
  carruselContenedor.style.transform = `translateX(${-indiceCarrusel * anchoTarjeta}%)`;
}

// Event Listeners para los botones
btnAnterior.addEventListener("click", () => moverCarrusel(-1));
btnSiguiente.addEventListener("click", () => moverCarrusel(1));

// Iniciar el carrusel
renderizarCarrusel();