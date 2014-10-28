/**
 * Created by david on 27/10/14.
 */
var App = {
    initialize: function () {
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
        Helper.jqueryEventClick('#btn-save-new-frase', function () {
            Helper.jqueryShowAjaxLoading();
            FraseController.store('frm-new-frase', 'div-ajax-response');
        });
        Helper.jqueryMobileOnPageShow('#listado-frases', function (e) {
            e.preventDefault();
            App.fillTableRowsWithFrases();
        });
    },
    fillTemplatesContent: function () {
        this.fillHeaderContent();
        this.fillFooterContent();
    },
    fillHeaderContent: function () {
        Helper.jqueryFillHTMLContent('.header-content', App.templates.headerContent());
    },
    fillFooterContent: function () {
        Helper.jqueryFillHTMLContent('.footer-content', App.templates.footerContent());
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
    fillTableRowsWithFrases: function () {
        Helper.jqueryShowAjaxLoading();
        Frase.getFrasesFromAPI(function (response) {
            Helper.jqueryFillHTMLContent('#table-frases-tbody',App.createHTMLWithFrases(response.data));
            Helper.jqueryHideAjaxLoading();
        });
    },
    createHTMLWithFrases: function (frases) {
        var html = "";
        $.each(frases, function (index, frase) {
            html += App.templates.tableRowsOfFrases(frase);
        });
        return html;
    }
};