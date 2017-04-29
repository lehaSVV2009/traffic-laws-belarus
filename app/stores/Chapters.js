(function (app) {

    app.stores.Chapters = app.stores.Store.extend({

        type: 'app.stores.Chapters',

        init: function () {
            this.model = app.models.Chapter;
            this._super();
        },

        load: function () {
            this._super('json/chapters.json');
        },

        getTitle: function (id) {
            var me = this,
                record = me.findById(id);
            return record ? record.get('title') : null;
        },

        getTitles: function (ids) {
            var me = this,
                titles = [],
                title;
            $.each(ids, function (i, id) {
                title = me.getTitle(id);
                if (title) {
                    titles.push(title);
                }
            });
            return titles;
        }
    });

})(APP);