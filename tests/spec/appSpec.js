/*global describe, beforeEach, afterEach, it, expect, spyOn, $l, app */

describe('app', function () {
  var element
  var body
  var predefinedMessages
  var jsonPath

  beforeEach(function () {
    element = document.createElement('section')
    element.setAttribute('id', 'message-output')
    element.style.display = 'none'

    body = document.getElementsByTagName('body')[0]
    body.appendChild(element)

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
    ]

    jsonPath = '/tests/spec/test.json'

    // PhantomJS needs a relative directory but this breaks running in browser
    if (window._phantom) {
      jsonPath = 'tests/spec/test.json'
    }
  })

  afterEach(function () {
    element.parentNode.removeChild(element)
  })

  describe('initialise', function () {
    it('should output a list from an ajax call', function () {
      var expectedMessages = [
        'test toast teest',
        'test tist teest',
        'test tost teest',
        'test torst teest',
        'test trost teest'
      ]

      var exampleJson = '{"possibleLists":["test"],"test":{"prefix":"test ","messages":["toast","tist","tost","torst","trost"],"suffix":" teest"}}'

      spyOn($l.ajax, 'makeRequest').and.callFake(function (params) {
        params.success(
          JSON.parse(exampleJson)
        )
      })

      app.initialise(jsonPath)

      // check ajax call went out
      expect($l.ajax.makeRequest).toHaveBeenCalled()
      expect(element.innerHTML).toBeInArray(expectedMessages)
    })

    it('should fallback to a predefined list if an error is thrown', function () {
      spyOn($l.ajax, 'makeRequest').and.callFake(function (params) {
        params.success({
          thisWill: 'break'
        })
      })

      app.initialise(jsonPath)

      expect($l.ajax.makeRequest).toHaveBeenCalled()
      expect(element.innerHTML).toBeInArray(predefinedMessages)
    })

    it('should fallback to a predefined list if ajax fails', function () {
      spyOn($l.ajax, 'makeRequest').and.callFake(function (params) {
        params.error({
          something: 'broke'
        })
      })

      app.initialise(jsonPath)

      expect($l.ajax.makeRequest).toHaveBeenCalled()
      expect(element.innerHTML).toBeInArray(predefinedMessages)
    })

    it('should fallback to a predefined list if not given a path', function () {
      spyOn($l.ajax, 'makeRequest').and.callFake(function (params) {
        params.error({
          something: 'broke'
        })
      })

      app.initialise(null)

      expect($l.ajax.makeRequest).toHaveBeenCalled()
      expect(element.innerHTML).toBeInArray(predefinedMessages)
    })
  })

  describe('output functions', function () {
    describe('outputFromJsonList', function () {
      it('should output from a given json response', function () {
        var exampleJson = '{"possibleLists":["test"],"test":{"prefix":"test ","messages":["toast","tist","tost","torst","trost"],"suffix":" teest"}}'

        var expectedMessages = [
          'test toast teest',
          'test tist teest',
          'test tost teest',
          'test torst teest',
          'test trost teest'
        ]

        app.outputFromJsonList(JSON.parse(exampleJson))

        expect(element.innerHTML).toBeInArray(expectedMessages)
      })
    })

    describe('outputFromPredefinedList', function () {
      it('should output from a hardcoded list', function () {
        app.outputFromPredefinedList()

        var expectedMessages = [
          'Stay positive',
          'Think positive',
          'Smile!',
          'Good things are going to happen!',
          'Always believe',
          'Believe in yourself!',
          'You can do anything!',
          "You're amazing!",
          "You're beautiful!",
          "You're brilliant!"
        ]

        expect(element.innerHTML).toBeInArray(expectedMessages)
      })
    })
  })
})
