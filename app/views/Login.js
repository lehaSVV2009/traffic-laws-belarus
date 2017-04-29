(function (app) {

    app.views.Login = app.views.View.extend({

        type: 'app.views.Login',

        init: function () {
            this._super();
        },

        render: function (body, params) {
            body.html(
                '<div class="jumbotron vertical-center login">' +
                '   <div class="container">' +
                '       <div class="text-center">' +
                '           <form class="form-inline" role="form">' +
                '               <div class="form-group">' +
                '                   <label for="username"><h4>Логин:</h4></label>' +
                '                   <input type="text" class="form-control" id="username">' +
                '               </div>' +
                '               <button id="login" class="btn btn-large btn-primary" type="button">' +
                '                   Войти' +
                '               </button>' +
                '           </form>' +
                '       </div>' +
                '   </div>' +
                '</div>');
            $("#login").on('click', function () {
                var username = $("#username").val();
                app.obj('Controller').onLogin(username);
            });

        }
    });

})(APP);