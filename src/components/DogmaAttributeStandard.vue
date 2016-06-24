<template>
<li>{{ name }}<span class="pull-right">{{ value | formattedNumber }}</span></li>
</template>

<script>
export default {
  name: 'DogmaAttributeStandard',

  data: function () {
    return {
      name: null
    }
  },

  props: [
    'attributeUrl',
    'value'
  ],

  created: function () {
    this.$http.get(this.attributeUrl).then(function (response) {
      this.name = response.data.displayName
    })
  }
}
</script>

<style>
</style>