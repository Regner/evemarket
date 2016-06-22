<template>
  <h3>Sell Orders</h3>
  <orders-table v-bind:orders="sellOrders"></orders-table>

  <h3>Buy Orders</h3>
  <orders-table v-bind:orders="buyOrders"></orders-table>
</template>

<script>
import OrdersTable from './OrdersTable.vue'

var DEFAULT_REGION = 'https://crest-tq.eveonline.com/market/10000002/orders/'  // The Forge

export default {
  name: 'TypeOrders',

  components: {
    OrdersTable
  },

  data: function () {
    return {
      buyOrders: [],
      sellOrders: []
    }
  },

  props: [
    'selectedType'
  ],

  watch: {
    selectedType: function () {
      this.updateOrders()
    }
  },

  created: function () {
    if (this.selectedType) {
      this.updateOrders()
    }
  },

  methods: {
    'updateOrders': function () {
      this.buyOrders = []
      this.sellOrders = []

      this.$http.get(DEFAULT_REGION, {'type': this.selectedType}).then(function (response) {
        var tmpBuyOrders = []
        var tmpSellOrders = []

        response.data.items.forEach(function (element, index, array) {
          if (element.buy) {
            tmpBuyOrders.push(element)
          } else {
            tmpSellOrders.push(element)
          }
        })

        tmpBuyOrders.sort(function (a, b) {
          if (a.price > b.price) return -1
          if (a.price < b.price) return 1
          return 0
        })

        tmpSellOrders.sort(function (a, b) {
          if (a.price < b.price) return -1
          if (a.price > b.price) return 1
          return 0
        })

        this.buyOrders = tmpBuyOrders
        this.sellOrders = tmpSellOrders
      })
    }
  }
}
</script>

<style>
</style>