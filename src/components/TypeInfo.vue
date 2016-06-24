<template>
<div v-if="typeData">
  <p>{{ typeData.description }}</p>
  <h4>Structure</h4>
  <ul>
    <dogma-attribute-standard v-for="attr in localStructureAttributes" v-bind:attribute-url="attr.attribute.href" v-bind:value="attr.value"></dogma-attribute-standard>
    <dogma-attribute-Resistance v-for="attr in localStructureResistances" v-bind:attribute-url="attr.attribute.href" v-bind:value="attr.value" v-bind:id="attr.attribute.id"></dogma-attribute-resistance>
  </ul>
  <h4>Armor</h4>
  <ul>
    <dogma-attribute-standard v-for="attr in localArmorAttributes" v-bind:attribute-url="attr.attribute.href" v-bind:value="attr.value"></dogma-attribute-standard>
    <dogma-attribute-Resistance v-for="attr in localArmorResistances" v-bind:attribute-url="attr.attribute.href" v-bind:value="attr.value" v-bind:id="attr.attribute.id"></dogma-attribute-resistance>
  </ul>
  <h4>Shield</h4>
  <ul>
    <dogma-attribute-standard v-for="attr in localShieldAttributes" v-bind:attribute-url="attr.attribute.href" v-bind:value="attr.value"></dogma-attribute-standard>
    <li><dogma-attribute-Resistance v-for="attr in localShieldResistances" v-bind:attribute-url="attr.attribute.href" v-bind:value="attr.value" v-bind:id="attr.attribute.id"></dogma-attribute-resistance></li>
  </ul>
  <h4>Capacitor</h4>
  <ul>
    <dogma-attribute-standard v-for="attr in localCapacitorAttributes" v-bind:attribute-url="attr.attribute.href" v-bind:value="attr.value"></dogma-attribute-standard>
  </ul>
  <h4>Targeting</h4>
  <ul>
    <dogma-attribute-standard v-for="attr in localTargetingAttributes" v-bind:attribute-url="attr.attribute.href" v-bind:value="attr.value"></dogma-attribute-standard>
  </ul>
  <h4>Propulsion</h4>
  <ul>
    <dogma-attribute-standard v-for="attr in localPropulsionAttributes" v-bind:attribute-url="attr.attribute.href" v-bind:value="attr.value"></dogma-attribute-standard>
  </ul>
  <h4>Fitting</h4>
  <ul>
    <dogma-attribute-standard v-for="attr in localFittingAttributes" v-bind:attribute-url="attr.attribute.href" v-bind:value="attr.value"></dogma-attribute-standard>
  </ul>
</div>
<div v-else>Please select a type</div>
</template>

<script>
import DogmaAttributeStandard from './DogmaAttributeStandard.vue'
import DogmaAttributeResistance from './DogmaAttributeResistance.vue'

var structureAttributes = [
  161,
  9,
  38,
  4,
  1271,
  283
]

var structureResistance = [
  109,
  110,
  111,
  113
]

var armorAttributes = [
  265
]

var armorResistances = [
  267,
  268,
  269,
  270
]

var shieldAttributes = [
  263,
  479
]

var shieldResistances = [
  271,
  272,
  273,
  274
]

var capacitorAttributes = [
  55,
  482
]

var targetingAttributes = [
  76,
  79,
  192,
  552,
  564
]

var propulsionAttributes = [
  37,
  1281,
  600
]

var fittingAttributes = [
  48,
  11,
  12,
  13,
  14,
  1137,
  1132,
  101,
  102
]

export default {
  name: 'TypeInfo',

  components: {
    DogmaAttributeStandard,
    DogmaAttributeResistance
  },

  data: function () {
    return {
      localStructureAttributes: [],
      localStructureResistances: [],
      localArmorAttributes: [],
      localArmorResistances: [],
      localShieldAttributes: [],
      localShieldResistances: [],
      localCapacitorAttributes: [],
      localTargetingAttributes: [],
      localPropulsionAttributes: [],
      localFittingAttributes: []
    }
  },

  props: [
    'typeData'
  ],

  watch: {
    typeData: function () {
      this.updateAttributes()
    }
  },

  created: function () {
    if (this.typeData) {
      this.updateAttributes()
    }
  },

  methods: {
    'updateAttributes': function () {
      var tmpStructureAttrs = []
      var tmpStructureResistances = []
      var tmpArmorAttributes = []
      var tmpArmorResistances = []
      var tmpShieldAttributes = []
      var tmpShieldResistances = []
      var tmpCapacitorAttributes = []
      var tmpTargetingAttributes = []
      var tmpPropulsionAttributes = []
      var tmpFittingAttributes = []

      this.typeData.dogma.attributes.forEach(function (attribute) {
        var id = attribute.attribute.id
        if (structureAttributes.indexOf(id) > -1) {
          tmpStructureAttrs.push(attribute)
        } else if (structureResistance.indexOf(id) > -1) {
          tmpStructureResistances.push(attribute)
        } else if (armorAttributes.indexOf(id) > -1) {
          tmpArmorAttributes.push(attribute)
        } else if (armorResistances.indexOf(id) > -1) {
          tmpArmorResistances.push(attribute)
        } else if (shieldAttributes.indexOf(id) > -1) {
          tmpShieldAttributes.push(attribute)
        } else if (shieldResistances.indexOf(id) > -1) {
          tmpShieldResistances.push(attribute)
        } else if (capacitorAttributes.indexOf(id) > -1) {
          tmpCapacitorAttributes.push(attribute)
        } else if (targetingAttributes.indexOf(id) > -1) {
          tmpTargetingAttributes.push(attribute)
        } else if (propulsionAttributes.indexOf(id) > -1) {
          tmpPropulsionAttributes.push(attribute)
        } else if (fittingAttributes.indexOf(id) > -1) {
          tmpFittingAttributes.push(attribute)
        } else {
          console.log('Unused dogma attribute: ' + attribute.attribute.name + '(' + attribute.attribute.id + ') with value ' + attribute.value)
        }
      })

      this.localStructureAttributes = tmpStructureAttrs
      this.localStructureResistances = tmpStructureResistances
      this.localArmorAttributes = tmpArmorAttributes
      this.localArmorResistances = tmpArmorResistances
      this.localShieldAttributes = tmpShieldAttributes
      this.localShieldResistances = tmpShieldResistances
      this.localCapacitorAttributes = tmpCapacitorAttributes
      this.localTargetingAttributes = tmpTargetingAttributes
      this.localPropulsionAttributes = tmpPropulsionAttributes
      this.localFittingAttributes = tmpFittingAttributes
    }
  }
}
</script>

<style>
</style>