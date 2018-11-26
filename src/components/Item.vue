<template>
  <div>
    <el-row v-if="itemID">
      <el-col :span="4">
        <el-tag>Display {{ itemID }}'s detail</el-tag>
      </el-col>

      <template v-if="!itemData">
        <el-col :span="24">
          <h4>No Data</h4>
          <img src="http://ecx.images-amazon.com/images/I/51EzU6quNML._SX342_.jpg" />
        </el-col>
      </template>
      <template v-else>
        <el-col :span="24">
          <el-tag type="success">title: {{ itemData.title }}</el-tag>
        </el-col>
        <el-col :span="24">
          <el-tag type="info" class="info-tag">categories: {{ itemData.categories }}</el-tag>
          <el-tag type="info" class="info-tag">brand: {{ itemData.brand }}</el-tag>
          <el-tag type="info" class="info-tag">price: {{ itemData.price }}</el-tag>
        </el-col>
        <img v-if="itemData.imUrl" :src="itemData.imUrl" />
        <el-col :span="24" style="padding: 20px">
          <p>description: </p>
          <p style="text-align: left">{{ itemData.description }}</p>
        </el-col>
      </template>
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

<style scoped lang="scss">
.info-tag {
  margin: 10px;
}
</style>