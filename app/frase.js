var Frase = {
    dataStore:{
        autor:'',
        texto:''
    },
    frases:[],
    getDataStore: function () {
        return this.dataStore;
    },
    setDataStore: function(dataStore) {
        this.dataStore = dataStore;
        return this;
    },
    getFrasesFromAPI: function(callback) {
        return Helper.jqueryGetJSON(urlApiFrases,callback);
    },
    store: function(callback, callbackFail) {
        return Helper.jqueryPostJSON(urlApiFrases, this.getDataStore(), callback, callbackFail);
    }
};