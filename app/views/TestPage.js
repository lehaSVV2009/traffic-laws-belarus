(function (app) {

    app.views.TestPage = app.views.View.extend({

        type: 'app.views.TestPage',

        init: function () {
            this._super();
        },

        questionId: 0,

        render: function (body, params) {
            var me = this,
                questionId = params.index,
                title = params.title,
                variants = params.variants,
                answers = params.answers;
            me.questionId = params.index;
            body.html(
                '<div class="container-fluid bg-info quiz">' +
                '   <div class="modal-dialog">' +
                '       <div class="modal-content">' +
                '           <div class="modal-header question">' +
                me.createQuestion(questionId, title) +
                '           </div>' +
                '           <div class="modal-body">' +
                '               <div class="variants" data-toggle="buttons">' +
                me.createVariants(variants) +
                '               </div>' +
                '           </div>' +
                '       </div>' +
                '       <div class="modal-footer">' +
                '           <div class="answers btn-group">' +
                me.createAnswers(questionId, answers) +
                '           </div>' +
                '       </div>' +
                '   </div>' +
                '</div>'
            );
            for (var i = 0; i < variants.length; ++i) {
                (function () {
                    $('#variant' + i).on('click', function () {
                        var answer = $(this).find('input:hidden').val();
                        app.obj('Controller').onSelectVariant(me.questionId, answer);
                    });
                })();
            }
        },

        createQuestion: function (questionId, title) {
            return '<h4><span class="label label-warning" id="questionId">' + (questionId + 1)+ '</span> ' + title + '</h4>';
        },

        createVariants: function (variants) {
            var result = '';
            $.each(variants, function (i, variant) {
                result +=
                    '<label class="btn btn-primary btn-block element-animation" id="variant' + i + '">' +
                    '   <span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span>' +
                    '   <input type="hidden" name="answer" value="' + i + '">' +
                        variant +
                    '</label>';
            });
            return result;
        },

        createAnswers: function (questionId, answers) {
            var me = this,
                result = '';
            for (var key in answers) {
                var answer = answers[key],
                    key = parseInt(key),
                    answerClass = me.getAnswerButtonClass(key, answer, questionId);
                result += ('<label class="btn-sm ' + answerClass + '">' + (key + 1) + '</label>');
            }
            return result;
        },

        getAnswerButtonClass: function (questionNumber, answer, currentQuestionNumber) {
            return questionNumber === currentQuestionNumber ? 'btn-warning' :
                answer === 0 ? 'btn-danger' :
                    answer === 1 ? 'btn-success' : 'btn-default';
        }

    });

})(APP);