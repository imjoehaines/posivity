/**
 * Class to handle outputting messages
 * @param {MessageGenerator} messageGenerator An instance of MessageGenerator
 * @param {array} messages                    An array of messages
 */
var MessageOutputter = function (messageGenerator, messages) {
  if (!messageGenerator || !messages) {
    throw new Error('Missing one or more argument to constructor')
  }

  this.MessageGenerator = messageGenerator
  this.MessageGenerator.setMessages(messages)
}

;(function () {
  'use strict'

  /**
   * Outputs a random message into a given element
   * @param  {string} elementId The ID of the element to add a message to
   */
  MessageOutputter.prototype.doOutput = function (elementId) {
    var outputSection = document.getElementById(elementId)

    if (!outputSection) {
      throw new Error('No element found with ID of ' + elementId)
    }

    outputSection.innerHTML = this.MessageGenerator.getRandomMessage()
  }
}())
