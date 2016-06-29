<template>
<div class="dogmaAttributeResistance" v-bind:class="resistanceStyle">
  <div class="resistanceInner" v-bind:style="{width: computedValue + '%'}">{{ computedValue }}%</div>
</div>
</template>

<script>
var em = [
  113,
  271,
  267
]

var explosive = [
  111,
  272,
  268
]

var kinetic = [
  109,
  273,
  269
]

var thermal = [
  110,
  274,
  270
]

export default {
  name: 'DogmaAttributeResistance',

  data: function () {
    return {
      isEM: false,
      isExplosive: false,
      isKinetic: false,
      isThermal: false
    }
  },

  props: [
    'attributeUrl',
    'value',
    'id'
  ],

  created: function () {
    this.$http.get(this.attributeUrl).then(function (response) {

    })
  },

  computed: {
    computedValue: function () {
      return ((1.0 - this.value) * 100).toFixed(0)
    },

    resistanceStyle: function () {
      if (em.indexOf(this.id) > -1) {
        return 'emResistance'
      } else if (thermal.indexOf(this.id) > -1) {
        return 'thermalResistance'
      } else if (explosive.indexOf(this.id) > -1) {
        return 'explosiveResistance'
      } else if (kinetic.indexOf(this.id) > -1) {
        return 'kineticResistance'
      } else {
        console.log('Attempted to add a dogmaAttributeResistance with invalid id of ' + this.id)
      }
    }
  }
}
</script>

<style lang="stylus">
.dogmaAttributeResistance
  margin 0 5px
  /*float left*/
  /*position relative*/
  width 24%
  text-align center

.emResistance
  background-color rgba(51, 153, 255, 0.30)
  .resistanceInner
    background-color rgb(51, 153, 255)

.thermalResistance
  background-color rgba(180, 0, 0, 0.30)
  .resistanceInner
    background-color rgb(180, 0, 0)

.explosiveResistance
  background-color rgba(200, 150, 58, 0.30)
  .resistanceInner
    background-color rgb(200, 150, 58)

.kineticResistance
  background-color rgba(178, 178, 178, 0.30)
  .resistanceInner
    background-color rgb(178, 178, 178)
</style>