<template>
  <div class="calcbuttons">
    <div class="buttonBox">
      <!-- conditional style on keypress... -->
      <div class="buttonCol">
        <button
          :class="{buttonDown: buttonStates['Digit7']}"
          type="button"
          id="button7"
          @click="buttonPressed(7)">7</button>
        <button
          :class="{buttonDown: buttonStates['Digit4']}"
          type="button"
          id="button4"
          @click="buttonPressed(4)">4</button>
        <button
          type="button"
          :class="{buttonDown: buttonStates['Digit1']}"
          id="button1"
          @click="buttonPressed(1)">1</button>
        <button
          type="button"
          @click="buttonPressed('reset')"
          id="buttonReset">C</button>
      </div>
      <div class="buttonCol">
        <button
          type="button"
          :class="{buttonDown: buttonStates['Digit8']}"
          @click="buttonPressed(8)"
          id="button8">8</button>
        <button
          type="button"
          :class="{buttonDown: buttonStates['Digit5']}"
          @click="buttonPressed(5)"
          id="button5">5</button>
        <button
          type="button"
          :class="{buttonDown: buttonStates['Digit2']}"
          @click="buttonPressed(2)"
          id="button2">2</button>
        <button
          type="button"
          :class="{buttonDown: buttonStates['Digit0']}"
          @click="buttonPressed(0)"
          id="button0">0</button>
      </div>
      <div class="buttonCol">
        <button
          type="button"
          :class="{buttonDown: buttonStates['Digit9']}"
          @click="buttonPressed(9)"
          id="button9">9</button>
        <button
          type="button"
          :class="{buttonDown: buttonStates['Digit6']}"
          @click="buttonPressed(6)"
          id="button6">6</button>
        <button
          type="button"
          :class="{buttonDown: buttonStates['Digit3']}"
          @click="buttonPressed(3)"
          id="button3">3</button>
        <button
          type="button"
          :class="{buttonDown: buttonStates['.']}"
          @click="buttonPressed('.')"
          id="buttonPM">PM</button>
      </div>
      <div class="buttonCol">
        <button
          type="button"
          :class="{buttonDown: buttonStates['Backspace']}"
          @click="buttonPressed('Backspace')"
          id="buttonBack">Back</button>
        <button
          type="button"
          :class="{buttonDown: buttonStates['Enter']}"
          @click="buttonPressed('Enter')"
          id="buttonEnter">Enter</button>
      </div>
    </div>
  </div>
</template>

<script>

import { EventBus } from '../main'

export default {
  name: 'CalcButtons',
  data() {
    return {
      buttonStates: {
        'Digit0': false, //numpad 96...
        'Digit1': false,
        'Digit2': false,
        'Digit3': false,
        'Digit4': false,
        'Digit5': false,
        'Digit6': false,
        'Digit7': false,
        'Digit8': false,
        'Digit9': false,
        'Enter' : false, //13 enter
        'code27' :  false, //esc, clear NOT IMPLEMENTED
        'Backspace' : false, //backspace
        '.': false, //190 or 110
      }
    }
  },

  /* Event listeners for managing the
  *  button background color input feedback
  */
  created() {
    EventBus.$on('calcKeyUp', (event) => {
      this.buttonStates[event.code] = false;
    }),
    EventBus.$on('calcKeyDown', (event) => {
      this.buttonStates[event.code] = true;
    })
  },
  methods: {
    buttonPressed: function(what) {
      EventBus.$emit('calcButtonClicked', what)
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: bold;
  color: #183152;
  padding: 10px;
}

* {
  padding: 0px;
  margin: 0px;
  color: #183152;
  font-family: Helvetica;
}
.calcbuttons {
  display: flex;
  padding: 0px;
  background-color: #ABC8E2;
  margin: auto;
  max-width: 480px;
  flex-wrap: wrap;
}


.buttonBox {
  height: 100%;
  box-sizing: border-box;
  min-width: 480px;
  min-height: 480px;
  display: flex;
  border-style: solid;
  border-width: 1px;
  flex-direction: row;
  justify-content: space-between;
}

.displayBox {
  display: flex;

  flex-direction: column;
  justify-content: center;

  height: 180px;
  max-width: 480px;

  border-width: 2px 2px 0px 2px;
  box-sizing: border-box;
  border-style: solid;
  border-color: #183152;
}
button {
  background-color: white;
  width: 100%;
  border-style: solid;
  border-color: #183152;
  border-width: 1px;
  box-sizing: border-box;
  flex-grow: 1;
  font-size: 20px;
}

.buttonCol {
  width: 25%;
  display: flex;
  flex-grow: 1;
  padding: 0px;
  margin: 0px;
  justify-content: center;
  box-sizing: border-box;
  flex-direction: column;
}

.buttonDown {
  background-color: #ABC8E2;
}

</style>
