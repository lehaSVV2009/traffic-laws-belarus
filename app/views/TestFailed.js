(function (app) {

    app.views.TestFailed = app.views.SimpleTestCompleted.extend({

        type: 'app.views.TestFailed',

        init: function () {
            this._super();
        },

        render: function (body, params) {
            var me = this,
                answers = params.answers;
            body.html(
                me.createCenteredInfoPanel(
                    me.createCongratulations("Жаль!", "Вы не прошли тест!") +
                    me.createAnswers(-1, answers) +
                    '<br/>' +
                    '<div><h3> Попробуйте снова! </h3></div>' +
                    '<br/>' +
                    me.createButton("toStartPage", "На главную страницу")
                )
            );
            $("#toStartPage").on('click', function () {
                app.obj('Controller').showStartPage();
            });
        }


    });

})(APP);