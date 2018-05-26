<template>
  <div id="app">
    <CalcDisplay/>
    <CalcButtons/>
  </div>
</template>

<script>
import CalcButtons from './components/CalcButtons'
import CalcDisplay from './components/CalcDisplay'
import { bus } from './main'

export default {
  name: 'App',
  components: {
    CalcButtons,
    CalcDisplay
  },
  data () {
    return {
      inputString: '',
      startMinutes: 0,
      endMinutes: 0,
      totalMinutes: 0,
      currentMinutes: 0,
      entered: false,
    }
  },
  methods: {
    handleInput: function(what) {
      if (what == "Backspace")
      {
        this.backspace()
      }
      else if (what == "Enter")
      {
        this.enter()
      }
      else {
        this.textinput(what)
      }
    },
    textinput: function(what){
      this.inputString = this.inputString + what
      console.log(this.inputString)
    },
    reset: function () {
      this.inputString = '';
      this.currentMinutes = 0;
      this.entered = false;
    },

    backspace: function () {
      if(this.inputString.length > 0)
        this.inputString = this.inputString.substr(0, this.inputString.length - 1)
    },

    enter: function () {
      if (this.entered == false) {
        this.endMinutes = 0
        this.totalMinutes = 0
        this.startMinutes = this.currentMinutes
        this.entered = true
        this.inputString = ''
      }
      else {
        this.endMinutes = this.currentMinutes
        if (this.startMinutes > this.endMinutes)
        {
          this.totalMinutes = 1440 - this.startMinutes + this.endMinutes
        }
        else {
          this.totalMinutes = this.endMinutes - this.startMinutes
          console.log(this.totalMinutes)
        }
        this.reset()

      }

    },
    // Given custom notation, return minutes from 00:00.
    parseMinutes: function (input){

      if (input.length == 1){
        console.log(60 * input)
        this.currentMinutes = 60 * input
      }
      if (input.length == 2){
        if (input.endsWith('.')){
          this.currentMinutes =  60 * input.substr(0,1) + 720
        }
        else {
          if (input == '12')
          {
            this.currentMinutes = 0
          }
          else{
            this.currentMinutes =  60 * input
          }

        }
      }

      if (input.length == 3){
        if (input.endsWith('.')){
          this.currentMinutes =  60 * input.substr(0,2) + 720
        }
        else {
          this.currentMinutes =  Number(60 * input.substr(0,1)) + Number(input.substr(1,3))
        }
      }

      if (input.length == 4){
        if (input.endsWith('.')){
          this.currentMinutes =  60 * Number(input.substr(0,1)) + Number(input.substr(1,3)) + 720
        }
        else {
          if (input.startsWith('12')){
            this.currentMinutes =  Number(input.substr(2,4))
            console.log("curmin is " + this.currentMinutes)
          }
          else {
            this.currentMinutes =  Number(60 * input.substr(0,2)) + Number(input.substr(2,4))
          }
        }
      }

      if (input.length == 5){
        if (input.startsWith('12')){
          this.currentMinutes =  Number(input.substr(2,4)) + 720
        }
        else {
          this.currentMinutes =  Number(60 * input.substr(0,2)) + Number(input.substr(2,4)) + 720
        }
      }
      return this.currentMinutes
    },
    //Given total minutes, return a time string
    formatTime: function(mins, ap){
      let minutes = '00';
      let hours = '00';
      let ampm = 'AM'

      if (mins < 60) {
        hours = '12'
        minutes = '' + mins
        ampm = 'AM'
      }

      else if (mins < 720) {
        hours = '' + Math.floor(mins/60)
        minutes = '' + mins%60
      }
      else if (mins < 780) {
        hours = '' + Math.floor(mins/60)
        minutes = '' + mins%60
        ampm = 'PM'
      }
      else if (mins < 1440) {
        hours = '' + Math.floor(mins/60)
        minutes = '' + mins%60
        ampm = 'PM'
        console.log(hours + ' ' + minutes)
      }
      //clean up the formatting
      if (minutes.length == 1)
      {
        minutes = '0' + minutes
      }
      if (minutes.length == 0)
      {
        minutes = '00'
      }
      if (!ap){
        return hours + ':' + minutes
      }

      return hours + ':' + minutes + ' ' + ampm
    },

  },
  computed: {

    outputString: function() {
      let len = this.inputString.length
      if (this.inputString.match("(^[012][0-9][0-5][0-9][.]$)|(^[012][0-9][0-5][0-9]$)|(^[0-9][0-5][0-9][.]$)|(^[0-9][0-5][0-9]$)|(^[12][0-9][.]$)|(^[12][0-9]$)|(^[0-9][.]$)|(^[0-9]$)"))
      {

        return this.formatTime(this.parseMinutes(this.inputString), true)
      }
      else {
        return ''
      }

    },
    startTime: function() {
      if (this.startMinutes)
      {
        return this.formatTime(this.startMinutes, true)
      }
      else
      {
        return ''
      }
    },
    endTime: function() {
      if (this.endMinutes)
      {
        return this.formatTime(this.endMinutes, true)
      }
      else
      {
        return ''
      }
    },
    totalTime: function() {
      if (this.totalMinutes != 0){
        return this.formatTime(this.totalMinutes, false)
      }
      else {
        return ''
      }

    }
  },
  created() {
    bus.$on('calcKeyUp', event => {
      this.handleInput(event.key)
    })
  }

}
</script>

<style>
* {
  padding: 0px;
}
#app {

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;

  background-color: #ABC8E2;
  margin: auto;
  margin-top: 20px;

  max-width: 600px;
  max-height: 800px;
  padding: 30px 10px;
  border-radius: 50px;

}

body {
  background-color: #183152;
  margin: auto;
}
</style>
