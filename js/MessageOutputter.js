var MessageOutputter = function(messageGenerator, messages) {
    if (!messageGenerator || !messages) {
        throw new Error('Missing one or more argument to constructor');
    }

    this.MessageGenerator = messageGenerator;
    this.MessageGenerator.setMessages(messages);
};

(function(){
    'use strict';

    MessageOutputter.prototype.doOutput = function(elementId) {
        var outputSection = document.getElementById(elementId);

        if (!outputSection) {
            throw new Error('No element found with ID of ' + elementId);
        }

        outputSection.innerHTML = this.MessageGenerator.getRandomMessage();
    };

}());
