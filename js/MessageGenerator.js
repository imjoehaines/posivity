var MessageGenerator = function() {};

(function(){
    'use strict';

    MessageGenerator.prototype.setMessages = function(messages) {
        if (!Array.isArray(messages)) {
            throw new Error('Messages must be an array');
        }

        this.messages = messages;
    };

    MessageGenerator.prototype.getMessages = function() {
        if (!this.messages) {
            throw new Error('Messages has not been set yet');
        }

        return this.messages;
    };

    MessageGenerator.prototype.getRandomMessage = function() {
        if (!this.messages) {
            throw new Error('Messages has not been set yet');
        }

        var randomIndex = Math.floor(Math.random() * this.messages.length);

        return this.messages[randomIndex];
    };

}());
