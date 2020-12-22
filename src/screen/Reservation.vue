<template>
  <Wizard
    :currentActive="currentActive"
    :changeTab="changeTab"
    :transition="transition"
  >
    <Tab :satisfied="checkinSatisfied" v-show="currentActive == 0" :key="0">
      <div v-show="currentActive == 0">
        <div class="card-form">
          <div class="card-form__inner space-evenly-column">
            <b-form-group
              label-cols-sm="4"
              label-cols-lg="3"
              content-cols-sm="8"
              content-cols-lg="7"
              :label="$t('labels.checkinDate')"
              label-for="checkinPickerl"
              class="mb-0"
            >
              <b-form-datepicker
                id="checkinPicker"
                v-model="checkin"
                class="mb-2 col"
                :min="minDatein"
              ></b-form-datepicker>
            </b-form-group>
            <div class="skewed"></div>
            <b-form-group
              label-cols-sm="4"
              label-cols-lg="3"
              content-cols-sm
              content-cols-lg="7"
              :label="$t('labels.checkoutDate')"
              label-for="checkoutPicker"
              class="mb-0"
            >
              <b-form-datepicker
                id="checkoutPicker"
                v-model="checkout"
                class="mb-2"
                :min="minDateout"
              ></b-form-datepicker>
            </b-form-group>
          </div>
        </div>
      </div>
    </Tab>

    <!-- /* */ -->

    <Tab :satisfied="roomSatisfied" v-show="currentActive == 1" :key="2">
      <div v-show="currentActive == 1">
        <History
          :checkin="firstStage.checkin"
          :checkout="firstStage.checkout"
          :roomSelected="secondStage.roomSelected"
          :viewSelected="secondStage.viewSelected"
          :step="currentActive"
        />
        <div class="card-form">
          <div class="card-form__inner space-evenly-column">
            <section class="spikes">
              <div class="pt-3 pb-3">
                <h4>{{ $t("labels.room") }}</h4>
                <b-form-radio-group
                  id="radio-group-room"
                  v-model="roomSelected"
                  :options="data.roomOptions"
                  name="radio-room"
                ></b-form-radio-group>
              </div>
            </section>
            <div class="pt-5 pb-3">
              <h4>{{ $t("labels.view") }}</h4>

              <b-form-radio-group
                id="radio-group-view"
                v-model="viewSelected"
                :options="data.viewOptions"
                name="radio-view"
              ></b-form-radio-group>
            </div>
          </div>
        </div>
      </div>
    </Tab>
    <!-- /* */ -->

    <Tab :satisfied="invaildCard" v-show="currentActive == 2" :key="3">
      <div v-show="currentActive == 2">
        <History
          :checkin="firstStage.checkin"
          :checkout="firstStage.checkout"
          :roomSelected="secondStage.roomSelected"
          :viewSelected="secondStage.viewSelected"
          :step="currentActive"
        />
        <div>
          <CardForm
            ref="refCard"
            :form-data="formData"
            @input-card-number="updateCardNumber"
            @input-card-name="updateCardName"
            @input-card-month="updateCardMonth"
            @input-card-year="updateCardYear"
            @input-card-cvv="updateCardCvv"
          ></CardForm>
        </div>
      </div>
    </Tab>
  </Wizard>
</template>

<script>
import Wizard from '../components/Wizard'
import Tab from '../components/Tab'
import { data } from '../constants/data'
import CardForm from '../components/CardForm'
import History from '../components/History'
import { paymentControl } from '../service/service'

export default {
  props: ["setinterceptData"],
  components: {
    Wizard,
    Tab,
    CardForm,
    History
  },
  data() {
    return {
      data,
      transition: "increase",
      currentActive: 0,
      minDatein: '',
      minDateout: '',
      firstStage: {
        checkin: localStorage.getItem("checkin") || "",
        checkout: localStorage.getItem("checkout") || "",
      },
      secondStage: {
        roomSelected: localStorage.getItem("roomSelected") || "",
        viewSelected: localStorage.getItem("viewSelected") || "",
      },
      formData: {
        cardName: localStorage.getItem("cardName") || "",
        cardNumber: localStorage.getItem("cardNcardNumberame") || "",
        cardNumberNotMask: localStorage.getItem("cardNumberNotMask") || "",
        cardMonth: localStorage.getItem("cardMonth") || "",
        cardYear: localStorage.getItem("cardYear") || "",
        cardCvv: localStorage.getItem("cardCvv") || "",
      }
    }
  },

  created() {
    const now = new Date()
    this.minDatein = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    this.minDateout = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  },

  computed: {
    checkin: {
      get: function () {
        return localStorage.getItem("checkin");
      },
      set: function (newValue) {
        localStorage.setItem("checkin", newValue);
        this.firstStage.checkin = newValue;
      }
    },
    checkout: {
      get: function () {
        return localStorage.getItem("checkout");
      },
      set: function (newValue) {
        localStorage.setItem("checkout", newValue);
        this.firstStage.checkout = newValue;
      }
    },
    roomSelected: {
      get: function () {
        return localStorage.getItem("roomSelected");
      },
      set: function (newValue) {
        localStorage.setItem("roomSelected", newValue);
        this.secondStage.roomSelected = newValue;
      }
    },
    viewSelected: {
      get: function () {
        return localStorage.getItem("viewSelected");
      },
      set: function (newValue) {
        localStorage.setItem("viewSelected", newValue);
        this.secondStage.viewSelected = newValue;
      }
    }
  },

  methods: {
    paymentControl,

    updateCardNumber(val) {
      localStorage.setItem("cardNumber", val);
      this.formData.cardNumber = val;
    },
    updateCardName(val) {
      localStorage.setItem("cardName", val);
      this.formData.cardName = val;
    },
    updateCardMonth(val) {
      localStorage.setItem("cardMonth", val);
      this.formData.cardMonth = val;
    },
    updateCardYear(val) {
      localStorage.setItem("cardYear", val);
      this.formData.cardYear = val;
    },
    updateCardCvv(val) {
      localStorage.setItem("cardCvv", val);
      this.formData.cardCvv = val;
    },


    changeTab(val, type) {
      this.transition = type
      this.currentActive = val;

    },

    checkinSatisfied() {
      let msg = ""
      let check = true
      if (this.firstStage.checkin === '') {
        msg += "Check-in date should choose! "
        check = false;
      }
      if (this.firstStage.checkout === '') {
        msg += "Check-out date should choose! "
        check = false;
      }
      let type = "warning"
      return this.satisfyResult(check, msg, type)
    },

    roomSatisfied() {
      let msg = ""
      let check = true
      if (this.roomSelected === '') {
        msg += "You should choose room type! "
        check = false;
      }
      if (this.viewSelected === '') {
        msg += "You should choose view type! "
        check = false;
      }
      let type = "warning"
      return this.satisfyResult(check, msg, type)
    },

    satisfyResult(check, msg, type) {
      if (check) {
        return check;
      } else {
        this.setinterceptData({ type: type, msg: msg })
        return check;
      }
    },

    invaildCard() {
      let msg = "";
      let check = true
      if (this.$refs.refCard.$props.formData.cardName === "") {
        msg += "You should choose card name! "
        check = false;
      }
      if (this.$refs.refCard.$props.formData.cardMonth === "") {
        msg += "You should choose card month! "
        check = false;
      }
      if (this.$refs.refCard.$props.formData.cardCvv === "") {
        msg += "You should choose card cvv! "
        check = false;
      }

      if (this.$refs.refCard.$props.formData.cardYear === "") {
        msg += "You should choose card year! "
        check = false;
      }

      if (this.$refs.refCard.$props.formData.cardNumberNotMask.length < 11) {
        msg += "You should choose valid card number! "
        check = false;
      }

      if (check) {
        this.setinterceptData({ type: "loading" })
        this.paymentControl().then(
          result => this.setinterceptData({ type: "success", msg: result })
        )
      } else {
        this.setinterceptData({ type: "warning", msg: msg })
      }

      return false;

    },

  }

}
</script>


<style scoped>
.increase-enter {
  opacity: 0;
  transform: translateX(-200px);
}

.increase-enter-active {
  transition: all 2s ease-out;
}

.increase-enter-to {
  opacity: 1;
}

.decrease-enter {
  opacity: 0;
  transform: translateX(+200px);
}

.decrease-enter-active {
  transition: all 2s ease-out;
}

.decrease-enter-to {
  opacity: 1;
}

.space-evenly-column {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.skewed {
background: rgb(255,255,255);
background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(44,62,80,1) 25%, rgba(255,255,255,1) 50%, rgba(44,62,80,1) 75%, rgba(255,255,255,1) 100%);
  background-clip: content-box;
  min-height: 20px;
  border-radius: 20px;
}

.spikes {
  position: relative;
  background: #2c3e50;
  height: 50%;
  color: white;
  padding-bottom: 30px;
}

.spikes::after {
  content: "";
  position: absolute;
  right: 0;
  left: -0%;
  top: 100%;
  z-index: 10;
  display: block;
  height: 50px;
  background-size: 50px 100%;
  background-image: linear-gradient(135deg, #2c3e50 25%, transparent 25%),
    linear-gradient(225deg, #2c3e50 25%, transparent 25%);
  background-position: 0 0;
}
</style>


