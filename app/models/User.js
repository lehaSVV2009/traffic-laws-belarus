(function (app) {

    app.models.User = app.models.Model.extend({

        type: 'app.models.User',

        fields: [
            'username',
            'level',
            'finishedChapters',
            'nextChapter',
            'wrongAnswers'
        ],

        init: function (data) {
            this.idProperty = 'username';
            this._super(data);
        }

    });

})(APP);