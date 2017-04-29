(function (app) {

    app.views.MyPage = app.views.View.extend({

        type: 'app.views.MyPage',

        init: function () {
            this._super();
        },

        render: function (body, params) {
            var me = this,
                level = params.level,
                nextChapter = params.nextChapter,
                finishedChapters = '';
            $.each(params.finishedChapters, function (i, chapter) {
                finishedChapters += chapter + (i !== params.finishedChapters.length - 1 ? '\n' : '');
            });
            body.html(
                '<div class="container-fluid bg-info quiz">' +
                '   <div class="modal-dialog">' +
                '       <div class="modal-content">' +
                '           <div class="modal-header">' +
                '               <button id="rules" class="btn btn-large btn-primary" type="button"  data-toggle="modal" data-target="#modalWindow">' +
                '                   Правила обучения' +
                '               </button>' +
                '               <button id="logout" class="btn btn-large btn-primary" type="button">' +
                '                   Выйти' +
                '               </button>' +
                '               <div class="modal-body">' +
                '                   <form class="form-horizontal">' +
                '                       <div class="form-group">' +
                '                           <label for="level" class="col-sm-2 control-label">Ваш уровень</label>' +
                '                           <div class="col-sm-10">' +
                '                               <div class="form-control" id="level">' + level + '</div>' +
                '                           </div>' +
                '                       </div>' +
                '                       <div class="form-group">' +
                '                           <label for="nextChapter" class="col-sm-2 control-label">Следующая глава:</label>' +
                '                           <div class="col-sm-10">' +
                '                               <textarea disabled class="form-control disabled" rows="5" id="nextChapter">' + nextChapter + '</textarea>' +
                '                           </div>' +
                '                       </div>' +
                me.createFinishedChapters(finishedChapters) +
                '                   </form>' +
                '               </div>' +
                '               <div class="modal-footer">' +
                '                   <button id="startChapter" class="btn btn-large btn-primary" type="button">' +
                '                       Начать главу' +
                '                   </button>' + '' +
                '               </div>' +
                '           </div>' +
                '       </div>' +
                me.createRules() +
                '   </div>' +
                '</div>'
            );
            $("#logout").on('click', function () {
                app.obj('Controller').onLogout();
            });
            $("#startChapter").on('click', function () {
                app.obj('Controller').onStartReadDoc();
            });
        },

        createFinishedChapters: function (finishedChapters) {
            return finishedChapters.length === 0 ? ''
                :
                ('<div class="form-group">' +
            '       <label for="nextChapter" class="col-sm-2 control-label">Оконченные главы:</label>' +
            '       <div class="col-sm-10">' +
            '           <textarea disabled class="form-control disabled" rows="5" id="level">' + finishedChapters + '</textarea>' +
            '       </div>' +
            '   </div>');
        },

        createRules: function () {
            return '' +
                '<div class="modal fade" id="modalWindow" tabindex="-1" role="dialog" aria-labelledby="modalLabel">' +
                '   <div class="modal-dialog" role="document">' +
                '       <div class="modal-content">' +
                '           <div class="modal-header">' +
                '               <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                '               <h4 class="modal-title" id="modalLabel">Правила обучения</h4>' +
                '           </div>' +
                '           <div class="modal-body">' +
                'Перед Вами система, позволяющая обучить пользователей Правилам Дорожного Движения Республики Беларусь.' +
                '<br>' +
                'На главной странице Вы можете увидеть Ваш уровень (простое число) и Вашу следующую главу (название главы, которой Вас обучают в данный момент). Также, после успешного прохождения глав Вы увидите список пройденных Вами глав. С самого начала Ваш уровень - 1-ый. ' +
                '<br>' +
                'Запомните Ваш логин, т.к. благодаря ему происходит привязка к Вашему аккаунту, т.е. к Вашему уровню и пройденным тестам.' +
                '<br>' +
                'Порядок глав подобран согласно официальной документации Правил Дорожного Движения Республики Беларусь. По прохождению всех глав Вы получаете наивысший уровень и можете начать обучение заново.' +
                '<br>' +
                'Прохождение главы заключается в следующем: Вы нажимаете на кнопку "Начать главу". После нажатия кнопки Вы увидите материал документации Вашей главы, т.е. главы, обозначенной в поле "Следующая глава" Вашей главной страницы. После внимательного изучения материала Вам необходимо пройти 2 теста. 1-й тест - случайным образом подобранные вопросы по данной главе. 2-й тест - выбранные статистическими методами вопросы, среди которых вопросы, на которых пользователи чаще всего ошибаются, и вопросы, в котором Вы совершили ощибку (если такие есть). При неправильных 2 ответах Вам покажет сообщение о том, что тест не пройден и Вам нужно будет проходит всю главу заново, повторно прочитав материала. Если 2 теста пройдены успешно, Ваш уровень повысится и Вам будет предложено перейти на Главную Страницу, где Вы можете продолжить обучение со следующей главы.' +
                '<br>' +
                'Пройти 2 главу можно только после завершения 1-ой!' +
                '<br>' +
                '<h3>Удачного пути!</h3>' +
                '           </div>' +
                '           <div class="modal-footer">' +
                '               <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>' +
                '           </div>' +
                '       </div>' +
                '   </div>' +
                '</div>';
        }
    });

})(APP);
