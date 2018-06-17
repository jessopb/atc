<template>
  <div id="app">
    <CalcDisplay/>
    <CalcButtons/>
  </div>
</template>

<script>
import CalcButtons from './components/CalcButtons'
import CalcDisplay from './components/CalcDisplay'
import { EventBus } from './main'

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
  computed: {

    outputString: function() {
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
        return this.formatTime(this.startMinutes)
      }
      else
      {
        return ''
      }
    },
    endTime: function() {
      if (this.endMinutes)
      {
        return this.formatTime(this.endMinutes)
      }
      else
      {
        return ''
      }
    },
    totalTime: function() {
      if (this.totalMinutes != 0){
        return this.formatAnswer(this.totalMinutes)
      }
      else {
        return ''
      }

    }
  },
  created() {
    EventBus.$on('calcKeyUp', event => {
      this.handleInput(event.key)
    })
    EventBus.$on('calcButtonClicked', event => {
      this.handleInput(event)
    })
  },
  methods: {
    //agregates keyboard/click-screen inputs
    handleInput: function(what) {
      if (what == "Backspace")
      {
        this.backspace()
      }
      else if (what == "Enter")
      {
        this.enter()
      }
      else if (what == "PM")
      {
        this.addCharToInputString('.')
      }
      else {
        this.addCharToInputString(what)
      }
    },
    //called by handleInput
    addCharToInputString: function(inputCharacter){
      this.inputString = this.inputString + inputCharacter
    },
    //(to be) called by handleInput
    reset: function () {
      this.inputString = '';
      this.currentMinutes = 0;
      this.entered = false;
    },
    //called by handleInput
    backspace: function () {
      if(this.inputString.length > 0)
        this.inputString = this.inputString.substr(0, this.inputString.length - 1)
    },
    /***
    * enter()
    * called by handleInput()
    *
    */
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
        }
        this.reset()
      }
    },
    /***
    * Given custom notation, return minutes from 00:00.
    * called by computed: outputString()

    */
    parseMinutes: function (input){
      if (input.length == 1){
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
      /*BUG: 12. returning 1440 instead of 720 */
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
      console.log("current minutes is " + this.currentMinutes)
      return this.currentMinutes
    },
    //Given total minutes, return a time string
    /***
    * formatTime(mins)
    * formatTime(00) should return "12:00 AM"
    * formatTime(25) should return "12:25 AM"
    * formatTime(60) should return "01:00 AM"
    * formatTime(65) should return "01:05 AM"
    * formatTime(660) should return "11:00 AM"
    * formatTime(665) should return "11:05 AM"
    * formatTime(720) should return "12:00 PM"
    * formatTime(725) should return "12:05 PM"
    * formatTime(780) should return "01:00 PM"
    * formatTime(785) should return "01:05 PM"
    * formatTime(1380) should return "11:00 PM"
    * formatTime(1385) should return "11:05 PM"
    * upgrade: formatTime(mins, formatStrategy)
    */
    formatTime: function(mins){
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
      return hours + ':' + minutes + ' ' + ampm
    },
    /***
    * formatAnswer(mins)
    * should return '00:00'
    * given 1*60, should return 01:00
    * given 11*60, should return 11:00
    * upgrade: formatAnswer(mins, formatStrategy)
    */
    formatAnswer: function(mins){
      let minutes = '00';
      let hours = '00';
      hours = '' + Math.floor(mins/60)
      minutes = '' + mins%60

      //string format library to ensure '00'
      if (minutes.length == 1)
      {
        minutes = '0' + minutes
      }
      if (minutes.length == 0)
      {
        minutes = '00'
      }
      if (hours.length == 1)
      {
        hours = '0' + hours
      }
      if (hours.length == 0)
      {
        hours = '00'
      }
      return hours + ':' + minutes
    },
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
