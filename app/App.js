/**
 * Created by david on 27/10/14.
 */
var App = {
    initialize: function () {
        this.initializeTemplates();
        this.bindEvents();
    },
    initializeTemplates: function () {
        App.templates = {
            rowsOfFrases: "",
            headerContent: "",
            footerContent: "",
            listadoFrasesNavbar: "",
        };
        this.compileTemplates();
        this.fillTemplatesContent();
    },
    bindEvents: function() {
        if ( Helper.isAccessedByMobile() ) return document.addEventListener('deviceready', this.onDeviceReady, false);
        return this.onDeviceReady();
    },
    onDeviceReady: function () {

        App.pageOfFrases = 1;

        App.mobHeight = $.mobile.getScreenHeight();

        Helper.jqueryMobileOnPageInit(App.onPageInit);

        Helper.jqueryOnClick('#btn-save-new-frase', function (e) {
            e.preventDefault();
            Helper.jqueryShowAjaxLoading();
            FraseController.store('frm-new-frase', 'div-ajax-response');
        });

        Helper.jqueryOnClick('#a-reload-listado-frases', function (e) {
            e.preventDefault();
            App.fillListadoFrases();
        });



        Helper.jqueryMobileOnPageShow('#page-listado-frases', function (e) {
            e.preventDefault();
            App.fillListadoFrases();
            //App.fillListadoFrasesPaginate(1);
        });

        /*
        $(document).bind("scrollstop", function () {
            var scrollTop = $(window).scrollTop();
            var winHeight = $(window).height();
            var docHeight = $(document).height();
            var diff = docHeight - winHeight;
            var page = Helper.jqueryGetValueFromField('.next-page:last') || 1;

            if(scrollTop == diff) App.fillListadoFrasesPaginate(page);
        });
        */

    },
    onPageInit: function () {
        $.mobile.defaultPageTransition = 'none';
        Helper.jqueryHideAjaxLoading();
    },
    fillTemplatesContent: function () {
        this.fillHeaderContent();
        this.fillFooterContent();
    },
    fillHeaderContent: function () {
        Helper.jqueryFillHTMLContent('.header-content', App.templates.headerContent({title:''}));
        Helper.jqueryFillHTMLContent('.header-content#header-home', App.templates.headerContent({title:'Home'}));
        Helper.jqueryFillHTMLContent('.header-content#header-listado-frases', App.templates.headerContent({
            title:'Frases',
            html:App.templates.listadoFrasesNavbar()
        }));
        Helper.jqueryFillHTMLContent('.header-content#header-app-info', App.templates.headerContent({title:'© 2014 AppBiblioco34'}));
    },
    fillFooterContent: function () {
        Helper.jqueryFillHTMLContent('.footer-content', App.templates.footerContent());
    },
    compileTemplates: function () {
        var source;

        source = Helper.jqueryGetHTMLFromField('#div-rows-frases');
        App.templates.rowsOfFrases = Handlebars.compile(source);

        source = Helper.jqueryGetHTMLFromField('#header-content');
        App.templates.headerContent = Handlebars.compile(source);

        source = Helper.jqueryGetHTMLFromField('#footer-content');
        App.templates.footerContent = Handlebars.compile(source);

        source = Helper.jqueryGetHTMLFromField('#listado-frases-navbar');
        App.templates.listadoFrasesNavbar = Handlebars.compile(source);

    },
    fillListadoFrasesPaginate: function (lastPage) {
        Helper.jqueryShowAjaxLoading();

        Frase.getFrasesFromAPIWithPaginate(lastPage, function (response) {
            var frases = response.data;

            if(Helper.isFull(frases))
            {
                var jquerySelector = '#ul-frases-listview';
                var nextPage = parseInt(lastPage) + 1;
                var dataForTemplate = {
                    frases: frases,
                    page: nextPage
                };
                var html = App.templates.rowsOfFrases(dataForTemplate);
                Helper.jqueryAppendHTMLContent(jquerySelector, html).listview('refresh');
            }

            Helper.jqueryHideAjaxLoading();
        });
    },
    fillListadoFrases: function () {
        Helper.jqueryShowAjaxLoading();

        Frase.getFrasesFromAPI(function (response) {
            var frases = response.data;

            if(Helper.isFull(frases))
            {
                var jquerySelector = '#ul-frases-listview';
                var dataForTemplate = {
                    frases: frases
                };
                var html = App.templates.rowsOfFrases(dataForTemplate);
                Helper.jqueryFillHTMLContent(jquerySelector, html).listview('refresh');
            }

            Helper.jqueryHideAjaxLoading();
        });
    }
};