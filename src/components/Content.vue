<template>
<type-header v-bind:type-data="typeData"></type-header>
<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" data-toggle="tab" href="#orders" role="tab">Orders</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" data-toggle="tab" href="#history" role="tab">History</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" data-toggle="tab" href="#info" role="tab">Info</a>
  </li>
</ul>
<div class="tab-content">
  <div class="tab-pane active" id="orders" role="tabpanel"><type-orders v-bind:selected-type="selectedType"></type-orders></div>
  <div class="tab-pane" id="history" role="tabpanel"><type-history v-bind:selected-type="selectedType"></type-history></div>
  <div class="tab-pane" id="info" role="tabpanel"><type-info v-bind:type-data="typeData"></type-info></div>
</div>
</template>

<script>
import TypeHeader from './TypeHeader.vue'
import TypeOrders from './TypeOrders.vue'
import TypeInfo from './TypeInfo.vue'
import TypeHistory from './TypeHistory.vue'

export default {
  name: 'Content',

  components: {
    TypeHeader,
    TypeOrders,
    TypeInfo,
    TypeHistory
  },

  props: [
    'selectedType',
    'typeData'
  ]
}
</script>

<style>
</style>