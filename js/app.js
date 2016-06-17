

var BASE_CREST_URL = "https://crest-tq.eveonline.com/";
// var BASE_CREST_URL = "https://api-sisi.testeveonline.com/";
var DEFAULT_REGION = 10000002;  // The Forge


Vue.component('item', {
  template: '#item-template',
  props: {
    model: Object
  },

  data: function () {
    return {
      open: false
    }
  },

  computed: {
    isFolder: function () {
      return this.model.isGroup
    }
  },

  methods: {
    toggle: function () {
      if (this.model.isGroup) {
        this.open = !this.open
      }
    }
  }
})


new Vue({
  el: "#market",

  data: {
    regions: [],
    marketGroupsLookup: {},
    marketGroupsList: [],
    regionsLoaded: false,
    groupsLoaded: false,
    allLoaded: false
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

          response.data.items[i].isGroup = true;

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

        this.groupsLoaded = true;
      });
    },

    "isFinishedLoading": function() {
      return this.allLoaded;
    }
  },
});

