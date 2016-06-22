<template>
  <div v-if="typeData">
    <p>{{ typeData.description }}</p>
    <ul>
      <li v-for="attr in typeData.dogma.attributes">{{ attr.attribute.name }} {{ attr.value }}</li>
    </ul>
  </div>
  <div v-else>Please select a type</div>
</template>

<script>
export default {
  name: 'TypeInfo',

  props: [
    'typeData'
  ]
}
</script>

<style>
</style>