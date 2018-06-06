<template>
  <div class="calcdisplay">
    <div class="headerBox">
      <h1>Amy's Timesheet Calculator</h1>
    </div>
    <div class="displayBox">
      <div class="displayrow">
        <div class="displaycolumn">
          <label>Start:</label>
          <input
            class="displayout"
            type="text"
            v-model="this.$parent.startTime">
        </div>
        <div class="displaycolumn">
          <label>End:</label>
          <input
            class="displayout"
            type="text"
            v-model="this.$parent.endTime">
        </div>
        <div class="displaycolumn">
          <label>Total:</label>
          <input
            class="displayout"
            type="text"
            v-model="this.$parent.totalTime">
        </div>
      </div>
      <div class="displayrow">
        <div class="displaycolumn">
          <label>Entry:</label>
          <input
            id="entry"
            type="text"
            v-model="this.$parent.inputString">
        </div>
        <div class="displaycolumn">
          <label>Time:</label>
          <input
            class="displayout"
            type="text"
            v-model="this.$parent.outputString">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../main'

export default {
  name: 'CalcDisplay',
  methods: {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
h1, h2 {
  font-weight: bold;
  color: #183152;
  padding: 10px;
  align-content: center;
}


* {
  padding: 0px;
  margin: 0px;
  color: #183152;
  font-family: Helvetica;
}

.calcdisplay
{
  display: flex;
  padding: 0px;
  background-color: white;
  margin: auto;

  max-width: 480px;
  flex-wrap: wrap;
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

.displayrow {
  box-sizing: border-box;
  max-width: 480px;
  display: flex;
  font-size: 20px;
  
  justify-content: space-around;
  padding: 5px;
}

.displaycolumn {
  display: flex;
  flex-direction: column;
  margin: 0px 10px;
}

.headerBox {
  display: flex;
  justify-content: space-around;
  width: 100%;
  background-color: #ABC8E2;
}

input {
  height: 40px;
  font-size: 20px;
  color: #183152;
  background-color: #ABC8E2;

  border-style: none;
  padding-left: 5px;
  box-sizing: border-box;
}

label {
  text-align: left;
}
.displayout {
  width: 100%
}

#entry {
  width: 100%;
  background-color: white;
  border-style: solid;
  border-color: #183152;
}

</style>
