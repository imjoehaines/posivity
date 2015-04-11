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
            'Stay positive',
            'Think positive',
            'Smile!',
            'Good things are going to happen!',
            'Always believe',
            'Believe in yourself!',
            'You can do anything!',
            'You\'re amazing!',
            'You\'re beautiful!',
            'You\'re brilliant!'
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

            app.initialise(jsonPath, 30);

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

            app.initialise(jsonPath, 2);

            expect($l.ajax.makeRequest).toHaveBeenCalled();
            expect(element.innerHTML).toBeInArray(predefinedMessages);
        });

        it('should fallback to a predefined list if ajax fails', function() {
            spyOn($l.ajax, 'makeRequest').and.callFake(function(params) {
                params.error({
                    something: 'broke'
                });
            });

            app.initialise(jsonPath, 1);

            expect($l.ajax.makeRequest).toHaveBeenCalled();
            expect(element.innerHTML).toBeInArray(predefinedMessages);
        });

        it('should fallback to a predefined list if not given a path', function() {
            spyOn($l.ajax, 'makeRequest').and.callFake(function(params) {
                params.error({
                    something: 'broke'
                });
            });

            app.initialise(null, 10);

            expect($l.ajax.makeRequest).toHaveBeenCalled();
            expect(element.innerHTML).toBeInArray(predefinedMessages);
        });

        it('should throw an error if not given a number of images', function() {
            spyOn($l.ajax, 'makeRequest').and.callFake(function(params) {
                params.error({
                    something: 'broke'
                });
            });

            expect(function() {
                app.initialise();
            }).toThrow(new Error('Can\'t output an image without a maximum number'));
        });
    });

    describe('output functions', function() {
        describe('outputRandomImage', function() {
            it('should set the style of the body tag', function() {
                // 1st group for chrome opening SpecRunner.html, 2nd for PhantomJS
                // url isn't important but must end in img/[a number].jpg
                var styleRegex = /(background: url\([\S]+img\/[0-9]+.jpg\) 50% 50% \/ cover no-repeat fixed)|(background-image: url\([\S]+img\/[0-9]+.jpg\); background-attachment: fixed; background-origin: initial; background-clip: initial; background-color: initial; -webkit-background-size: cover; background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;)/;

                app.outputRandomImage(10);

                expect($l.dom.attr(body, 'style')).toMatch(styleRegex);
            });

            it('should set the image to 1 when passed 1', function() {
                var styleRegex = /(background: url\([\S]+img\/1.jpg\) 50% 50% \/ cover no-repeat fixed)|(background-image: url\([\S]+img\/1.jpg\); background-attachment: fixed; background-origin: initial; background-clip: initial; background-color: initial; -webkit-background-size: cover; background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;)/;

                app.outputRandomImage(1);

                expect($l.dom.attr(body, 'style')).toMatch(styleRegex);
            });

            it('should throw an error when nothing is passed', function() {
                expect(function() {
                    app.outputRandomImage();
                }).toThrow(new Error('Can\'t output an image without a maximum number'));
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
                    'Stay positive',
                    'Think positive',
                    'Smile!',
                    'Good things are going to happen!',
                    'Always believe',
                    'Believe in yourself!',
                    'You can do anything!',
                    'You\'re amazing!',
                    'You\'re beautiful!',
                    'You\'re brilliant!'
                ];

                expect(element.innerHTML).toBeInArray(expectedMessages);
            });
        });
    });

});