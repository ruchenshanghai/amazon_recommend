<template>
  <div class="home">
    <h1>Welcome to Amazon Product Recommendation</h1>
    <router-link v-if="!currentUser" :to="{name: 'login'}">
      <img alt="Vue logo" src="../assets/logo.png">
      <p>Please click here to login system and enjoy yourself!</p>
    </router-link>
    <template v-else>
      <el-row>
        <el-button @click="itemsParam = 'items/hot'">Hot items</el-button>
        <el-button @click="itemsParam = 'items/' + currentUser.username">Customized items</el-button>
        <el-button @click="itemsParam = 'reviews/' + currentUser.username">Review records</el-button>
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
