var MessageOutputter = function(messageGenerator, messages) {
    if (!messageGenerator || !messages) {
        throw new Error('Missing one or more argument to constructor');
    }

    this.MessageGenerator = messageGenerator;
    this.MessageGenerator.setMessages(messages);
};

(function(){
    'use strict';

    MessageOutputter.prototype.getOutput = function() {
        var message = this.MessageGenerator.getRandomMessage();
        var htmlString = '<h2>' + message + '</h2>';

        return htmlString;
    };

    MessageOutputter.prototype.doOutput = function(elementId) {
        var outputSection = document.getElementById(elementId);

        if (!outputSection) {
            throw new Error('No element found with ID of ' + elementId);
        }

        var htmlString = this.getOutput();

        outputSection.innerHTML = htmlString;
    };

}());
