var express = require('express');
var request = require('request');
var router = express.Router();

/* GET CATEGORIES listing. */
router.get('/', function(req, res) {
    const url = "https://api.mercadolibre.com/trends/";
    const site = JSON.parse(req.query.site);
    var category;
    if(req.query.category){
        category = JSON.parse(req.query.category);
    }
    const rows = req.query.rows;
    const columns=  req.    query.columns;
    if (site.id==='' || rows ==='' || columns ===''){
        res.writeHead(404);
        res.render('error',{message:'El sitio no debe ser nulo', error: errorObj.error});
        res.end();
        return;
    }
    if (rows ==='' || columns ==='') {
        res.writeHead(404);
        res.render('error', {message: 'Debe Ingresar Columnas y Filas', error: "404"});
        res.end();
        return;
    }
    if (rows <3 || columns <3 || rows >5 || columns >5) {
        res.writeHead(404);
        res.render('error', {message: 'Las filas y columnas de deben estar entre 3 y 5', error: "404"});
        res.end();
        return;
    }

    if (!category || category.id===''){
        request(url + site.id, function (error, response, body) {
            if (error  || !response.statusCode === 200 || body==='null') {
                if (body){
                    res.render('error', {message: 'El Sitio '+ site.name + ' no tiene trends' , error: 404});
                    res.end();
                    return;
                }
                var errorObj = JSON.parse(body);
                res.render('error', {message: errorObj.message, error: errorObj.error});
                res.end();
                return;

            }
            res.render('trends',  {site: site, category: category, trends:JSON.parse(body), rows:rows, columns:columns});
            res.end();
        });
    }
    else{
        request(url + site.id + '/' + category.id, function (error, response, body) {
            if (error  || !response.statusCode === 200 || body==='null') {
                if (body){
                    res.render('error', {message: 'El Sitio '+ site.name + ' no tiene trends con categoria' + category.name + ' no tiene trends' , error: 404});
                    res.end();
                    return;
                }
                var errorObj = JSON.parse(body);
                res.render('error', {message: errorObj.message, error: errorObj.error});

            }
            res.render('trends', {site: site, category: category, trends:JSON.parse(body), rows:rows, columns:columns});
            res.end();
        });
    }

});

module.exports = router;