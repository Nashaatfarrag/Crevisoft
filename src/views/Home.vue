<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="3">
        <v-text-field
          outlined
          label="from"
          v-model="searchKeys.from"
          type="date"
        ></v-text-field
      ></v-col>

      <v-col cols="12" md="3">
        <v-text-field
          outlined
          type="date"
          label="to"
          v-model="searchKeys.to"
        ></v-text-field
      ></v-col>
      <v-col cols="12" md="3" large>
        <v-btn @click="getData">search</v-btn></v-col
      >
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="filterKeys.name"
          outlined
          label="hotel name"
        ></v-text-field>
        <v-slider
          v-model="filterKeys.price"
          hint="Im a hint"
          max="500"
          min="0"
        ></v-slider>
        {{ "max price : " + filterKeys.price }}
      </v-col>

      <v-col cols="12" md="9">
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col>
                {{ "Hotels found : " + filtered.length || hotels.length }}
              </v-col>
              <v-col>
                <v-btn @click="flip('byName')" class="ma-1">
                  sort by name</v-btn
                >
                <v-btn @click="flip('byPrice')" class="ma-1">
                  sort by price
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            v-for="hotel in filtered || hotels"
            :key="hotel.id"
            cols="12"
            md="4"
          >
            <v-card>
              <v-card-title> {{ hotel.name }}</v-card-title>

              <v-card-subtitle>{{ hotel.city }}</v-card-subtitle>
              <v-card-text>{{ "price : " + hotel.price }}</v-card-text>
            </v-card></v-col
          >
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const api = require("../service/api");
const _ = require("lodash");
export default {
  mounted() {},
  data() {
    return {
      hotels: [],
      filterKeys: {
        price: 1000,
        name: "",
        byName: false,
        byPrice: false
      },
      searchKeys: {
        from: "2020-01-10",
        to: "2021-01-20"
      }
    };
  },

  computed: {
    filtered() {
      let output = [];

      // forced filter by price range
      output = this.hotels.filter(
        hotel => hotel.price <= this.filterKeys.price
      );
      // search by name
      if (this.filterKeys.name) {
        output = output.filter(hotel =>
          hotel.name.includes(this.filterKeys.name)
        );
      }

      if (this.filterKeys.byName) {
        output = _.sortBy(output, ["name"]);
      }

      if (this.filterKeys.byPrice) {
        output = _.sortBy(output, ["price"]);
      }

      return output;
    }
  },
  methods: {
    flip(val) {
      this.filterKeys[val] = !this.filterKeys[val];
    },
    async getData() {
      let value = await api.getData();
      this.hotels = value.data;

      let from = new Date(this.searchKeys.from);
      let to = new Date(this.searchKeys.to);
      this.hotels = this.hotels.filter(hotel => {
        let elementDate = new Date(hotel.available_on);
        return elementDate <= to && elementDate >= from;
      });
    }
  },

  name: "Home"
};
</script>
<style></style>
