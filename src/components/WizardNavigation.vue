<template>
  <div>
    <ol class="step-indicator">
      <li
        v-for="(tab, ix) in tabs.header"
        is="WizardNavigationItem"
        :key="$t(`${tab.title}`)"
        :step="tab"
        :currentActive="currentActive"
        :ix="ix"
      ></li>
    </ol>
    <div style="position: relative">
      <div class="arrow up" :style="leftCalc"></div>
    </div>
    <div class="container">
      <div
        v-for="(tab, ix) in tabs.header"
        is="WizardBar"
        :key="$t(`${tab.title}`)"
        :step="tab"
        :currentActive="currentActive"
        :ix="ix"
      ></div>
    </div>
  </div>
</template>

<script>
import WizardNavigationItem from './WizardNavigationItem'
import WizardBar from './WizardBar'


export default {
  components: {
    WizardNavigationItem,
    WizardBar
  },
  props: ["tabs", "currentActive"],
  computed: {
    leftCalc() {
      if (this.currentActive === this.tabs.header.length) {
        return { "display": "none"};
      }
      let interval = 100 / this.tabs.header.length;
      let leftVal = this.currentActive * interval + interval / 2;
      return { "left": `${leftVal}%` }

    }
  }
}
</script>

<style scoped>
.arrow {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  position: absolute;
  top: -10px;
  transition: all 2s ease;
}

.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}
</style>

