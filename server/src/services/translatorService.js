//Pool de conexion a la BD en PostgreSql
var connection = require('../../database');
const axios = require('axios')
var env = require('node-env-file'); // .env file
env(__dirname + '/../../.env');

/** number of lines and words */
exports.stats = async (req, callback) => {

    try {
        // Inicio de variables
        var lyrics = req.body.lyrics;
        var totalWords = 0;
        // contamos la ultima linea
        var totalLines = 1;
        // reemplazamos los saltos de linea y separamos por espacios en blanco para obtener la lista de palabras
        var words = lyrics.replace(/\\n/g, " ").replace(/\\r/g, " ").split(/\s/g);

        // Recorremos la lista de palabaras y si no estan en blanco, contamos el total de palabras
        // si esta en blanco y la sigueinte palabra de la lista no esta en blanco, contamos las lineas
        for (let i = 0; i < words.length; i++) {
            if (words[i].length >= 1) {
                totalWords++;
            } else {
                if (i + 1 != words.length && words[i + 1].length >= 1) {
                    totalLines++;
                }
            }
        }

        var lines =

            callback(null, {
                totalLines,
                totalWords
            });
        return
    } catch (error) {
        callback(error);
        return
    }
}

/** Translate */
exports.translate = async (req, callback) => {

    try {
        var body = req.body;
        var headers = {
            'Content-Type': req.headers.Content-Type,
            'Authorization': req.headers.Authorization
        };
        const data = await axios.post('http://api-b2b.backenster.com/b1/api/v3/translate', body, {
            headers
        })
        
        callback(null, data);
        return
    } catch (error) {
        callback(error);
        return
    }
}