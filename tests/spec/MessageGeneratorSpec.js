/*global describe, beforeEach, it, expect, MessageGenerator */

describe('MessageGenerator', function () {
  var messageGenerator

  beforeEach(function () {
    messageGenerator = new MessageGenerator()
  })

  describe('set & get messages', function () {
    it('should allow messages to be set and fetched', function () {
      var messages = ['some', 'test', 'messages']

      messageGenerator.setMessages(messages)

      expect(messageGenerator.getMessages()).toEqual(messages)
    })

    it("should throw an error if messages isn't an array", function () {
      var messages = 'some broken messages'

      // anonymous function so setMessages() isn't executed directly
      expect(function () {
        messageGenerator.setMessages(messages)
      }).toThrow(new Error('Messages must be a non-empty array'))
    })

    it('should throw an error if messages is an empty array', function () {
      // anonymous function so setMessages() isn't executed directly
      expect(function () {
        messageGenerator.setMessages([])
      }).toThrow(new Error('Messages must be a non-empty array'))
    })
  })

  describe('check messages is set', function () {
    it('should pass if messages is set', function () {
      var messages = ['boop', 'beep', 'bop']

      messageGenerator.setMessages(messages)

      expect(function () {
        messageGenerator.checkMessagesIsSet()
      }).not.toThrow()
    })

    it('should throw an error if messages is not set', function () {
      expect(function () {
        messageGenerator.checkMessagesIsSet()
      }).toThrow()
    })
  })

  describe('getRandomIndex', function () {
    it('should return a number between 0 and 10 when passed 10', function () {
      var index = messageGenerator.getRandomIndex(10)

      expect(index).toBeIntBetween(0, 10)
    })

    it('should not return a number between 0 and 10 when passed 10', function () {
      var index = messageGenerator.getRandomIndex(10)

      expect(index).not.toBeIntBetween(11, 10000)
    })

    it('should throw an error if passed an array', function () {
      expect(function () {
        messageGenerator.getRandomIndex([1000])
      }).toThrow(new Error('maxValue must be a number'))
    })

    it('should throw an error if passed a string', function () {
      expect(function () {
        messageGenerator.getRandomIndex('999')
      }).toThrow(new Error('maxValue must be a number'))
    })
  })

  describe('getRandomMessage', function () {
    it('should return a random message', function () {
      var messages = ['some', 'test', 'messages']

      messageGenerator.setMessages(messages)

      expect(messageGenerator.getRandomMessage()).toBeInArray(messages)
    })
  })
})
