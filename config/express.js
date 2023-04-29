const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser=require('cookie-parser');

module.exports = (app) => {
    const hbs = handlebars.create({
        extname: '.hbs'
    });

    app.engine('.hbs', hbs.engine); //задава на app да ползва engine-a на handlebars
    app.set('view engine', '.hbs');

    app.use('/static', express.static('static'));  // всички заявки към static ще достъпват папката static
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());  //добавя cookieParser като midlleware
};