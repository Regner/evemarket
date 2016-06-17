

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
    regions: {},
    regionsSorted: [],
    marketTypes: {},
    marketGroups: {},
    marketGroupsSorted: [],
    totalResources: 0,
    loadedResources: 0,
    loadingProgress: 0,
    finishedLoading: false
  },

  watch: {
    totalResources: function(value, oldValue) {
    },

    loadedResources: function(value, oldValue) {
      this.loadingProgress = 100 * this.loadedResources / this.totalResources;
    },

    finishedLoading: function(value, oldValue) {
      // console.log(this.finishedLoading);
    },

    loadingProgress: function(value, oldValue) {
      if (this.totalResources >= 5000) {
        if (this.loadedResources == this.totalResources) {
          this.sortData();

          this.finishedLoading = true;
        };
      };
    }
  },

  created: function() {
    this.$http.get(BASE_CREST_URL).then(function(response) {
      // this.getTypes(response.data.marketTypes.href);
      this.getMarketGroups(response.data.marketGroups.href);
      this.getRegions(response.data.regions.href);
    });
  },

  methods: {
    "getTypes": function(itemTypesURL) {
      this.crawlCREST(itemTypesURL, this.marketTypes, true);
    },

    "getRegions": function(regionsURL) {
      this.crawlCREST(regionsURL, this.regions, true);
    },

    "getMarketGroups": function(marketGroupsURL) {
      this.crawlCREST(marketGroupsURL, this.marketGroups, true);
    },

    "crawlCREST": function(url, targetObj, firstPage = false) {
      this.$http.get(url).then(function(response) {
        if (firstPage) {
          this.totalResources += response.data.totalCount;
        }

        for (var i = 0; i < response.data.items.length; i++) {
          targetObj[response.data.items[i].id] = response.data.items[i];
          this.loadedResources++
        };

        if (response.data.hasOwnProperty("next")) {
          this.crawlCREST(response.data.next.href, targetObj);
        }
      });
    },

    "isFinishedLoading": function() {
      if (this.finishedLoading == true) {
        return true
      } else {
        return false
      }
    },

    "sortData": function() {
      this.sortMarketGroups();
      this.sortRegions();
      // this.sortMarketTypes();
      // console.log(this.marketGroups);

      // for (var groupID in this.marketGroups) {
      //   this.marketGroups[parentGroupID].children.sort(function(a, b) {
      //     sortCrestThings(a, b);
      //   });
      // };
    },

    "sortMarketGroups": function() {
      for (var groupID in this.marketGroups) {
        if (!this.marketGroups[groupID].hasOwnProperty("children")) {
          this.marketGroups[groupID].children = []
        };

        this.marketGroups[groupID].isGroup = true;
      };

      for (var groupID in this.marketGroups) {
        if (this.marketGroups[groupID].hasOwnProperty("parentGroup")) {
          parentGroupID = this.marketGroups[groupID].parentGroup.id;
          this.marketGroups[parentGroupID].children.push(this.marketGroups[groupID]);
        } else {
          this.marketGroupsSorted.push(this.marketGroups[groupID]);
        };
      };

      this.marketGroupsSorted.sort(function(a, b) {
        sortCrestThings(a, b);
      });
    },

    "sortMarketTypes": function() {
      for (var typeID in this.marketTypes) {
        this.marketTypes[typeID].isGroup = false;
        marketGroupID = this.marketTypes[typeID].marketGroup.id;
        this.marketGroups[marketGroupID].children.push(this.marketTypes[typeID]);
      };
    },

    "sortRegions": function() {
      for (var regionID in this.regions) {
        // WH regions start at 11000000 and we want to skip them
        if (regionID < 11000000) {
          this.regionsSorted.push(this.regions[regionID])
        }
      }

      this.regionsSorted.sort(function(a, b) {
        sortCrestThings(a, b);
      })
    },
  },
});


function sortCrestThings(a, b) {
  var nameA=a.name.toLowerCase();
  var nameB=b.name.toLowerCase();

  if (nameA < nameB)
    return -1
  if (nameA > nameB)
    return 1
  return 0
};
