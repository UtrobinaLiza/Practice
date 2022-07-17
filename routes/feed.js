const express = require('express');
const sqlite = require('sqlite3').verbose();
const htmlParser = express.urlencoded({extended: false});
const { md_feed } = require('../models/model-feed'); // подключаем модель данных
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('feed.ejs', md_feed); // render view
});

router.post('/', htmlParser, (req, res) => {
    let fileDB = './private/feeds.db'; // файл БД
    let nameUser = req.body.nameUser; // находим по имени тега в шаблоне
    let feedUser = req.body.feedUser; // находим по имени тега в шаблоне
    let rateUser = req.body.userRate;
    // let string_date = new Date()
    //     .toISOString()
    //     .replace(/T/, ' ')
    //     .replace(/\..+/, '')
    //     .split(' ')
    // let time = string_date[0];
    // let date = string_date[1];

    // let time = Date.parse(new Date())
    let string_date = new Date();
    // console.log(string_date.toISOString())
    string_date = string_date.toLocaleString()
    console.log(string_date)
    
    let tmp1 = string_date.split(', ')
    let time = tmp1[1];
    let b = tmp1[0].split('.');
    let date = `${b[2]}-${b[1]}-${b[0]}`
    // let date = `${string_date.getFullYear()}.${string_date.getMonth()}.${string_date.getDay()}`
    // let time = '';
    // let date = '';


    console.log(req.body.nameUser, req.body.feedUser, req.body.userRate);
    const db = new sqlite.Database(fileDB);
    let query = `INSERT INTO feeds(name,feed,rate,TIME,DATE) VALUES(?,?,?,?,?)`;
    db.run(query, [nameUser, feedUser, rateUser, time, date], (err) => {
        if (err) console.log(err.message);
        res.redirect("/");
        db.close();
    });
});

module.exports = router;
