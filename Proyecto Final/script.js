document.addEventListener("DOMContentLoaded", function () {
  let floresEmpresa = [
      { nombre: "Rosa Roja", precio: 10, imagen: "/Proyecto Final/img/rosas.jpg", disponibilidad: "Disponible" },
      { nombre: "Girasol", precio: 8, imagen: "/Proyecto Final/img/girasoles.jpg", disponibilidad: "Disponible" },
      { nombre: "Tulipán", precio: 12, imagen: "/Proyecto Final/img/tulipanes.jpg", disponibilidad: "Agotado" },
      { nombre: "Petunia", precio: 12, imagen: "/Proyecto Final/img/Petunias.jpg", disponibilidad: "Agotado" },
      { nombre: "Hortensias", precio: 12, imagen: "/Proyecto Final/img/hortensias.jpg", disponibilidad: "Disponible" },
      { nombre: "Orquídeas", precio: 12, imagen: "/Proyecto Final/img/orquideas.jpg", disponibilidad: "Agotado" },
      { nombre: "Próximamente", precio: "", imagen: "/Proyecto Final/img/proximamente.jpg", disponibilidad: "Muy Pronto" }
  ];

  let selectFlor = document.getElementById("florSolicitada");

  if (!selectFlor) {
      console.error("Error: No se encontró el elemento <select> con ID 'florSolicitada'");
      return;
  }

  // Limpiar y agregar opción por defecto
  selectFlor.innerHTML = '<option value="" disabled selected>Selecciona una flor</option>';

  // Agregar TODAS las flores al select
  floresEmpresa.forEach(flor => {
      let option = document.createElement("option");
      option.value = flor.nombre;
      option.textContent = `${flor.nombre}`;
      selectFlor.appendChild(option);
  });

  // Confirmación al enviar el formulario de solicitud
  let formularioSolicitud = document.getElementById("solicitudForm");

  if (formularioSolicitud) {
      formularioSolicitud.addEventListener("submit", function (event) {
          event.preventDefault(); // Evita el envío para mostrar el mensaje

          let nombre = document.getElementById("nombreCliente").value;
          let email = document.getElementById("emailCliente").value;
          let flor = selectFlor.value;

          if (!flor) {
              alert("Por favor, selecciona una flor antes de enviar la solicitud.");
              return;
          }

          alert(`¡Gracias, ${nombre}! Hemos recibido tu solicitud para la flor ${flor}. Te contactaremos en ${email}.`);

          this.reset();
      });
  } else {
      console.error("Error: No se encontró el formulario con ID 'solicitudForm'");
  }

  // ---------------------------- Agregar Nueva Flor ----------------------------

  let formularioAgregarFlor = document.getElementById("agregarFlorForm");

  if (formularioAgregarFlor) {
      formularioAgregarFlor.addEventListener("submit", function (event) {
          event.preventDefault();

          let nombreFlor = document.getElementById("nombreFlor").value;
          let precioFlor = document.getElementById("precioFlor").value;
          let imagenFlor = document.getElementById("imagenFlor").value;
          let disponibilidadFlor = document.getElementById("disponibilidadFlor").value;

          if (!nombreFlor || !precioFlor || !imagenFlor || !disponibilidadFlor) {
              alert("Por favor, completa todos los campos antes de agregar la flor.");
              return;
          }

          // Agregar nueva flor al array
          let nuevaFlor = {
              nombre: nombreFlor,
              precio: parseFloat(precioFlor),
              imagen: imagenFlor,
              disponibilidad: disponibilidadFlor
          };

          floresEmpresa.push(nuevaFlor);

          // Agregar la nueva flor al select
          let option = document.createElement("option");
          option.value = nuevaFlor.nombre;
          option.textContent = `${nuevaFlor.nombre} (${nuevaFlor.disponibilidad})`;
          selectFlor.appendChild(option);

          alert(`¡La flor "${nuevaFlor.nombre}" ha sido agregada exitosamente!`);

          this.reset();
      });
  } else {
      console.error("Error: No se encontró el formulario");
  }

  // ---------------------------- Carrusel ----------------------------

  let indiceCarrusel = 0;
  const carruselContenedor = document.getElementById("carruselContenedor");
  const btnAnterior = document.querySelector(".carrusel-btn.anterior");
  const btnSiguiente = document.querySelector(".carrusel-btn.siguiente");

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

  function renderizarCarrusel() {
      carruselContenedor.innerHTML = ""; // Se vacía el contenido
      floresEmpresa.forEach((flor) => {
          const card = crearTarjetaFlor(flor);
          carruselContenedor.appendChild(card);
      });

      // Ajustar tamaño del contenedor
      carruselContenedor.style.display = "flex";
      carruselContenedor.style.transition = "transform 0.5s ease-in-out";

      actualizarCarrusel();
  }

  function moverCarrusel(direccion) {
      const anchoTarjeta = carruselContenedor.children[0].offsetWidth;

      if (direccion === -1 && indiceCarrusel > 0) {
          indiceCarrusel--;
      } else if (direccion === 1 && indiceCarrusel < floresEmpresa.length - 1) {
          indiceCarrusel++;
      } else {
          return;
      }

      actualizarCarrusel(anchoTarjeta);
  }

  function actualizarCarrusel() {
      const anchoTarjeta = carruselContenedor.children[0].offsetWidth;
      carruselContenedor.style.transform = `translateX(${-indiceCarrusel * anchoTarjeta}px)`;
  }

  // Event Listeners para el carrusel
  btnAnterior.addEventListener("click", () => moverCarrusel(-1));
  btnSiguiente.addEventListener("click", () => moverCarrusel(1));

  // Iniciar el carrusel
  renderizarCarrusel();
});
