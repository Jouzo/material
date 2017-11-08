'use strict'

import init from './component/init'
import classify from './component/classify'
import events from './component/events'
import insert from './component/insert'

import create from './element/create'

import emitter from './module/emitter'

const defaults = {
  prefix: 'material',
  class: 'component',
  tag: 'div',
  modules: [emitter, events, insert]
}

/**
 * Base class for all ui components
 * @class
 * @param {Object} options - The component options
 * @return {Object} The class Instance
 */

/**
 * Class representing a UI Container. Can add components.
 *
 * @extends Component
 * @return {parent} The class instance
 * @example new Container({
 *   container: document.body
 * });
 */
class Component {
  /**
   * Constructor
   * @param  {Object} options - Component options
   * @return {Object} Class instance
   */
  constructor (options) {
    this.options = Object.assign({}, defaults, options || {})

    init(this)
    this.build(this.options)

    this.emit('ready')

    return this
  }

  /**
   * Build Method
   * @return {Object} This class instance
   */
  build (options) {
    var tag = options.tag || 'div'
    this.root = create(tag, options.css)

    classify(this.root, options)

    if (options.container) {
      this.insert(options.container)
    }

    this.emit('built', this.root)

    return this
  }
}

export default Component
