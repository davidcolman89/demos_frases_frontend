/**
 * Created by david on 28/10/14.
 */
var Helper = {
    jqueryEventClick: function (idField, callback) {
        return $("#" + idField).click(callback);
    },
    jqueryGetJSON: function (url, callback) {
        return $.getJSON(url).done(callback);
    },
    jqueryPostJSON: function (url, data, callback, callbackFail) {
        return $.post(url, data).done(callback).fail(callbackFail);
    },
    jqueryResetForm: function (idForm) {
        return $('#' + idForm).each(function () { this.reset();});
    },
    jqueryGetDataFormSerialized: function (idForm) {
        return $('#' + idForm).serialize();
    },
    jqueryGetErrorsByMessagesObject: function (messages) {
        var arrayWithTextErrors = [];
        $.each(messages, function (index, message) {
            $.each(message, function (index2,text) {
                arrayWithTextErrors.push(text);
            });
        });
        return arrayWithTextErrors;
    },
    jqueryFillHTMLContent: function (idField, html) {
        return $('#' + idField).html(html);
    }
};