var Frase = {
    limitOfPaginate: 15,
    dataStore: '',
    frases: [],
    idForm: '',
    idDivAjaxResponse: '',
    getDataStore: function () {
        return this.dataStore;
    },
    setDataStore: function (dataStore) {
        this.dataStore = dataStore;
        return this;
    },
    getIdForm: function () {
        return this.idForm;
    },
    setIdForm: function (idForm) {
        this.idForm = idForm;
        return this;
    },
    getIdDivAjaxResponse: function () {
        return this.idDivAjaxResponse;
    },
    setIdDivAjaxResponse: function (idDivAjaxResponse) {
        this.idDivAjaxResponse = idDivAjaxResponse;
        return this;
    },
    getFrasesFromAPI: function (callback) {
        return Helper.jqueryGetJSON(urlApiFrases, callback);
    },
    getFrasesFromAPIWithPaginate: function (page, callback, limit ) {
        var url = urlApiFrasesPaginadas + '?' + $.param({
            page:page,
            limit: limit || this.limitOfPaginate
        });
        return Helper.jqueryGetJSON(url, callback);
    },
    save: function (callback, callbackFail) {
        return Helper.jqueryPostJSON(urlApiFrases, this.getDataStore(), callback, callbackFail);
    }
};