/**
 * Created by david on 27/10/14.
 */
var App = {
    initialize: function() {

        console.log(":INICIALIZANDO LA APP:");

        this.initializeTemplates();
        this.compileTemplates();
        this.fillTemplatesContent();
        this.onDeviceReady();
    },
    initializeTemplates: function () {
        App.templates = {
            tableRowsOfFrases: "",
            headerContent: "",
            footerContent: ""
        };
    },
    onDeviceReady: function () {
        this.fillTableRowsWithFrases();

        Helper.jqueryEventClick('btn-save-new-frase',function() {
            var idForm = 'frm-new-frase';
            var dataFormSerialized = Helper.jqueryGetDataFormSerialized(idForm);
            App.saveNewFrase(dataFormSerialized, function (response) {
                Helper.jqueryResetForm(idForm);
            }, function (response) {

                var messages = response.responseJSON.error.message;
                var textErrors = Helper.jqueryGetErrorsByMessagesObject(messages);

                var html = textErrors.join('<br/>');

                Helper.jqueryFillHTMLContent('div-ajax-response',html);
            });
        });
    },
    fillTemplatesContent: function () {
        this.fillHeaderContent();
        this.fillFooterContent();
    },
    fillHeaderContent: function () {
        var headerHtml = App.templates.headerContent();
        $(".header-content").html(headerHtml);
    },
    fillFooterContent: function () {
        var footerHtml = App.templates.footerContent();
        $(".footer-content").html(footerHtml);
    },
    compileTemplates: function () {
        var source;

        source = document.getElementById('table-rows-frases').innerHTML;
        App.templates.tableRowsOfFrases = Handlebars.compile(source);

        source = document.getElementById('header-content').innerHTML;
        App.templates.headerContent = Handlebars.compile(source);

        source = document.getElementById('footer-content').innerHTML;
        App.templates.footerContent = Handlebars.compile(source);
    },
    fillTableRowsWithFrases: function() {
        Frase.getFrasesFromAPI(function(response){
            var frases = response.data;
            var tbodyOfTableFrases = $('#table-frases-tbody');
            var html = App.createHTMLWithFrases(frases);
            tbodyOfTableFrases.html(html);
        });
    },
    createHTMLWithFrases: function (frases) {
        var html = "";
        $.each(frases, function (index, frase) {
            html += App.templates.tableRowsOfFrases(frase);
        });
        return html;
    },
    saveNewFrase: function (data, callback, callbackFail) {
        Frase.setDataStore(data).store(callback, callbackFail);
    }
};