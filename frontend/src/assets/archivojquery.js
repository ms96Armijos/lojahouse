$(document).ready(function () {
  $('#nuevoArrendatario').validate({
    rules: {
      nombre: { required: true },
      apellido: { required: true },
      celular: { required: true },
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      nombre: {
        required: "Ingresar sus nombres"
      },
      apellido: {
        required: "Escribir sus apellidos"
      },
      celular: {
        required: "Escriba el número de celular"
      },
      email: {
        required: "Escriba su correo electrónico",
        email: "Format must be: example@domain.com",
      }
    },
    submitHandler: function (form) {
      $('#modalRegistrarUsuario').modal('hide')
    }
  });
});

function ellipsis_box(elemento, max_chars) {
  limite_text = $(elemento).text();
  if (limite_text.length > max_chars) {
    limite = limite_text.substr(0, max_chars) + " ...";
    $(elemento).text(limite);
  }
}
$(function () {
  ellipsis_box(".limitado", 5);
});

/*MODAL DE REGISTRO DE SERVICIOS*/
$(document).ready(function () {
  $('#nuevoServicio').validate({
    rules: {
      userName: { required: true }
    },
    messages: {
      userName: {
        required: "Ingrese el nombre del servicio",
      }
    },
    submitHandler: function (form) {
      $('#modalServicios').modal('hide')
    }
  });
});


function register() {
  alert("Account created!!");
}
