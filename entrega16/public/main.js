const socket = io.connect();

function render(data) {
  const html = data.map((elem, index) => {
      return(`<div>
          <strong>${elem.email}</strong>:
          <em>${elem.mensaje}</em>
          <em>${elem.fecha}</em>
      </div>`)
  }).join(" ");

  document.getElementById('messages').innerHTML = html;
  
}


function addMessage(e) {
   const f = new Date()
   let formatDate = f.getDate() + "/" + f.getMonth() + "/" + f.getFullYear() + " " + f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds();

   if (document.getElementById('email').value !== "" ) {
    const mensaje = {
        email: document.getElementById('email').value,
        mensaje: document.getElementById('message').value,
        fecha: formatDate
    };
    socket.emit('new-message', mensaje);
   } else {
     alert("Debe ingresar su direccion de correo");
   }
}

socket.on('messages', data => {
    render(data);
})