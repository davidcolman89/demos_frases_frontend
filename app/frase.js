var Frase = {
    frases:[],
    getFrasesFromAPI: function(callback) {
        return $.getJSON(urlApiFrases).done(callback);
    }
};