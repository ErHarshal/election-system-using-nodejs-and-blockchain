'use strict';
const express = require('express');
const router = express.Router();
const authCtr = require('../../controllers/authentication/index');

router.get('/', (req, res) => {
    return res.redirect('/login');
});

router.get('/login', (req, res) => {
    return res.render('authentication/login', {
                'title': 'login',
                'layout': 'main'
            });
});

router.get('/hello', (req, res) => {
    res.render('authentication/hello', {
        'title': 'hello',
        'layout': 'main'
    });
});
router.get('/election', (req, res) => {
    authCtr.depoyContract().then((result)=>{
        console.log("accounts-->",result);
        res.render('election/voting', {
            'title': 'hello',
            'layout': 'main',
            'data': result
        });
    }).catch((err)=>{
        console.log("Error-->",err);
    });
});

router.get('/compiler', (req, res) => {
    authCtr.compiler().then((result)=>{
        console.log("accounts-->",result);
        res.render('authentication/hello', {
            'title': 'hello',
            'layout': 'main'
        });
    }).catch((err)=>{
        console.log("Error-->",err);
    });
});

module.exports = router;