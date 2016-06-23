<template>
<h2 v-if="typeData"><img v-bind:src="imageUrl"> {{ typeData.name }}</h2>
<h2 v-else>Please select a type</h2>
</template>

<script>
export default {
  name: 'TypeHeader',

  props: [
    'typeData'
  ],

  computed: {
    imageUrl: function () {
      return 'https://image.eveonline.com/Type/' + this.typeData.id + '_' + 64 + '.png'
    }
  }
}
</script>

<style>
</style>