const path = require('path');
const express =  require('express');
const SocketIo = require('socket.io');

const app = express();

// SETTINGS
app.set('port', process.env.PORT || 3000);

//ARCHIVOS ESTATICOS
app.use(express.static(path.join(__dirname, 'public')))

//ESTADO DE SERVIDOR
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
})

//WEBSOCKETS
const io = SocketIo(server)
io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    //ESCUCHA LOS DATOS QUE LE ENVIA EL CLIENTE
    socket.on('chat:message', (data) => {
        //EMITE DESDE EL SERVIDOR LOS DATOS
        io.sockets.emit('chat:message', data);
    });

    //RECIBE LOS DATOS, ESCUCHA EL EVENTO ENVIADO DESDE EL CLIENTE Y ALMACENA LOS DATOS
    socket.on('chat:typing', (data) => {
        //ENVIA LOS DATOS A TODOS MENOS A LA INTERFAZ ORIGINAL QUE MANDÓ EL MENSAJE
        socket.broadcast.emit('chat:typing', data);
    })
})





