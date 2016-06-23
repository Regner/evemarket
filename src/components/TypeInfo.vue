<template>
<div v-if="typeData">
  <p>{{ typeData.description }}</p>
  <h4>Structure</h4>
  <ul>
    <dogma-attribute-standard v-for="attr in localStructureAttributes" v-bind:attribute-url="attr.attribute.href" v-bind:value="attr.value"></dogma-attribute-standard>
  </ul>
</div>
<div v-else>Please select a type</div>
</template>

<script>
import DogmaAttributeStandard from './DogmaAttributeStandard.vue'

var structureAttributes = [
  161,
  9,
  38,
  4,
  1271
]

// var structureResistance = [
//   109,
//   110,
//   111,
//   113
// ]

export default {
  name: 'TypeInfo',

  components: {
    DogmaAttributeStandard
  },

  data: function () {
    return {
      localStructureAttributes: []
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

      this.typeData.dogma.attributes.forEach(function (attribute) {
        var id = attribute.attribute.id
        if (structureAttributes.indexOf(id) > -1) {
          tmpStructureAttrs.push(attribute)
        } else {
          console.log('Unused dogma attribute: ' + attribute.attribute.name + '(' + attribute.attribute.id + ') with value ' + attribute.value)
        }
      })

      this.localStructureAttributes = tmpStructureAttrs
    }
  }
}
</script>

<style>
</style>