<template>
  <div v-if="rows">
    <vue-chart
      chart-type="ComboChart"
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
      rows: null,
      options: {
        title: 'Market History',
        seriesType: 'bars',
        series: {
          0: {
            type: 'line'
          },
          1: {
            type: 'line'
          },
          2: {
            type: 'line'
          },
          3: {
            type: 'bar',
            targetAxisIndex: 2
          }
        },
        vAxes: {
          1: {
            title: ''
          },
          2: {
            title: ''
          }
        },
        width: 1200,
        height: 400
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
      var tmpRows = []

      this.$http.get(DEFAULT_REGION, {'type': this.selectedType}).then(function (response) {
        response.data.items.forEach(function (day) {
          var date = day.date.substring(0, 10)
          tmpRows.push([date, day.avgPrice, day.highPrice, day.lowPrice, day.volume])
        })

        this.rows = tmpRows
      })
    }
  }
}
</script>

<style>
</style>