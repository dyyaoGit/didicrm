var express = require('express');
var router = express.Router();
var path = require('path');
var app = express();

var qiniuSDK = require('../api/qiniu');

var mysql = require('mysql');
const db = mysql.createConnection({
    connectionLimit : 10,
    host: 'didi.yaojunrong.com',
    user: 'root',
    password: 'yjr1923521',
    database: 'didi'
})

/* GET home page. */
router.get('/',(req, res, next) => {
    res.sendFile(path.join(app.get('views'), '/index.html'))
})

router.get('/crm/article/get', function(req, res, next) {
    db.query('SELECT * FROM news;', (err, results, fields) => {
        if(err) {res.json({data: '请求超时，请重试',code: 504})};
        res.json({data: results})
    })
});

router.post('/crm/article/add', (req, res, next) => {
    const body = req.body;
    const queryString = 'INSERT INTO news (id, title, author, createtime, updatetime, content, logo) VALUES(0,?,?,?,?,?,?);'
    const createtime = Math.round(new Date().getTime()/1000);
    const updatetime = Math.round(new Date().getTime()/1000);

    let params = [body.title, body.author, createtime, updatetime, body.content, body.logo]
    console.log(params);
    db.query(queryString, params, (error, results, fields) => {
        if(error) {
            res.json({code: 504, msg: '服务器请求超时'})
        }
        res.json({data:'success', code: 200, msg: 'success', ret: true})
    })
})

router.get('/upload', (req, res, next) => {
    res.json({
        data: {
            token: qiniuSDK
        },
        code: 200,
        msg: 'success',
        ret: true
    })
});




module.exports = router;
