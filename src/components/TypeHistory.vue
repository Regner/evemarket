<template>
  <div v-if="selectedType">
    <vue-chart
      v-bind:columns="columns"
      v-bind:rows="rows"
      v-bind:options="options">
    </vue-chart>
  </div>
  <div v-else>Please select a type</div>
</template>

<script>
var DEFAULT_REGION = 'https://crest-tq.eveonline.com/market/10000002/history/'  // The Forge

export default {
  name: 'TypeHistory',

  data: function () {
    return {
      columns: [
        {
          'type': 'string',
          'label': 'Date'
        },
        {
          'type': 'number',
          'label': 'Average Price'
        },
        {
          'type': 'number',
          'label': 'High Price'
        },
        {
          'type': 'number',
          'label': 'Low Price'
        },
        {
          'type': 'number',
          'label': 'Volume'
        }
      ],
      rows: [
        ['2015-05-01T00:00:00', 327999999.97, 327999999.97, 327999999.97, 5],
        ['2015-05-04T00:00:00', 282000007.26, 315999999.99, 265000010.9, 10],
        ['2015-05-07T00:00:00', 309999999.99, 309999999.99, 309999999.99, 3]
      ],
      options: {
        series: {
          4: {
            targetAxisIndex: 1
          }
        }
      }
    }
  },

  props: [
    'selectedType'
  ],

  watch: {
    selectedType: function () {
      this.updateHistory()
    }
  },

  created: function () {
    if (this.selectedType) {
      this.updateHistory()
    }
  },

  methods: {
    'updateHistory': function () {
      // this.columns = ['thing', 'test 1', 'test 2', 'test 3']
      // this.rows = [
      //   [1, 10, 10, 10],
      //   [2, 10, 11, 12],
      //   [3, 10, 15, 20]
      // ]

      this.$http.get(DEFAULT_REGION, {'type': this.selectedType}).then(function (response) {
        console.log(response)
      })
    }
  }
}
</script>

<style>
</style>