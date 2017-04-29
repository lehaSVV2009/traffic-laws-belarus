(function (app) {

    app.stores.Questions = app.stores.Store.extend({

        init: function () {
            this.model = app.models.Question;
            this._super();
        },

        load: function () {
            this._super('json/questions.json');
        },

        filterByChapter: function (chapterId) {
            var me = this,
                records = me.getRecords(),
                filteredRecords = [];
            $.each(records, function (i, record) {
                if (record.get('chapterId') === chapterId) {
                    filteredRecords.push(record);
                }
            });
            return filteredRecords;
        },

        getRandomQuestions: function (chapterId, count, alreadyInTest) {
            var me = this;
            return me.getRandomQuestionsFrom(me.filterByChapter(chapterId), chapterId, count, alreadyInTest);
        },

        getRandomQuestionsFrom : function (records, chapterId, count, alreadyInTest) {
            if (records.length === 0 || count === 0) {
                return [];
            }
            var me = this,
                questions = [],
                question;
            for (var i = 0; i < count; ++i) {
                question = me.getRandomQuestion(records.length, records, alreadyInTest);
                if (question) {
                    questions.push(question);
                    alreadyInTest.push(question.get('id'));
                }
            }
            return questions;
        },

        getRandomTest: function (chapterId, count) {
            var me = this;
            return new app.models.Test({
                questionId: 0,
                questions: me.getRandomQuestions(chapterId, count, []),
                answers: me.getDefaultAnswers(count),
                specific: false
            });
        },

        getDefaultAnswers: function (count) {
            var answers = {};
            for (var i = 0; i < count; ++i) {
                answers[i] = 2;
            }
            return answers;
        },

        getRandomQuestion: function (length, records, alreadyInArray) {
            if (length > records.length) {
                length = records.length;
            }
            var me = this,
                question = records[me.randomInt(length)],
                maxCycle = 15;
            while (alreadyInArray.indexOf(question.get('id')) !== -1 && maxCycle !== 0) {
                question = records[me.randomInt(length)];
                --maxCycle;
            }
            if (maxCycle === 0) {
                return null;
            }
            return question;
        },

        randomInt: function (firstAfterMax) {
            return Math.floor((Math.random() * firstAfterMax));
        }
    });

})(APP);