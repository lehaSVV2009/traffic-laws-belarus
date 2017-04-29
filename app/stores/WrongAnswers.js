(function (app) {

    app.stores.WrongAnswers = app.stores.Questions.extend({

        init: function () {
            this.model = app.models.Question;
            this._super();
        },

        load: function () {

        }

    });

})(APP);