var MessageList = function() {};

(function(){
    'use strict';

    /**
     * Sets the list
     * @param {array} list    An array of messages to set as the list
     * @param {string} prefix A string to prepend to each list item
     * @param {string} suffix A string to append to each list item
     */
    MessageList.prototype.setList = function(list, prefix, suffix) {
        if (!Array.isArray(list) || list.length === 0) {
            throw new Error('A new list must be a non-empty array');
        }

        prefix = prefix || '';
        suffix = suffix || '';

        // add the prefix & suffix to each list item
        $l.aeach(list, function(index, value) {
            list[index] = prefix + value + suffix;
        });

        this.list = list;

        // allow method chaining
        return this;
    };

    /**
     * Gets the currently set list
     * @return {array} An array of messages
     */
    MessageList.prototype.getList = function() {
        return this.list;
    };

    /**
     * Sets a predefined list in cases where the ajax call fails
     */
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

        return this;
    };

}());
