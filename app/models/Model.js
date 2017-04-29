(function (app) {

    app.models.Model = Class.extend({

        type: 'app.models.Model',

        idProperty: 'id',

        data: {},

        init: function (data) {
            this.data = data;
        },

        get: function (name) {
            return this.data[name];
        },

        set: function (name, value) {
            this.data[name] = value;
        }
    });

})(APP);