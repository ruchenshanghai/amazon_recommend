<template>
  <div>
    <el-row v-if="itemID">
      <el-col :span="4">
        <el-tag>Display {{ itemID }}'s detail</el-tag>
        <img src="http://ecx.images-amazon.com/images/I/51EzU6quNML._SX342_.jpg">
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component
export default class Item extends Vue {
  private itemID: string = '';

  @Watch('itemID')
  private onItemIDChange() {
    console.log('ID changed ' + this.itemID);
  }

  private mounted() {
    this.itemID = this.$route.params.ID;
    console.log(this.itemID);
  }
}
</script>

<style scoped>

</style>