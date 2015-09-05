/*global describe, afterEach, beforeEach, it, expect, MessageOutputter, jasmine, MessageGenerator */

describe('MessageOutputter', function () {
  var messageOutputter
  var messages = ['some', 'test', 'messages', 'for', 'testing']

  beforeEach(function () {
    messageOutputter = new MessageOutputter(
      new MessageGenerator(),
      messages
    )
  })

  describe('constructor', function () {
    it('should set a MessageGenerator and some messages', function () {
      // expect message generator to be of type message generator
      expect(messageOutputter.MessageGenerator).toEqual(jasmine.any(MessageGenerator))
      expect(messageOutputter.MessageGenerator.getMessages()).toEqual(messages)
    })

    it('should throw an error when missing first argument', function () {
      expect(function () {
        new MessageOutputter(null, messages) // eslint-disable-line no-new
      }).toThrow(new Error('Missing one or more argument to constructor'))
    })

    it('should throw an error when missing second argument', function () {
      expect(function () {
        new MessageOutputter(new MessageGenerator()) // eslint-disable-line no-new
      }).toThrow(new Error('Missing one or more argument to constructor'))
    })

    it('should throw an error when missing both arguments', function () {
      expect(function () {
        new MessageOutputter() // eslint-disable-line no-new
      }).toThrow(new Error('Missing one or more argument to constructor'))
    })
  })

  describe('doOutput', function () {
    var fakeId
    var element

    beforeEach(function () {
      element = document.createElement('section')
      fakeId = 'output-here'
      element.setAttribute('id', fakeId)
      element.style.display = 'none'

      var body = document.getElementsByTagName('body')[0]
      body.appendChild(element)
    })

    afterEach(function () {
      element.parentNode.removeChild(element)
    })

    it('should output a random message into a given DOM element', function () {
      messageOutputter.doOutput(fakeId)

      expect(element.innerHTML).toBeInArray(messages)
    })

    it('should should throw an error if given a nonexistent element', function () {
      expect(function () {
        messageOutputter.doOutput('nope')
      }).toThrow(new Error('No element found with ID of nope'))
    })
  })
})
