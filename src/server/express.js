const express = require( 'express' );
const fs = require( 'fs' );
const path = require( 'path' );
const React = require( 'react' );
const ReactDOMServer = require( 'react-dom/server' );
// create express application
const app = express();
// импорт компонента App
// const {App} = require('../../dist/build/App')
import App from "../../dist/build/App";
// обслуживание статических ресурсов
app.get( /\.(js|css|map|ico)$/, express.static( path.resolve( __dirname, '../..' ) ) );
// в ответ на любые другие запросы отправляем 'index.html'
app.use( '*', ( req, res ) => {
// читаем файл `index.html`
    let indexHTML = fs.readFileSync( path.resolve( __dirname, '../../public/index.html' ), {
        encoding: 'utf8',
    } );

// получаем HTML строку из компонента 'App'
    let appHTML = ReactDOMServer.renderToString( <App /> )

// заполняем элемент '#app' содержимым из 'appHTML'
    indexHTML = indexHTML.replace( '<div id="root"></div>', `<div id="root">${ appHTML }</div>` )

// устанавливаем заголовок и статус
    res.contentType( 'text/html' );
    res.status( 200 );

    return res.send( indexHTML );

} );
// запускаем сервер на порту 9000
app.listen( '9000', () => {
    console.log( 'Express server started at <http://localhost:9000>' );
} );