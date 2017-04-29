(function (app) {

    app.stores.Store = Class.extend({

        model: null,

        init: function (records) {
            this.records = records ? records.length !== 0 ? records : [] : [];
        },

        addRecord: function (record) {
            this.records.push(record);
        },

        load: function (url, callback) {
            var me = this,
                model = me.model,
                record;
            if (!url && !model) {
                return;
            }
            $.getJSON(url, function (response) {
                $.each(response, function (i, obj) {
                    record = new model(obj);
                    me.addRecord(record);
                });
                if (callback) {
                    callback.apply(me, response);
                }
            });
        },

        getRecords: function () {
            return this.records;
        },

        findById: function (id) {
            var me = this,
                records = me.getRecords(),
                record;
            if (records.length === 0) {
                return null;
            }
            for (var i = 0; i < records.length; ++i) {
                record = records[i];
                if (record.get(record.idProperty) === id) {
                    return record;
                }
            }
            return null;
        },

        create: function (obj) {
            var me = this,
                record = new me.model(obj);
            me.addRecord(record);
            return record;
        },

        count: function () {
            return this.records.length;
        }
    });

})(APP);