<template>
  <div class="calcbuttons" @keyup.55="inputString += '7'">
      <div class="buttonBox">
        <!-- conditional style on keypress... -->
        <!-- v-bind:class="{red: true, blue: true}" -->
        <div class="buttonCol">
          <button v-bind:class="{buttonDown: this.buttonStates['Digit7']}" v-on:click="buttonPressed(7)" type="button" name="button">7</button>
          <button v-bind:class="{buttonDown: this.buttonStates['Digit4']}" v-on:click="buttonPressed(4)" type="button" name="button">4</button>
          <button v-bind:class="{buttonDown: this.buttonStates['Digit1']}" v-on:click="buttonPressed(1)" type="button" name="button">1</button>
          <button v-on:click="buttonPressed('reset')" type="button" name="button">C</button>
        </div>

        <div class="buttonCol">
          <button v-bind:class="{buttonDown: this.buttonStates['Digit8']}" v-on:click="buttonPressed(8)"type="button" name="button">8</button>
          <button v-bind:class="{buttonDown: this.buttonStates['Digit5']}" v-on:click="buttonPressed(5)"type="button" name="button">5</button>
          <button v-bind:class="{buttonDown: this.buttonStates['Digit2']}" v-on:click="buttonPressed(2)"type="button" name="button">2</button>
          <button v-bind:class="{buttonDown: this.buttonStates['Digit0']}" v-on:click="buttonPressed(0)"type="button" name="button">0</button>
        </div>
        <div class="buttonCol">
          <button v-bind:class="{buttonDown: this.buttonStates['Digit9']}" v-on:click="buttonPressed(9)"type="button" name="button">9</button>
          <button v-bind:class="{buttonDown: this.buttonStates['Digit6']}" v-on:click="buttonPressed(6)"type="button" name="button">6</button>
          <button v-bind:class="{buttonDown: this.buttonStates['Digit3']}" v-on:click="buttonPressed(3)"type="button" name="button">3</button>
          <button v-bind:class="{buttonDown: this.buttonStates['.']}" v-on:click="buttonPressed('.')" type="button" name="button">PM</button>
        </div>
        <div class="buttonCol">
          <button v-bind:class="{buttonDown: this.buttonStates['Backspace']}" v-on:click="buttonPressed('Backspace')" type="button" name="button">Back</button>
          <button v-bind:class="{buttonDown: this.buttonStates['Enter']}" v-on:click="buttonPressed('Enter')" type="button" name="button">Enter</button>
        </div>
    </div>

  </div>
</template>

<script>

import { bus } from '../main'

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
        'code27' :  false, //esc, clear
        'Backspace' : false, //backspace
        '.': false, //190 or 110
      }

    }
  },
  methods: {

    buttonPressed: function(what) {

      this.$parent.handleInput(what)

    }
  },
  created() {
    bus.$on('calcKeyUp', (event) => {

      this.buttonStates[event.code] = false;
      console.log(this.buttonStates[event.code])

    }),
    bus.$on('calcKeyDown', (event) => {

      this.buttonStates[event.code] = true;
      console.log(this.buttonStates[event.code])
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

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
