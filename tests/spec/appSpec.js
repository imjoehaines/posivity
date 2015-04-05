describe('app', function() {
    var element;
    var body;

    beforeEach(function() {
        element = document.createElement('section');
        element.setAttribute('id', 'message-output');
        element.style.display = 'none';

        body = document.getElementsByTagName('body')[0];
        body.appendChild(element);
    });

    afterEach(function() {
        element.parentNode.removeChild(element);
    });

    describe('initialise', function() {
        it('should output a list from an ajax call', function(done) {
            var expectedMessages = [
                'test toast teest',
                'test tist teest',
                'test tost teest',
                'test torst teest',
                'test trost teest'
            ];

            app.initialise('/tests/spec/test.json');

            // small timeout to wait for ajax
            // TODO: use jasmine-ajax to mock ajax call so this isn't needed
            setTimeout(function() {
                expect(element.innerHTML).toBeInArray(expectedMessages);
                done();
            }, 25);
        });

        xit('should fallback to a predefined list if ajax fails', function(done) {
            // TODO: use jasmine-ajax to allow ajax call to fail
        });
    });

    describe('output functions', function() {
        describe('outputRandomImage', function() {
            it('should set the style of the body tag', function() {
                var styleRegex = /background: url\([\S]+[0-9]*.jpg\) 50% 50% \/ cover no-repeat fixed/;

                app.outputRandomImage();

                expect($l.dom.attr(body, 'style')).toMatch(styleRegex);
            });
        });

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