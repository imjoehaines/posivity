describe('MessageGenerator', function() {
    var messageGenerator;

    beforeEach(function() {
        messageGenerator = new MessageGenerator();
    });

    describe('set & get messages', function() {
        it('should allow messages to be set and fetched', function() {
            var messages = ['some', 'test', 'messages'];

            messageGenerator.setMessages(messages);

            expect(messageGenerator.getMessages()).toEqual(messages);
        });

        it('should throw an error if messages isn\'t an array', function() {
            var messages = 'some broken messages';

            // anonymous function so setMessages() isn't executed directly
            expect(function() {
                    messageGenerator.setMessages(messages);
            }).toThrow(new Error('Messages must be an array'));
        });

        it('should throw an error is messages are fetched before being set', function () {
            expect(function() {
                messageGenerator.getMessages();
            }).toThrow(new Error('Messages has not been set yet'));
        });
    });

    describe('getRandomMessage', function() {
        it('should return a random message when getRandomMessage is called', function() {
            var messages = ['some', 'test', 'messages'];

            messageGenerator.setMessages(messages);

            expect(messageGenerator.getRandomMessage()).toBeInArray(messages);
        });

        it('should throw an error when a random message is fetched before messages is set', function() {
            expect(function() {
                messageGenerator.getRandomMessage();
            }).toThrow(new Error('Messages has not been set yet'));
        });
    });
 
});
