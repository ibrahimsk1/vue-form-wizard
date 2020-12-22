<template>
  <div>
    <button
      type="button"
      class="mr-5 btn btn-primary"
      :disabled="checkBackButton()"
      @click="previousTab()"
    >
      {{ $t('wizard.prev') }}
    </button>
    <button type="button" class="ml-5 btn btn-primary" @click="nextTab()">
      {{ nextButtonTitle }}
    </button>
  </div>
</template>

<script>

export default {
  computed: {
    nextButtonTitle() {
      if (this.currentActive < this.totalTabs - 1) {
        return this.$t('wizard.next');
      } else {
        return this.$t('wizard.done');
      }
    }
  },
  props: ["totalTabs", "tabs", "currentActive", "changeTab"],
  methods: {
    checkBackButton() {
      return !(this.currentActive > 0);
    },
    checkNextButton() {
      if (this.currentActive < this.totalTabs) {
        return false;
      }
      return true;
    },
    previousTab() {
      this.changeCurrentActive("decrease");
    },
    nextTab() {
      const valid = this.tabs[this.currentActive].satisfied();
      if (valid) {
        if (this.currentActive !== this.totalTabs - 1) {
          this.changeCurrentActive("increase");
        }
      }
    },
    changeCurrentActive(type) {
      if (type == "increase") {
        this.changeTab(this.currentActive + 1 , "increase")
      } else if (type == "decrease") {
        this.changeTab(this.currentActive - 1 , "decrease")
      }
    }
  },
}
</script>