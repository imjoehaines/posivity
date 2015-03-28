var MessageGenerator = function() {};

(function(){
    'use strict';

    MessageGenerator.prototype.setMessages = function(messages) {
        if (!Array.isArray(messages) || messages.length === 0) {
            throw new Error('Messages must be a non-empty array');
        }

        this.messages = messages;
    };

    MessageGenerator.prototype.checkMessagesIsSet = function() {
        if (!this.messages) {
            throw new Error('Messages has not been set yet');
        }
    };

    MessageGenerator.prototype.getMessages = function() {
        this.checkMessagesIsSet();

        return this.messages;
    };

    MessageGenerator.prototype.getRandomIndex = function(maxValue) {
        if (typeof maxValue !== 'number') {
            throw new Error('maxValue must be a number');
        }

        return Math.floor(Math.random() * maxValue);
    };

    MessageGenerator.prototype.getRandomMessage = function() {
        this.checkMessagesIsSet();

        var randomIndex = this.getRandomIndex(this.messages.length);

        return this.messages[randomIndex];
    };

}());
