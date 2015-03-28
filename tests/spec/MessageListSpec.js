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

});
