describe('app', function() {
    var element;
    var body;
    var predefinedMessages;
    var jsonPath;

    beforeEach(function() {
        element = document.createElement('section');
        element.setAttribute('id', 'message-output');
        element.style.display = 'none';

        body = document.getElementsByTagName('body')[0];
        body.appendChild(element);

        predefinedMessages = [
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

        jsonPath = '/tests/spec/test.json';

        // PhantomJS needs a relative directory but this breaks running in browser
        if (window._phantom) {
            jsonPath = 'tests/spec/test.json';
        }
    });

    afterEach(function() {
        element.parentNode.removeChild(element);
    });

    describe('initialise', function() {
        it('should output a list from an ajax call', function() {
            var expectedMessages = [
                'test toast teest',
                'test tist teest',
                'test tost teest',
                'test torst teest',
                'test trost teest'
            ];

            var exampleJson = '{"possibleLists":["test"],"test":{"prefix":"test ","messages":["toast","tist","tost","torst","trost"],"suffix":" teest"}}';

            spyOn($l.ajax, 'makeRequest').and.callFake(function(params) {
                params.success(
                    JSON.parse(exampleJson)
                );
            });

            app.initialise(jsonPath);

            // check ajax call went out
            expect($l.ajax.makeRequest).toHaveBeenCalled();
            expect(element.innerHTML).toBeInArray(expectedMessages);
        });

        it('should fallback to a predefined list if an error is thrown', function() {
            spyOn($l.ajax, 'makeRequest').and.callFake(function(params) {
                params.success({
                    thisWill: 'break'
                });
            });

            app.initialise(jsonPath);

            expect($l.ajax.makeRequest).toHaveBeenCalled();
            expect(element.innerHTML).toBeInArray(predefinedMessages);
        });

        it('should fallback to a predefined list if ajax fails', function() {
            spyOn($l.ajax, 'makeRequest').and.callFake(function(params) {
                params.error({
                    something: 'broke'
                });
            });

            app.initialise(jsonPath);

            expect($l.ajax.makeRequest).toHaveBeenCalled();
            expect(element.innerHTML).toBeInArray(predefinedMessages);
        });
    });

    describe('output functions', function() {
        describe('outputRandomImage', function() {
            it('should set the style of the body tag', function() {
                // 1st group for chrome opening SpecRunner.html, 2nd for PhantomJS
                var styleRegex = /(background: url\([\S]+[0-9]*.jpg\) 50% 50% \/ cover no-repeat fixed)|(background-image: url\([\S]+[0-9]*.jpg\); background-attachment: fixed; background-origin: initial; background-clip: initial; background-color: initial; -webkit-background-size: cover; background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;)/;

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