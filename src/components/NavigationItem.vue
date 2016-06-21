<template>
<li>
  <img width="16" height="16" v-bind:src="imageUrl" class="img-rounded">
  <label>{{ item.type.name }}</label>
</li>
</template>

<script>
import getTypeImageUrl from '../utilities/imageserver.js'

export default {
  name: 'NavigationItem',

  props: [
    'item'
  ],

  computed: {
    imageUrl: function () {
      return getTypeImageUrl(this.item.type.id, 32)
    }
  },

  created () {
  }
}
</script>

<style>
</style>