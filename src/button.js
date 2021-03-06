'use strict'

import create from './component/create'
import control from './component/control'
import ripple from './component/ripple'

import insert from './element/insert'

import emitter from './module/emitter'
import attach from './module/attach'

const defaults = {
  prefix: 'material',
  class: 'button',
  tag: 'button',
  ripple: false,
  events: [
    ['root.click', 'handleClick'],
    ['root.mouseover', 'handleMouseOver']
  ]
}

/**
 * Class that represents a button
 * @class
 * @since 0.0.1
 * @example
 * var button = new Button({
 *   label: 'Button raised',
 *   type: 'raised',
 *   color: 'primary'
 * }).on('click', function(e) {
 *   console.log('button click', e);
 * }).insert(document.body);
 */
class Button {
  /**
   * The init method of the Button class
   * @param  {Object} options [description]
   * @private
   * @return {Object} The class instance
   */
  constructor (options) {
    this.init(options)
    this.build()
    this.setup()
    this.attach()

    this.emit('ready')

    return this
  }

  /**
   * [init description]
   * @param  {?} options [description]
   * @return {?}         [description]
   */
  init (options) {
    this.options = Object.assign({}, defaults, options || {})
    Object.assign(this, control, emitter, attach)

    this.element = this.element || {}

    // init module$
    if (this.options.ripple) {
      ripple(this)
    }

    this.emit('init')
  }

  /**
   * Build button's method
   * @override
   * @return {void}
   */
  build () {
    this.element = {}

    this.root = create(this.options)

    this.options.label = this.options.label || this.options.text

    this.root.setAttribute('aria-label', this.options.label || this.options.name)

    if (this.options.title) {
      this.root.setAttribute('title', this.options.title)
    }

    this.label(this.options.label)
    this.icon(this.options.icon)

    if (this.options.tooltip) {
      this.root.dataset.tooltip = this.options.tooltip
    }

    if (this.options.container) {
      if (this.options.container.root) {
        this.container = this.options.container.root
      } else {
        this.container = this.options.container
      }
      insert(this.root, this.options.container)
    }

    this.emit('built', this.root)

    return this
  }

  /**
   * insert method
   * @param  {?} container [description]
   * @param  {?} context   [description]
   * @return {?}           [description]
   */
  insert (container, context) {
    insert(this.root, container, context)

    return this
  }

  /**
   * Setup method
   * @return {?} [description]
   */
  setup () {
    this.element.input = this.root

    if (this.options.name) {
      this.root.dataset.name = this.options.name
    }

    // if (this.options.label) {
    //   this.root.title = this.options.label
    // }

    if (this.options.content) {
      this.root.innerHTML = this.options.content
    }

    if (this.options.disabled === true) {
      this.disable()
    }
  }

  /**
   * Setter
   * @param {string} prop
   * @param {string} value
   * @return {Object} The class instance
   */
  set (prop, value) {
    switch (prop) {
      case 'disabled':
        this.disable(value)
        break
      case 'value':
        this.setValue(value)
        break
      case 'label':
        this.setLabel(value)
        break
      default:
        this.setValue(prop)
    }

    return this
  }

  /**
   * [buildLabel description]
   * @return {Object} The class instance
   */
  setLabel (label) {
    label = label || this.options.label
    var text = label

    if (label === null || label === false) {
      text = ''
    } else if (label) {
      text = label
    } else if (this.options.label) {
      text = label
    } else {
      text = this.options.name
    }

    if (!this.element.label) {
      this.label(text)
    } else {
      this.element.label.textContent = text
    }
  }

  destroy () {
    this.container.removeChild(this.root)
  }

  /**
   * method handleClick
   * @param  {event} e
   * @return {void}
   */
  handleClick (e) {
    e.preventDefault()

    if (this.disabled === true) return
    if (this.options.upload) return

    // this.publish('click');
    this.emit('click', e)

    return this
  }

  /**
   * method handleClick
   * @param  {event} e
   * @return {void}
   */
  handleMouseOver (e) {
    e.preventDefault()

    // console.log('mouse over', e.target)

    if (e.target.dataset.tooltip) {
      // console.log(e.target.dataset.tooltip)
    }

    return this
  }
}

export default Button
