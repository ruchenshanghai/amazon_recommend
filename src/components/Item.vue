<template>
  <div>
    <el-row v-if="itemID">
      <el-col :span="4">
        <el-tag>Display {{ itemID }}'s detail</el-tag>
        <template v-if="!itemData">
          <h4>No Data</h4>
          <img src="http://ecx.images-amazon.com/images/I/51EzU6quNML._SX342_.jpg">
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component
export default class Item extends Vue {
  private itemID: string = '';
  private itemData: any = null;

  @Watch('itemID')
  private onItemIDChange() {
    console.log('ID changed ' + this.itemID);
  }

  private mounted() {
    this.itemID = this.$route.params.ID;
    console.log(this.itemID);
    axios.get(`http://10.141.246.21:9000/item/${this.itemID}`)
      .then((resp) => {
        this.itemData = resp.data.data;
        // console.log(resp.data);
      });
  }
}
</script>

<style scoped>

</style>