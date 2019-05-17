//Servicio de modelo Trends
const request = require('request');

class TrendsService{

    //busca los trends segun sitio y categoria(opcional)
    //caso de error envia un objeto con un messaje y un tipo de error
    static async findTrends(site, category){
        if (!site || site.id===''){
            return {message: 'El Sitio '+ site.name + ' no tiene trends' , error: 404};
        }
        if (!category || category.id===''){
            request('https://api.mercadolibre.com/trends/' + site.id, function (error, response, body) {
                if (error  || !response.statusCode === 200 || body==='null') {
                    if (body){
                        return {message: 'El Sitio '+ site.name + ' no tiene trends' , error: 404};
                    }
                    var errorObj = JSON.parse(body);
                    return {message: errorObj.message, error: errorObj.error};
                }
                return JSON.parse(body);
            });
        }else {
            request('https://api.mercadolibre.com/trends/' + site.id + '/' + category.id, function (error, response, body) {
                if (error || !response.statusCode === 200 || body === 'null') {
                    if (body) {
                        return {
                            message: 'El Sitio ' + site.name + ' no tiene trends con categoria' + category.name + ' no tiene trends',
                            error: 404
                        };
                    }
                    var errorObj = JSON.parse(body);
                    res.render('error', {message: errorObj.message, error: errorObj.error});
                }
                return {site: site, category: category, trends: JSON.parse(body), rows: rows, columns: columns};
            });
        }
    }
}

module.exports.class = TrendsService;

