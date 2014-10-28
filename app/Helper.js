/**
 * Created by david on 28/10/14.
 */
var Helper = {
    jqueryEventClick: function (jquerySelector, callback) {
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
        $.mobile.loading('show');
    },
    jqueryHideAjaxLoading: function () {
        $.mobile.loading('hide');
    }
};