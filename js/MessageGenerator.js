var MessageGenerator = function() {};

(function(){
    'use strict';

    /**
     * Sets a list of messages
     * @param {array} messages The array of messages to set
     */
    MessageGenerator.prototype.setMessages = function(messages) {
        if (!Array.isArray(messages) || messages.length === 0) {
            throw new Error('Messages must be a non-empty array');
        }

        this.messages = messages;
    };

    /**
     * Checks that a list of messages has been set
     * @throws Error
     */
    MessageGenerator.prototype.checkMessagesIsSet = function() {
        if (!this.messages) {
            throw new Error('Messages has not been set yet');
        }
    };

    /**
     * Gets the currently set messages
     * @return {array} The set messages
     */
    MessageGenerator.prototype.getMessages = function() {
        this.checkMessagesIsSet();

        return this.messages;
    };

    /**
     * Gets a random number between 0 & maxValue
     * @param  {integer} maxValue The max value that can be returned
     * @return {integer}          A random value
     */
    MessageGenerator.prototype.getRandomIndex = function(maxValue) {
        if (typeof maxValue !== 'number') {
            throw new Error('maxValue must be a number');
        }

        return Math.floor(Math.random() * maxValue);
    };

    /**
     * Gets a random message from the set list of messages
     * @return {string} An individual message
     */
    MessageGenerator.prototype.getRandomMessage = function() {
        this.checkMessagesIsSet();

        var randomIndex = this.getRandomIndex(this.messages.length);

        return this.messages[randomIndex];
    };

}());
