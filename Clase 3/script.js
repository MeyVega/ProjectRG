// Manejar formulario de registro de mascota
document.getElementById('formularioRegistro').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const nombre = document.getElementById('nombreMascota').value;
    const tipo = document.getElementById('tipoMascota').value;
    const imagen = document.getElementById('imagenMascota').files[0];
  
    if (nombre && tipo && imagen) {
      const lista = document.getElementById('listaRegistros');
      const nuevoRegistro = document.createElement('li');
      nuevoRegistro.classList.add('registro-item');
  
      const imagenURL = URL.createObjectURL(imagen);
      nuevoRegistro.innerHTML = `
        <img src="${imagenURL}" alt="${nombre}">
        <h4>${nombre}</h4>
        <p>Tipo: ${tipo}</p>
      `;
  
      lista.appendChild(nuevoRegistro);
  
      // Limpiar formulario
      document.getElementById('formularioRegistro').reset();
    } else {
      alert('Por favor, complete todos los campos');
    }
  });
  