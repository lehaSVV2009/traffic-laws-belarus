(function (app) {

    app.views.Docs = app.views.View.extend({

        type: 'app.views.Docs',

        init: function () {
            this._super();
        },

        render: function (body, params) {
            var title = params.title,
                text = params.text;
            body.html(
                '<div class="container-fluid bg-info">' +
                '   <div class="modal-dialog">' +
                '       <div class="modal-content">' +
                '           <div class="modal-header">' +
                title +
                '               <div class="modal-body">' +
                text +
                '               </div>' +
                '               <div class="modal-footer">' +
                '                   <button id="startTest" class="btn btn-large btn-primary" type="button">' +
                '                       Начать тест' +
                '                   </button>' +
                '               </div>' +
                '           </div>' +
                '       </div>' +
                '   </div>' +
                '</div>'
            );
            $("#startTest").on('click', function () {
                app.obj('Controller').onStartSimpleTest();
            });
        }
    });

})(APP);