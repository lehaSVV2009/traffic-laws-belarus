(function (app) {

    app.models.Question = app.models.Model.extend({

        type: 'app.models.Question',

        fields: [
            'id',
            'chapterId',
            'title',
            'variants',
            'correct'
        ],

        init: function (data) {
            this._super(data);
        }

    });

})(APP);