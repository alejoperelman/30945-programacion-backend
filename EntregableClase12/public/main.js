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
    const mensaje = {
        email: document.getElementById('email').value,
        mensaje: document.getElementById('mensaje').value,
        fecha: "Es HOY"
    };
    
    socket.emit('new-message', mensaje);
    return false;
}

socket.on('messages', data => {
    render(data);
})