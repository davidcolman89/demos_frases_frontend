/**
 * Created by david on 27/10/14.
 */
var App = {
    initialize: function () {
        this.initializeTemplates();
        this.compileTemplates();
        this.fillTemplatesContent();
        this.bindEvents();
    },
    initializeTemplates: function () {
        App.templates = {
            rowsOfFrases: "",
            headerContent: "",
            footerContent: ""
        };
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

        Helper.jqueryMobileOnPageShow('#page-listado-frases', function (e) {
            e.preventDefault();

        });

        $(document).scroll(function () {});

        $(document).bind("scrollstop",function(){
            var scrollTop = $(window).scrollTop();
            var winHeight = $(window).height();
            var docHeight = $(document).height();
            var diff = docHeight - winHeight;
            var page = $('.next-page:last').val() || 1;
            if(scrollTop == diff) {
                App.fillListadoFrases(page);
            }
        });
    },
    onPageInit: function () {
        $.mobile.defaultPageTransition = 'none';
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

        source = Helper.jqueryGetHTMLFromField('#div-rows-frases');
        App.templates.rowsOfFrases = Handlebars.compile(source);

        source = Helper.jqueryGetHTMLFromField('#header-content');
        App.templates.headerContent = Handlebars.compile(source);

        source = Helper.jqueryGetHTMLFromField('#footer-content');
        App.templates.footerContent = Handlebars.compile(source);
    },
    fillListadoFrases: function (page) {

        Helper.jqueryShowAjaxLoading();
        Frase.getFrasesFromAPIWithPaginate(page, function (response) {
            var frases = response.data;

            if(!empty(frases))
            {
                var jquerySelector = '#div-listado-frases';

                //if(frases.length == Frase.limitOfPaginate) var nextPage = parseInt(page) + 1;
                var nextPage = parseInt(page) + 1;

                var html = App.templates.rowsOfFrases({
                    frases: frases,
                    page: nextPage
                });

                Helper.jqueryAppendHTMLContent(jquerySelector, html);
            }

            Helper.jqueryHideAjaxLoading();
        });
    }
};