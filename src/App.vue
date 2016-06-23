<template>
  <div class="container-fluid">
    <div class="row" v-if="allLoaded">
      <div class="col-sm-2">
        <navigation v-bind:market-groups-list="marketGroupsList" v-bind:selected-type.sync="selectedType"></navigation>
      </div>
      <div class="col-sm-10">
        <content v-bind:selected-type="selectedType" v-bind:type-data="typeData"></content>
      </div>
    </div>
    <div v-else>
      <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">Loading...</div>
    </div>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import Content from './components/Content.vue'

var BASE_CREST_URL = 'https://crest-tq.eveonline.com/'

export default {
  name: 'app',

  components: {
    Navigation,
    Content
  },

  data: function () {
    return {
      regions: [],
      marketGroupsLookup: {},
      marketGroupsList: [],
      regionsLoaded: false,
      groupsLoaded: false,
      allLoaded: false,
      selectedType: null,
      typeData: null
    }
  },

  watch: {
    regionsLoaded: function (value, oldValue) {
      if (this.groupsLoaded === true) {
        this.allLoaded = true
      };
    },

    groupsLoaded: function (value, oldValue) {
      if (this.regionsLoaded === true) {
        this.allLoaded = true
      };
    },

    selectedType: function (value, oldValue) {
      window.history.pushState('', '', '?type=' + value)
      this.updateType()
    }
  },

  created: function () {
    var url = window.location.href
    var captured = /type=([^&]+)/.exec(url)

    if (captured) {
      this.selectedType = captured[1]
      this.updateType()
    }

    this.$http.get(BASE_CREST_URL).then(function (response) {
      this.getMarketGroups(response.data.marketGroups.href)
      this.getRegions(response.data.regions.href)
    })
  },

  methods: {
    'getRegions': function (regionsURL) {
      this.$http.get(regionsURL).then(function (response) {
        for (var i = 0; i < response.data.items.length; i++) {
          if (response.data.items[i].id < 11000000) {
            this.regions.push(response.data.items[i])
          };
        };

        this.regionsLoaded = true
      })
    },

    'getMarketGroups': function (marketGroupsURL) {
      this.$http.get(marketGroupsURL).then(function (response) {
        for (var i = 0; i < response.data.items.length; i++) {
          if (!response.data.items[i].hasOwnProperty('children')) {
            response.data.items[i].children = []
          };

          response.data.items[i].typesDownloaded = false

          this.marketGroupsLookup[response.data.items[i].id] = response.data.items[i]
        }

        for (var groupID in this.marketGroupsLookup) {
          var thisMaretGroup = this.marketGroupsLookup[groupID]

          if (thisMaretGroup.hasOwnProperty('parentGroup')) {
            this.marketGroupsLookup[thisMaretGroup.parentGroup.id].children.push(thisMaretGroup)
          } else {
            this.marketGroupsList.push(thisMaretGroup)
          }
        }

        this.marketGroupsList.sort(function (a, b) {
          var nameA = a.name.toLowerCase()
          var nameB = b.name.toLowerCase()

          if (nameA < nameB) return -1
          if (nameA > nameB) return 1
          return 0
        })

        this.groupsLoaded = true
      })
    },

    'updateType': function () {
      this.$http.get(this.selectedType).then(function (response) {
        var tmpDogmaAttributes = {}
        response.data.dogma.attributes.forEach(function (attribute) {
          tmpDogmaAttributes[attribute.attribute.id] = attribute
        })

        response.data.dogma.attributeLookup = tmpDogmaAttributes

        this.typeData = response.data
      })
    }
  }
}
</script>

<style>
[v-cloak] {
  display: none;
}
</style>