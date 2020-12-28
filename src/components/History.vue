<template>
  <div class="card-form card-form__history">
    <div v-if="step == 1 || step == 2" class="flex grey">
      <div>
        <label >{{ $t("labels.checkinDate") }}</label
        ><label>{{ checkin }}</label>
      </div>
      <div>
        <label>{{ $t("labels.checkoutDate") }}</label
        ><label>{{ checkout }}</label>
      </div>
    </div>
    <div v-if="step == 2" class="flex">
      <div>
        <label>{{ $t("labels.room") }}</label
        ><label>{{ roomSelected }}</label>
      </div>
      <div>
        <label>{{ $t("labels.view") }}</label
        ><label>{{ viewSelected }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["checkin", "checkout", "roomSelected", "viewSelected", "step"]
}
</script>

<style scoped>
.grey {
  background-color: rgba(90, 116, 148, 0.4);
  border-radius:10px;
}

.flex {
  display: flex;
  justify-content: space-evenly;
}

.flex label{
    margin-top: 10px;
    margin-right: 5px;
    margin-left: 5px;

}

.border{
    border:1px solid black;
}

</style>