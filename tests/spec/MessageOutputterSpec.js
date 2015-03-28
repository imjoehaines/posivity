describe('MessageOutputter', function() {
    var messageOutputter;
    var messages = ['some', 'test', 'messages', 'for', 'testing'];
    
    beforeEach(function() {
        messageOutputter = new MessageOutputter(
            new MessageGenerator(),
            messages
        );
    });

    describe('constructor', function() {
        it('should set a MessageGenerator and some messages', function() {
            // expect message generator to be of type message generator
            expect(messageOutputter.MessageGenerator).toEqual(jasmine.any(MessageGenerator));
            expect(messageOutputter.MessageGenerator.getMessages()).toEqual(messages);
        });

        it('should throw an error when missing first argument', function() {
            expect(function() {
                new MessageOutputter(null, messages);
            }).toThrow(new Error('Missing one or more argument to constructor'));
        });

        it('should throw an error when missing second argument', function() {
            expect(function() {
                new MessageOutputter(new MessageGenerator());
            }).toThrow(new Error('Missing one or more argument to constructor'));
        });

        it('should throw an error when missing both arguments', function() {
            expect(function() {
                new MessageOutputter();
            }).toThrow(new Error('Missing one or more argument to constructor'));
        });

    });

    describe('getOutput', function() {
        it('should output a specified message surrounded by <h2> tags', function() {
            var messageOutputter = new MessageOutputter(
                new MessageGenerator(),
                ['a set message']
            );

            var output = messageOutputter.getOutput();

            expect(output).toEqual('<h2>a set message</h2>');
        });

        it('should return a random message surrounded by <h2> tags', function() {
            var output = messageOutputter.getOutput();

            expect(output).toMatch(/^(<h2>)[a-z]+(<\/h2>)$/i);

            var rawMessage = output.replace('<h2>', '');
            rawMessage = rawMessage.replace('</h2>', '');

            expect(rawMessage).toBeInArray(messages);
        });
    });

    describe('doOutput', function() {
        var fakeId;
        var element;

        beforeEach(function() {
            element = document.createElement('section');
            fakeId = 'output-here';
            element.setAttribute('id', fakeId);
            element.style.display = 'none';

            var body = document.getElementsByTagName('body')[0];
            body.appendChild(element);
        });

        it('should output a random message surrounded by <h2> tags into a given DOM element', function() {
            messageOutputter.doOutput(fakeId);

            expect(element.innerHTML).toMatch(/(<h2>)[a-z]+(<\/h2>)/i);
        });
    });
});
