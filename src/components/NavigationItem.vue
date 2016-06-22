<template>
<li v-on:click="selected">
  <img width="16" height="16" v-bind:src="imageUrl">
  <label>{{ item.type.name }}</label>
</li>
</template>

<script>
export default {
  name: 'NavigationItem',

  props: [
    'item',
    'selectedType'
  ],

  computed: {
    imageUrl: function () {
      return 'https://image.eveonline.com/Type/' + this.item.type.id + '_' + 32 + '.png'
    }
  },

  methods: {
    selected: function () {
      this.selectedType = this.item.type.href
    }
  }
}
</script>

<style>
</style>