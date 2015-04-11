describe('MessageList', function() {
    var messageList;

    beforeEach(function() {
        messageList = new MessageList();
    });

    describe('set & get list', function() {
        it('should allow a list to be set and fetched', function() {
            var list = ['some', 'test', 'messages'];

            messageList.setList(list);

            expect(messageList.getList()).toEqual(list);
        });

        it('should add prefixes & suffixes to a given list', function() {
            var list = ['some', 'test', 'messages'];
            var expectedList = ['a some b', 'a test b', 'a messages b'];

            messageList.setList(list, 'a ', ' b');

            expect(messageList.getList()).toEqual(expectedList);
        });

        it('should throw an error if a list isn\'t an array', function() {
            var list = { test: 'something' };

            expect(function() {
                messageList.setList(list);
            }).toThrow(new Error('A new list must be a non-empty array'));
        });

        it('should throw an error if a list is an empty array', function() {
            var list = [];

            expect(function() {
                messageList.setList(list);
            }).toThrow(new Error('A new list must be a non-empty array'));
        });
    });

    describe('set predefined list', function() {
        it('should set a predefined list', function() {
            messageList.setPredefinedList();

            expect(messageList.getList()).toEqual([
                "Stay positive",
                "Think positive",
                "Smile!",
                "Good things are going to happen!",
                "Always believe",
                "Believe in yourself!",
                "You can do anything!",
                "You're amazing!",
                "You're beautiful!",
                "You're brilliant!"
            ]);
        });
    });

});
