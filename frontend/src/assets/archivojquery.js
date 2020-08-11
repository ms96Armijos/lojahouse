$(document).ready(function () {
  $('#newAccount').validate({
      rules: {
          userName: { required: true },
          pass: {
              required: true,
              minlength: 5
          },
          passConfir: {
              required: true,
              minlength: 5,
              equalTo: "#pass"
          },
          email: {
              required: true,
              email: true
          }
      },
      messages: {
          userName: {
              required: "Ingresar su nombre de usuario",
          },
          pass: {
              required: "Escribir su contraseña",
              minlength: "Password must have at least 5 characters...",
          },
          passConfir: {
              required: "Please write a password...",
              minlength: "Password must have at least 5 characters...",
              equalTo: "Password must match...",
          },
          email: {
              required: "Please write an email...",
              email: "Format must be: example@domain.com",
          }
      },
      submitHandler: function (form) {
          register();
      }
  });
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
