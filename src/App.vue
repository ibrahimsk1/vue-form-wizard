<template>
  <div id="app">
    <Intercept :interceptData="interceptData">
      <Reservation :setinterceptData="setinterceptData" />
    </Intercept>
  </div>
</template>


<script>

import Reservation from "./screen/Reservation"
import Intercept from "./components/Intercept"

export default {
  name: 'App',
  components: { Reservation, Intercept },
  data() {
    return {
      interceptData: {}
    }
  },
  methods: {
    setinterceptData(data) {
      this.interceptData = data;
    }
  }

}
</script>

<style lang="scss">
@import './src/assets/style.scss';
</style>
