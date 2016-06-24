<template>
<div class="dogmaAttributeResistance" v-bind:class="resistanceStyle">{{ computedValue }}</div>
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
      return (1.0 - this.value).toFixed(2) * 100
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

<style>
.dogmaAttributeResistance {
  margin: 0 10px;
  float: left;
  position: relative;
  width: 22%;
  text-align: center;
}

.emResistance {
  background-color: rgba(51, 153, 255, 0.30);
}

.thermalResistance {
  background-color: rgba(210, 0, 0, 0.30);
}

.explosiveResistance {
  background-color: rgba(239, 213, 58, 0.30);
}

.kineticResistance {
  background-color: rgba(178, 178, 178, 0.30);
}
</style>