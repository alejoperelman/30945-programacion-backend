class Mensajes {
    // constructor(email, mensaje, fecha) {
    //     this.email = email
    //     this.mensaje = mensaje
    //     this.fecha = fecha
    //     }
        
    getMsg(knex){
        return knex('mensajes').select('email', 'mensaje', 'fecha')
        .then((result) => {
            console.log(result);
            return result;
        }).catch((err) => {
            console.log(err);
        });
    }

    postMsg(knex, newMsg) {
        return knex('mensajes').insert(newMsg)
        .then((result) => {
            console.log(result);
            return result;
        }).catch((err) => {
            console.log(err);
        });
    }
}

module.exports = {Mensajes}
