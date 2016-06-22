<template>
  <div v-if="selectedType">
  </div>
  <div v-else>Please select a type</div>
</template>

<script>
export default {
  name: 'TypeHistory',

  props: [
    'selectedType'
  ]
}
</script>

<style>
</style>