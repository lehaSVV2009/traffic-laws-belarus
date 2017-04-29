(function (app) {

    app.controllers.Controller = Class.extend({

        type: 'app.controllers.Controller',

        init: function () {
            var me = this;
            me.clearWindow();
            me.showLoginPage();
        },

        clearWindow: function () {
            $(document.body).html('');
        },

        showLoginPage: function () {
            app.obj('Login').render($(document.body));
        },

        onLogin: function (username) {
            if (!(username && /^[А-Яа-яA-Za-z0-9_]{1,20}$/.test(username))) {
                alert('Плохой логин :-)');
                return;
            }
            $('.login').fadeOut(500);
            var me = this,
                users = app.obj('Users'),
                user = users.findById(username);
            if (!user) {
                user = users.create({
                    username: username,
                    level: 1,
                    finishedChapters: [],
                    nextChapter: 1,
                    wrongAnswers: []
                });
            }
            app.user = user;
            me.showStartPage();
            if (app.user.get('level') === 1) {
                $('#rules').click();
            }
        },

        showStartPage: function () {
            app.obj('MyPage').render($(document.body), {
                level: app.user.get('level'),
                nextChapter: app.obj('Chapters').getTitle(app.user.get('nextChapter')),
                finishedChapters: app.obj('Chapters').getTitles(app.user.get('finishedChapters'))
            });
        },

        onLogout: function () {
            var me = this;
            app.user = null;
            me.clearWindow();
            me.showLoginPage();
        },

        onStartReadDoc: function () {
            var me = this;
            me.clearWindow();
            me.showDocs();
        },

        showDocs: function () {
            var chapter = app.obj('Chapters').findById(app.user.get('nextChapter'));

            app.obj('Docs').render($(document.body), {
                title: chapter.get('title'),
                text: chapter.get('text')
            });
        },

        onStartSimpleTest: function () {
            var me = this,
                chapterId = app.user.get('nextChapter');
            app.test = app.obj('Questions').getRandomTest(chapterId, 10);
            me.showTestPage();
        },

        showTestPage: function () {
            var question = app.test.getCurrentQuestion();
            app.obj('TestPage').render($(document.body), {
                index: app.test.get('questionId'),
                title: question.get('name'),
                variants: question.get('variants'),
                answers: app.test.get('answers')
            });
        },

        onSelectVariant: function (questionId, answer) {
            var me = this,
                question = app.test.getCurrentQuestion(),
                correct = parseInt(answer) === question.get('correct');
            me.updateAnswers(questionId, correct);
            if (!correct) {
                app.obj('WrongAnswers').addRecord(question);
                app.user.get('wrongAnswers').push(question);
            }
            if (me.containsTwoFails(app.test.get('answers'))) {
                me.onFailedTest();
            } else if (app.test.isLast(questionId)) {
                app.test.set('questionId', questionId + 1);
                me.onFinishTest();
            } else {
                app.test.set('questionId', questionId + 1);
                me.onNextQuestion();
            }
        },

        updateAnswers: function (questionId, correct) {
            var oldAnswers = app.test.get('answers');
            oldAnswers[questionId] = correct ? 1 : 0;
            app.test.set('answers', oldAnswers);
        },

        containsTwoFails: function (answers) {
            var count = 0, key;
            for (key in answers) {
                if (answers[key] === 0) {
                    ++count;
                }
                if (count === 2) {
                    return true;
                }
            }
            return false;
        },

        onNextQuestion: function () {
            this.showTestPage();
        },

        onFailedTest: function () {
            app.obj('TestFailed').render($(document.body), {
                answers: app.test.get('answers')
            });
        },

        onFinishTest: function () {
            var me = this;
            app.test.get('specific') ? me.onFinishSpecificTest()
                                    : me.onFinishSimpleTest();
        },

        onStartSpecialTest: function () {
            var me = this,
                questions,
                chapterId = app.user.get('nextChapter'),
                yourFailsCount = 1,
                commonFailsCount = 5,
                count = 10,
                alreadyInTest = [];
            var myWrongAnswers = app.user.get('wrongAnswers').filter(function (question) {
                return question.get('chapterId') === chapterId;
            });
            questions = (app.obj('Questions').getRandomQuestionsFrom(myWrongAnswers, chapterId, yourFailsCount, alreadyInTest));
            questions = questions.concat(app.obj('WrongAnswers').getRandomQuestions(chapterId, commonFailsCount, alreadyInTest));
            questions = questions.concat(app.obj('Questions').getRandomQuestions(chapterId, count - questions.length, alreadyInTest));

            app.test = new app.models.Test({
                questionId: 0,
                questions: questions,
                answers: app.obj('Questions').getDefaultAnswers(count),
                specific: true
            });
            me.showTestPage();
        },

        onFinishSimpleTest: function () {
            app.obj('SimpleTestCompleted').render($(document.body), {
                answers: app.test.get('answers')
            });
        },

        onFinishSpecificTest: function () {
            this.upgradeUser();
            app.obj('SpecificTestCompleted').render($(document.body), {
                answers: app.test.get('answers'),
                level: app.user.get('level')
            });
        },

        upgradeUser: function () {
            var user = app.user,
                justFinishedChapter = user.get('nextChapter'),
                finishedChapters;
            user.set('level', user.get('level') + 1);
            finishedChapters = user.get('finishedChapters');
            finishedChapters.push(justFinishedChapter);
            user.set('finishedChapters', finishedChapters);
            ++justFinishedChapter;
            if (app.obj('Chapters').count() < justFinishedChapter) {
                justFinishedChapter = 1;
            }
            user.set('nextChapter', justFinishedChapter);
        }

    });

})(APP);