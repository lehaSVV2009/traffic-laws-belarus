// cheat: $('input:hidden')[APP.test.getCurrentQuestion().get('correct')].click()
var APP = {

    models: {},
    stores: {},
    views: {},
    controllers: {},
    util: {},

    context: {},

    user: null,
    test: null,

    init: function () {
        var me = this;
        me._initContexts();
        me._loadStores();
    },

    _initContexts: function () {
        var me = this;
        me._initContext(me.stores);
        me._initContext(me.views);
        me._initContext(me.controllers);
    },

    _initContext: function (classes) {
        var context = this.context,
            obj;
        $.each(classes, function (cls) {
            obj = new classes[cls]();
            context[cls] = obj;
        });
    },

    _loadStores: function () {
        var me = this,
            storeClasses = me.stores,
            context = me.context;
        $.each(storeClasses, function (cls) {
            context[cls].load();
        });
    },

    obj: function (name) {
        return this.context[name];
    }
};

$(function () {
    APP.init();
});