(function (app) {

    app.models.Test = app.models.Model.extend({

        type: 'app.models.Test',

        fields: [
            'questions',
            'answers',
            'questionId',
            'specific'
        ],

        init: function (data) {
            this._super(data);
        },

        getCurrentQuestion: function () {
            var me = this;
            return me.get('questions')[me.get('questionId')];
        },

        isLast: function (questionId) {
            var me = this;
            return me.get('questions').length - 1 === questionId;
        }

    });

})(APP);