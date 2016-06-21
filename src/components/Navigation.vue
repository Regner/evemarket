<template>
<div>
  <ul>
    <navigation-group v-for="mg in marketGroupsList" v-bind:group="mg"></navigation-group>
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
    'marketGroupsList'
  ],

  data () {
    return {
    }
  },

  created () {
  }
}
</script>

<style>
</style>