var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  request('https://api.mercadolibre.com/sites', function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.render('index',{sites:  JSON.parse(body)});
      res.end();
    }else{
      var errorObj = JSON.parse(body);
      res.render('error',{message:errorObj.message, error: errorObj.error})
    }
  })
});




module.exports = router;
