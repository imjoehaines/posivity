var MessageList = function() {
    this.setPredefinedList();
};

(function(){
    'use strict';

    MessageList.prototype.setList = function(list) {
        if (!Array.isArray(list) || list.length === 0) {
            throw new Error('A new list must be a non-empty array');
        }

        this.list = list;
    };

    MessageList.prototype.getList = function() {
        return this.list;
    };

    MessageList.prototype.setPredefinedList = function() {
        this.setList([
            'The fire edits the puny land',
            'The salt widens the thick reward',
            'The family applys the father',
            'The comfort discusss the paste',
            'When does the run conduct the premium lift?',
            'Why does the representative check out the tremendous sleep?',
            'When does the cry investigate the plant feeling?',
            'The violent daughter creates the hope',
            'The week recognizes the base',
            'The paste boosts the copy',
            'The laugh motivates the join',
            'The father copys the delicate level'
        ]);
    };

}());
