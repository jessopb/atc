import { shallowMount } from '@vue/test-utils'
import CalcButtons from '../components/CalcButtons.vue'
import sinon from 'sinon'
/*
TODO:
change all:
sinon.assert.calledWith(buttonSpy, n)
to:
expect(buttonSpy.args[0][0]).toEqual(n)
for more readable test fail messages
*/
describe('CalcButtons.vue', () => {

  it('has a buttonPM that calls buttonPressed(PM)', () => {
    const wrapper = shallowMount(CalcButtons)
    const buttonSpy = sinon.spy(wrapper.vm, 'buttonPressed')
    wrapper.find('#buttonPM').trigger('click')
    sinon.assert.calledWith(buttonSpy, 'PM')
  })
  it('has a button0 that calls buttonPressed(0)', () => {
    const wrapper = shallowMount(CalcButtons)
    const buttonSpy = sinon.spy(wrapper.vm, 'buttonPressed')
    wrapper.find('#button0').trigger('click')
    expect(buttonSpy.args[0][0]).toEqual(0)
    //sinon.assert.calledWith(buttonSpy, 0)
  })
  it('has a button1 that calls buttonPressed(1)', () => {
    const wrapper = shallowMount(CalcButtons)
    const buttonSpy = sinon.spy(wrapper.vm, 'buttonPressed')
    wrapper.find('#button1').trigger('click')
    sinon.assert.calledWith(buttonSpy, 1)
  })
  it('has a button2 that calls buttonPressed(2)', () => {
    const wrapper = shallowMount(CalcButtons)
    const buttonSpy = sinon.spy(wrapper.vm, 'buttonPressed')
    wrapper.find('#button2').trigger('click')
    sinon.assert.calledWith(buttonSpy, 2)
  })
  it('has a button3 that calls buttonPressed(3)', () => {
    const wrapper = shallowMount(CalcButtons)
    const buttonSpy = sinon.spy(wrapper.vm, 'buttonPressed')
    wrapper.find('#button3').trigger('click')
    sinon.assert.calledWith(buttonSpy, 3)
  })
  it('has a button4 that calls buttonPressed(4)', () => {
    const wrapper = shallowMount(CalcButtons)
    const buttonSpy = sinon.spy(wrapper.vm, 'buttonPressed')
    wrapper.find('#button4').trigger('click')
    sinon.assert.calledWith(buttonSpy, 4)
  })
  it('has a button5 that calls buttonPressed(5)', () => {
    const wrapper = shallowMount(CalcButtons)
    const buttonSpy = sinon.spy(wrapper.vm, 'buttonPressed')
    wrapper.find('#button5').trigger('click')
    sinon.assert.calledWith(buttonSpy, 5)
  })
  it('has a button6 that calls buttonPressed(6)', () => {
    const wrapper = shallowMount(CalcButtons)
    const buttonSpy = sinon.spy(wrapper.vm, 'buttonPressed')
    wrapper.find('#button6').trigger('click')
    sinon.assert.calledWith(buttonSpy, 6)
  })
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
  it('has a button9 that calls buttonPressed(9)', () => {
    const wrapper = shallowMount(CalcButtons)
    const buttonSpy = sinon.spy(wrapper.vm, 'buttonPressed')
    wrapper.find('#button9').trigger('click')
    sinon.assert.calledWith(buttonSpy, 9)
  })
  //has function buttonPressed(arg) that calls
  //this.$parent.handleInput(arg)
  it('', () => {

  })
  //imports global event bus

})
