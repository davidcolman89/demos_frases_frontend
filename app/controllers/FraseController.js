/**
 * Created by david on 28/10/14.
 */
var FraseController = {
    frase: Frase,
    store: function (idForm, idDivAjaxResponse) {
        var dataFormSerialized = Helper.jqueryGetDataFormSerialized('#' + idForm);

        this.frase.setIdDivAjaxResponse(idDivAjaxResponse)
            .setIdForm(idForm)
            .setDataStore(dataFormSerialized);

        this.frase.save(this.saveFraseDone, this.saveFraseFail);
    },
    saveFraseDone: function (data) {
        var selectorDiv, selectorForm;

        selectorForm = '#' + FraseController.frase.getIdForm();
        selectorDiv = '#' + FraseController.frase.getIdDivAjaxResponse();

        Helper.jqueryHideAjaxLoading();
        Helper.jqueryResetForm(selectorForm);
        Helper.jqueryClearHTMLContent(selectorDiv);
        Helper.jqueryFillHTMLContent(selectorDiv,data.message)
            .fadeOut(500)
            .fadeIn(500)
            .fadeOut(500);

    },
    saveFraseFail: function (jqXHR) {
        var messages = jqXHR.responseJSON.error.message;
        var textErrors = Helper.jqueryGetErrorsByMessagesObject(messages);
        var html = textErrors.join('<br/>');
        var jquerySelector = '#' + FraseController.frase.getIdDivAjaxResponse();

        Helper.jqueryHideAjaxLoading();
        Helper.jqueryFillHTMLContent(jquerySelector, html)
            .fadeOut(500)
            .fadeIn(500)
            .fadeOut(500)
            .fadeIn(500);
    }
};