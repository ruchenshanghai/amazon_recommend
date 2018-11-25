<template>
  <div class="home">
    <h1>Welcome to Amazon Product Recommendation</h1>
    <template v-if="!currentUser">
      <router-link :to="{name: 'login'}">
        <p>Please click here to login system and enjoy yourself!</p>
        <img alt="Vue logo" src="../assets/logo.png">
      </router-link>
      <ItemList param="items/hot"></ItemList>
    </template>
    <template v-else>
      <el-row>
        <el-button @click="itemsParam = 'items/hot'">Hot items</el-button>
        <el-button @click="itemsParam = 'items/' + currentUser.id">Customized items</el-button>
        <el-button @click="itemsParam = 'reviews/' + currentUser.id">Review records</el-button>
      </el-row>
      <ItemList v-if="itemsParam" :param="itemsParam"></ItemList>
    </template>
  </div>
</template>

<script lang="ts">
import Vuex from 'vuex';
import { Component, Vue } from 'vue-property-decorator';
import ItemList from '@/components/ItemList.vue';

@Component({
  components: {
    ItemList,
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
  },
})
export default class Home extends Vue {
  private itemsParam: string = '';
}
</script>
