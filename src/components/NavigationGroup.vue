<template>
<li>
  <label v-on:click="toggle"><span class="glyphicon {{open ? 'glyphicon-chevron-down' : 'glyphicon-chevron-right'}}"></span> {{ group.name }}</label>
    <ul v-show="open">
      <navigation-group v-for="mg in group.children" v-bind:group="mg" v-bind:selected-type.sync="selectedType"></navigation-group>
      <div v-if="group.typesDownloaded">
        <navigation-item  v-for="item in group.typeChildren" v-bind:item="item" v-bind:selected-type.sync="selectedType"></market-item>
      </div>
    </ul>
</li>
</template>

<script>
import NavigationItem from './NavigationItem.vue'

export default {
  name: 'NavigationGroup',

  components: {
    NavigationItem
  },

  props: [
    'group',
    'selectedType'
  ],

  data () {
    return {
      open: false
    }
  },

  methods: {
    toggle: function () {
      if (!this.group.typesDownloaded && this.group.children.length === 0) {
        this.group.typeChildren = []

        this.$http.get(this.group.types.href).then(function (response) {
          for (var i = 0; i < response.data.items.length; i++) {
            this.group.typeChildren.push(response.data.items[i])
          };

          this.group.typesDownloaded = true
        })
      }

      this.group.children.sort(function (a, b) {
        var nameA = a.name.toLowerCase()
        var nameB = b.name.toLowerCase()

        if (nameA < nameB) return -1
        if (nameA > nameB) return 1
        return 0
      })

      this.open = !this.open
    }
  }
}
</script>

<style>
</style>