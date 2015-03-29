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
                'The fire edits the puny land',
                'The salt widens the thick reward',
                'The family applys the father',
                'The comfort discusss the paste',
                'When does the run conduct the premium lift?',
                'Why does the representative check out the tremendous sleep?',
                'When does the cry investigate the plant feeling?',
                'The violent daughter creates the hope',
                'The week recognizes the base',
                'The paste boosts the copy',
                'The laugh motivates the join',
                'The father copys the delicate level'
            ]);
        });
    });

});
