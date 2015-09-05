/*global $l */

var MessageList = function () {}

;(function () {
  'use strict'

  /**
   * Sets the list
   * @param {array} list    An array of messages to set as the list
   * @param {string} prefix A string to prepend to each list item
   * @param {string} suffix A string to append to each list item
   */
  MessageList.prototype.setList = function (list, prefix, suffix) {
    if (!Array.isArray(list) || list.length === 0) {
      throw new Error('A new list must be a non-empty array')
    }

    prefix = prefix || ''
    suffix = suffix || ''

    // add the prefix & suffix to each list item
    $l.aeach(list, function (index, value) {
      list[index] = prefix + value + suffix
    })

    this.list = list

    // allow method chaining
    return this
  }

  /**
   * Gets the currently set list
   * @return {array} An array of messages
   */
  MessageList.prototype.getList = function () {
    return this.list
  }

  /**
   * Sets a predefined list in cases where the ajax call fails
   */
  MessageList.prototype.setPredefinedList = function () {
    this.setList([
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
    ])

    return this
  }
}())
