const express = require('express');
const sqlite = require('sqlite3').verbose();



let md_index = require('../models/model-index').md_index;
const router = express.Router();

router.get('/', (req, res) => {
    let fileDB = './private/feeds.db'; // файл БД
    const db = new sqlite.Database(fileDB);
    let query = `SELECT DATE, TIME, name, feed, rate FROM feeds ORDER BY id DESC LIMIT ?`;
    let values = [50];
    // res.cookie('cookiename', 'cookievalue', { maxAge: 900000, httpOnly: true });

    // print(res.cookie)
    // print(localStorage.getItem('test'))
    db.all(query, values, (err, records) => {
        if (err) console.log(err.message);
        // md_index.feeds = records;
        console.log(records)
        md_index.feeds = records;
        res.render('index.ejs', md_index);
    });
    db.close();
});








module.exports = router;
