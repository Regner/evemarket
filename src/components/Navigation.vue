<template>
<div>
  <ul>
    <navigation-group v-for="mg in marketGroupsList" v-bind:group="mg" v-bind:selected-type.sync="selectedType"></navigation-group>
  </ul>
</div>
</template>

<script>
import NavigationGroup from './NavigationGroup.vue'

export default {
  name: 'Navigation',

  components: {
    NavigationGroup
  },

  props: [
    'marketGroupsList',
    'selectedType'
  ]
}
</script>

<style lang="stylus">
ul
  padding-left 10px
  list-style-type none
</style>