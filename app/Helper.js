/**
 * Created by david on 28/10/14.
 */
var Helper = {
    isEmpty:function (value) {
        return empty(value);
    },
    isFull:function (value) {
        return !this.isEmpty(value);
    },
    isAccessedByMobile: function () {
        return document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
    },
    jqueryOnClick: function (jquerySelector, callback) {
        return $(jquerySelector).click(callback);
    },
    jqueryGetJSON: function (url, callback) {
        return $.getJSON(url).done(callback);
    },
    jqueryPostJSON: function (url, data, callback, callbackFail) {
        return $.post(url, data).done(callback).fail(callbackFail);
    },
    jqueryResetForm: function (jquerySelector) {
        return $(jquerySelector).each(function () {
            this.reset();
        });
    },
    jqueryGetDataFormSerialized: function (jquerySelector) {
        return $(jquerySelector).serialize();
    },
    jqueryGetErrorsByMessagesObject: function (messages) {
        var arrayWithTextErrors = [];
        $.each(messages, function (index, message) {
            $.each(message, function (index2, text) {
                arrayWithTextErrors.push(text);
            });
        });
        return arrayWithTextErrors;
    },
    jqueryFillHTMLContent: function (jquerySelector, html) {
        return $(jquerySelector).html(html);
    },
    jqueryAppendHTMLContent: function (jquerySelector, html) {
        return $(jquerySelector).append(html);
    },
    jqueryClearValueContent: function (jquerySelector) {
        return $(jquerySelector).val('');
    },
    jqueryClearHTMLContent: function (jquerySelector) {
        return $(jquerySelector).html('');
    },
    jqueryMobileOnPageShow:function (page, callback) {
        return $(document).on("pageshow", page, callback);
    },
    jqueryShowAjaxLoading: function () {
        return $.mobile.loading('show');
    },
    jqueryHideAjaxLoading: function () {
        return $.mobile.loading('hide');
    },
    jqueryMobileOnPageInit: function (callback) {
        return $(document).bind('pageinit',callback);
    },
    jqueryMobileChangePage: function (pageSelector, options) {
        return $(":mobile-pagecontainer").pagecontainer("change", pageSelector, options);
    },
    jqueryGetHTMLFromField: function (jquerySelector) {
        return $(jquerySelector).html();
    },
    jqueryGetValueFromField: function (jquerySelector) {
        return $(jquerySelector).val();
    }
};