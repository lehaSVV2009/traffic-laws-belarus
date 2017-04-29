(function (app) {

    app.stores.Users = app.stores.Store.extend({

        init: function () {
            this.model = app.models.User;
            this._super();
        }

    });

})(APP);