(function (app) {

    app.views.SimpleTestCompleted = app.views.View.extend({

        type: 'app.views.SimpleTestCompleted',

        init: function () {
            this._super();
        },

        render: function (body, params) {
            var me = this,
                answers = params.answers;
            body.html(
                me.createCenteredInfoPanel(
                    me.createCongratulations("Поздравляем!", "Вы прошли первый этап теста!") +
                    me.createAnswers(-1, answers) +
                '<br/>' +
                '<div><h3> Теперь Вам нужно пройти тест с наиболее часто встречающимися ошибками. </h3></div>' +
                '<br/>' +
                    me.createButton("startSpecTest", "Начать специальный тест")
                )
            );
            $("#startSpecTest").on('click', function () {
                app.obj('Controller').onStartSpecialTest();
            });

        },

        createCongratulations: function (message, desc) {
            return '<span class="congratulations"><h2>' + message + '<br/>' + desc + '</h2></span>'
        },

        createButton: function (id, text) {
            return '<button id="' + id + '" class="btn btn-large btn-primary" type="button">' + text + '</button>';
        },

        createAnswers: function (questionId, answers) {
            return '<br/>' +
                'Ваши ответы:' +
                '<br/>' +
                '<div class="answers btn-group">' +
                    app.obj('TestPage').createAnswers(questionId, answers) +
                '</div>' +
                '<br/>';
        },

        createCenteredInfoPanel: function (inner) {
            return '<div class="jumbotron vertical-center"><div class="container"><div class="text-center">' + inner + '</div></div></div>';
        }


    });

})(APP);