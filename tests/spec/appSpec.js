describe('app', function() {
    var element;

    beforeEach(function() {
        element = document.createElement('section');
        element.setAttribute('id', 'message-output');
        // element.style.display = 'none';

        var body = document.getElementsByTagName('body')[0];
        body.appendChild(element);
    });

    afterEach(function() {
        element.parentNode.removeChild(element);
    });

    describe('initialise', function() {
        // fails finding element with id 'message-output'
        xit('should output a list from an ajax call', function() {
            app.initialise('/lists.json');
            expect($l('#message-output').innerHTML).toBe('??');
        });
    });

    describe('output functions', function() {

        describe('outputFromJsonList', function() {

            it('should output from a given json response', function() {
                var exampleJson = '{"possibleLists":["test"],"test":{"prefix":"test ","messages":["toast","tist","tost","torst","trost"],"suffix":" teest"}}';

                var expectedMessages = [
                    'test toast teest',
                    'test tist teest',
                    'test tost teest',
                    'test torst teest',
                    'test trost teest'
                ];

                app.outputFromJsonList(JSON.parse(exampleJson));

                expect(element.innerHTML).toBeInArray(expectedMessages);
            });
        });

        describe('outputFromPredefinedList', function() {
            it('should output from a hardcoded list', function() {
                app.outputFromPredefinedList();

                var expectedMessages = [
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
                ];

                expect(element.innerHTML).toBeInArray(expectedMessages);
            });
        });
    });

});