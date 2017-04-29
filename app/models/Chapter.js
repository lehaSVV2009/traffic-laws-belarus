(function (app) {

    app.models.Chapter = app.models.Model.extend({

        type: 'app.models.Chapter',

        fields: [
            'id',
            'title',
            'text'
        ],

        init: function (data) {
            this._super(data);
        }

    });

})(APP);