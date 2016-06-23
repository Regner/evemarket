<template>
<table class="table orders table-condensed table-hover">
  <thead>
    <tr>
      <th class="text-sm-center">Location</th>
      <th class="text-sm-center">Price</th>
      <th class="text-sm-center">Quantity</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="order in orders">
      <td>{{ order.location.name }}</td>
      <td class="text-sm-right">{{ order.price | isk }}</td>
      <td class="text-sm-right">{{ order.volume }}</td>
    </tr>
  </tbody>
</table>
</template>

<script>
export default {
  name: 'OrdersTable',

  props: [
    'orders'
  ]
}
</script>

<style>
</style>