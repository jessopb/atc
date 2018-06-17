import { shallowMount } from '@vue/test-utils'
import CalcButtons from '../components/CalcButtons.vue'
//expect = require('sinon-expect').enhance(expect, sinon, 'was');
import sinon from 'sinon'


describe('CalcButtons.vue', () => {

  it('has a button7 that calls buttonPressed(7)', () => {
    const wrapper = shallowMount(CalcButtons)
    const buttonSpy = sinon.spy(wrapper.vm, 'buttonPressed')
    wrapper.find('#button7').trigger('click')
    sinon.assert.calledWith(buttonSpy, 7)
  })
  it('has a button8 that calls buttonPressed(8)', () => {
    const wrapper = shallowMount(CalcButtons)
    const buttonSpy = sinon.spy(wrapper.vm, 'buttonPressed')
    wrapper.find('#button8').trigger('click')
    sinon.assert.calledWith(buttonSpy, 8)
  })
  //has function buttonPressed(arg) that calls
  //this.$parent.handleInput(arg)
  it('', () => {

  })
  //imports global event bus
  it('', () => {

  })
  //each button sends a keycode when clicked
  it('', () => {

  })
  //each button changes color when keypressed
  it('', () => {

  })
  it('', () => {

  })
  it('', () => {

  })
  it('', () => {

  })
  it('', () => {

  })
})
