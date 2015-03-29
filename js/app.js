var app = {
    /**
     * Function called on page load to output a message
     */
    initialise: function() {
        // ajax call - json file, query string, success callback, failure callback
        $l.ajax.getJson(
            'lists.json',
            null,
            function(response) {
                try {
                    app.outputFromJsonList(response);
                } catch (e) {
                    app.outputFromPredefinedList();
                }
            },
            function(response) {
                app.outputFromPredefinedList();
            }
        );
    },

    /**
     * Outputs a message from a JSON object
     * @param  {object} response An object returned from ajax call
     */
    outputFromJsonList: function(response) {
        var listIndex = $l.helpers.random(0, response.possibleLists.length - 1);
        var listType = response.possibleLists[listIndex];
        var list = response[listType];
        var messages = list.messages;

        var messageOutputter = new MessageOutputter(
            new MessageGenerator(),
            new MessageList()
                .setList(list.messages, list.prefix, list.suffix)
                .getList()
        );

        messageOutputter.doOutput('message-output');
    },

    /**
     * Outputs a message from predefined list in cases where the ajax call fails
     */
    outputFromPredefinedList: function() {
        var messageOutputter = new MessageOutputter(
            new MessageGenerator(),
            new MessageList().setPredefinedList().getList()
        );

        messageOutputter.doOutput('message-output');
    }
};