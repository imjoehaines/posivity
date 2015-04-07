var app = {
    /**
     * Function called on page load to output a message and set page background
     * @param {string}  Path to a JSON file
     * @param {integer} numberOfImages The number of possible background images
     */
    initialise: function(jsonFile, numberOfImages) {
        // only need to check numberOfImages as json has a fallback
        if (!numberOfImages) {
            throw new Error('Can\'t output an image without a maximum number');
        }

        app.outputRandomImage(numberOfImages);

        // ajax call - json file, query string, success callback, failure callback
        $l.ajax.getJson(
            jsonFile,
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
     * Sets a random image as the background of the body tag
     * @param {integer} numberOfImages The number of possible background images 
     */
    outputRandomImage: function(numberOfImages) {
        if (!numberOfImages) {
            throw new Error('Can\'t output an image without a maximum number');
        }

        var imageNumber = $l.helpers.random(1, numberOfImages);

        $l.css.setProperty(
            $l('body'), {
                'background': 'url(\'img/' + imageNumber + '.jpg\') no-repeat center center fixed',
                '-webkit-background-size': 'cover',
                '-moz-background-size': 'cover',
                '-o-background-size': 'cover',
                'background-size': 'cover',
            }
         );
    },

    /**
     * Outputs a message from a JSON object
     * @param {object} response An object returned from ajax call
     */
    outputFromJsonList: function(response) {
        var listIndex = $l.helpers.random(0, response.possibleLists.length - 1);
        var listType = response.possibleLists[listIndex];
        var list = response[listType];

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