//1.
// const app = require ('express')();
// const http = require ('http').Server(app);
//
// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/index.html');
// });
//
// http.listen(3000, function () {
//     console.log('server at localhost:3000');
// });
//
//2. hello world + Socket.io
// const app = require('express')();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
//
// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/index.html');
// });

//выполнится при подключении пользователя
// io.on('connection', function (socket) {
//     console.log('A user connected');

//выполнится при отсоединения пользователя
//     socket.on('disconnect', function () {
//         console.log('A user disconnected')
//     });
// });
//
// http.listen(3000, function () {
//     console.log('Server  at localhost:3000');
// });

//3. Обработка событий
//Родные события: connect, message, disconnect, reconnect, ping,
// const app = require('express')();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
//
// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/index.html');
// });
//
// io.on('connection', function (socket) {
//     console.log('A user connected');
//
//     //Отправка сообщения через промежуток времени
//     setTimeout(function () {
//         socket.send('Sent a message 2 seconds after connection.');
//     }, 2000);
//         socket.on('disconnect', function () {
//             console.log('A user disconnected');
//         });
// });
// http.listen(3000, function () {
//     console.log('Server at localhost:3000');
// });


//4. Добавленние пользовательских событий

// const app = require('express')();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
//
// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/index.html');
// });
//
// io.on('connection', function (socket) {
//     console.log('A user connected');
//     setTimeout(function () {
//         //отправка своего события и объекта клиенту
//         socket.emit('myEvent', {description: 'User event from server'});
//     }, 2000);
//     socket.on('disconnected', function () {
//         console.log('A user disconnected');
//     });
// });
// http.listen(3000, function() {
//    console.log('Server at localhost:3000');
// });


//5. Получение событий от клиента.

// const app = require('express')();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
//
// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/index.html');
// });
//
// io.on('connection', function (socket) {
//     socket.on('clientEvent', function (data) {
//         console.log(data);
//     });
// });
//
// http.listen(3000, function () {
//     console.log('Server at localhost:3000');
// });


//6. Широковещание - отправка сообщений всем подключенным клиентам

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function (req, reset) {
    res.sendFile(__dirname + '/index.html');
});

let users = 0;

io.on('connection', function (socket) {
    users++;
    socket.broadcast.emit('broadcast', {description: users + 'users connected'});
    socket.on('disconnect', function () {
       users--;
       socket.broadcast.emit('broadcast', {description: users + 'user disconnected'});
    });
});

http.listen(3000, function () {
    console.log('Server at localhost:3000');
});
