

var BASE_CREST_URL = "https://crest-tq.eveonline.com/";
// var BASE_CREST_URL = "https://api-sisi.testeveonline.com/";
var DEFAULT_REGION = "https://crest-tq.eveonline.com/market/10000002/orders/";  // The Forge


Vue.component('market-group', {
  template: '#market-group-template',
  props: [
    'model',
    'selectedType'
  ],

  data: function() {
    return {
      open: false
    }
  },

  methods: {
    toggle: function() {
      if (!this.model.typesDownloaded && this.model.children.length == 0) {
        this.model.typeChildren = []

        this.$http.get(this.model.types.href).then(function(response) {
          for (var i = 0; i < response.data.items.length; i++) {
            this.model.typeChildren.push(response.data.items[i]);
          };

          this.model.typesDownloaded = true;
        });
      }

      this.model.children.sort(function(a, b) {
        var nameA=a.name.toLowerCase();
        var nameB=b.name.toLowerCase();

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0
      })

      this.open = !this.open;
    }
  }
})


Vue.component('market-item', {
  template: '#market-item-template',
  props: [
    'model',
    'selectedType'
  ],

  methods: {
    selected: function() {
      this.selectedType = this.model.type.href;
    }
  }
})


Vue.component('orders', {
  template: '#orders-template',
  data: function() {
    return {
      buyOrders: [],
      sellOrders: []
    }
  },

  props: [
    'selectedType'
  ],

  watch: {
    selectedType: function() {
      this.buyOrders = [];
      this.sellOrders = [];

      this.$http.get(DEFAULT_REGION, {"type": this.selectedType}).then(function(response) {
        tmpBuyOrders = [];
        tmpSellOrders = [];

        response.data.items.forEach(function(element, index, array) {
          if (element.buy) {
            tmpBuyOrders.push(element);
          } else {
            tmpSellOrders.push(element);
          }
        })



        tmpBuyOrders.sort(function(a, b) {
          if (a.price < b.price) return -1
          if (a.price > b.price) return 1
          return 0
        })

        tmpSellOrders.sort(function(a, b) {
          if (a.price < b.price) return -1
          if (a.price > b.price) return 1
          return 0
        })

        this.buyOrders = tmpBuyOrders;
        this.sellOrders = tmpSellOrders;
      })
    }
  }
})


// Vue.component('region-selector', {
//   template: '#region-selector-template',

//   props: [
//     'regions',
//     'selectedRegion'
//   ],

//   methods: {
//     selectRegion: function() {
//       this.selectedRegion = this.model.type.href;
//     }
//   }
// })


new Vue({
  el: "#market",

  data: {
    regions: [],
    marketGroupsLookup: {},
    marketGroupsList: [],
    regionsLoaded: false,
    groupsLoaded: false,
    allLoaded: false,
    selectedType: null
  },

  watch: {
    regionsLoaded: function(value, oldValue) {
      if (this.groupsLoaded == true) {
        this.allLoaded = true;
      };
    },

    groupsLoaded: function(value, oldValue) {
      if (this.regionsLoaded == true) {
        this.allLoaded = true;
      };
    }
  },

  created: function() {
    this.$http.get(BASE_CREST_URL).then(function(response) {
      this.getMarketGroups(response.data.marketGroups.href);
      this.getRegions(response.data.regions.href);
    });
  },

  methods: {
    "getRegions": function(regionsURL) {
      this.$http.get(regionsURL).then(function(response) {
        for (var i = 0; i < response.data.items.length; i++) {
          if (response.data.items[i].id < 11000000) {
            this.regions.push(response.data.items[i]);
          };
        };

        this.regionsLoaded = true;
      });
    },

    "getMarketGroups": function(marketGroupsURL) {
      this.$http.get(marketGroupsURL).then(function(response) {
        for (var i = 0; i < response.data.items.length; i++) {
          if (!response.data.items[i].hasOwnProperty("children")) {
            response.data.items[i].children = []
          };

          response.data.items[i].typesDownloaded = false;

          this.marketGroupsLookup[response.data.items[i].id] = response.data.items[i];
        };

        for (var groupID in this.marketGroupsLookup) {
          var thisMaretGroup = this.marketGroupsLookup[groupID];

          if (thisMaretGroup.hasOwnProperty("parentGroup")) {
            this.marketGroupsLookup[thisMaretGroup.parentGroup.id].children.push(thisMaretGroup);
          } else {
            this.marketGroupsList.push(thisMaretGroup);
          };
        };

        this.marketGroupsList.sort(function(a, b) {
          var nameA=a.name.toLowerCase();
          var nameB=b.name.toLowerCase();

          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0
        })

        this.groupsLoaded = true;
      });
    },

    "isFinishedLoading": function() {
      return this.allLoaded;
    }
  },
});
