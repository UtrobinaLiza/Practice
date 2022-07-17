// подключение зависимостей
const express = require('express');
// const session = require('express-session')
const params = require('./private/config.json').debug;
// const cookieParser = require('cookie-parser');
// настройка приложения
const app = express();
// app.use(express.cookieParser());
app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');



// app.use(
//     session({
//       secret: '123',
//       saveUninitialized: true,
//     })
//   )


// routing - маршрутизация
const router_index = require('./routes/index.js');
const router_feed = require('./routes/feed.js');



app.use('/', router_index);
app.use('/feed', router_feed);

// запуск приложения
app.listen(params.port, params.hostname, () => {
    console.log(`>>> ${params.hostname}:${params.port}/\n>>> to stop: Ctrl+C`);
});
