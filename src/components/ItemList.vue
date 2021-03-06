<template>
  <div style="padding: 10px;">
    <h2>Fetch data by {{ param }}</h2>
    <el-row v-for="(item, index) in itemsList" :key="index" :gutter="10" style="margin: 20px 0;">
      <template v-if="isItems">
        <el-col :span="6">
          <el-tag type="success">{{ item.typeName }}</el-tag>
        </el-col>
        <el-col :span="24">
          <el-carousel type="card" :autoplay="false">
            <el-carousel-item v-for="(i, iIdx) in item.data"
                              :key="'carousel' + iIdx" v-if="i.asin">
              <div class="carousel-div" @click="$router.push({name: 'item', params: { ID: i.asin}})">
                <div class="info-div">{{ i.title }}</div>
                <div class="info-div">{{ i.asin }}</div>
                <img v-if="i.imUrl" :src="i.imUrl" class="item-list-img" />
              </div>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </template>
      <template v-else-if="isReviews">
        <el-col :span="6">
          <el-tag type="success">{{ item.reviewerName }} - {{ item.reviewTime }}</el-tag>
        </el-col>
        <el-col :span="6">
          <el-tag type="info">{{ item.overall }}</el-tag>
        </el-col>
        <el-col :span="6">
          <router-link :to="{name: 'item', params: { ID: item.asin}}">
            <el-tag type="info">ASIN: {{ item.asin }}</el-tag>
          </router-link>
        </el-col>
        <el-col :span="24">
          <h4>{{ item.summary }}</h4>
          <p>{{ item.reviewText }}</p>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script lang="ts">
  import axios from 'axios';
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';

  @Component
export default class ItemList extends Vue {
  @Prop() private param!: string;
  private itemsList: any = [];
  private loading: any = null;

  get isItems(): boolean {
    return Boolean(this.param) && this.param.startsWith('items/');
  }

  get isReviews(): boolean {
    return Boolean(this.param) && this.param.startsWith('reviews/');
  }

  @Watch('param', { immediate: true })
  private fetchParamChange() {
    // if (this.isItems) {
    //   const templateData = {
    //     Clothing_Shoes_and_Jewelry: [
    //       {
    //         imUrl: 'http://ecx.images-amazon.com/images/I/314qZjYevsL.jpg',
    //         asin: '0000031887',
    //         id: '5bed9825f3e9e96d4cb71f51',
    //         title: 'Ballet Dress-Up Fairy Tutu',
    //       },
    //       {
    //         imUrl: 'http://ecx.images-amazon.com/images/I/314qZjYevsL.jpg',
    //         asin: '0000031887',
    //         id: '5bed9825f3e9e96d4cb71f51',
    //         title: 'Ballet Dress-Up Fairy Tutu',
    //       },
    //     ],
    //   };
    //   this.itemsList = Object.entries(templateData)
    //     .filter((e) => e[1].length >= 1 && e[1].findIndex((i) => i !== null) > -1)
    //     .map((e) => {
    //       return {
    //         typeName: e[0],
    //         data: e[1].filter((i) => i),
    //       };
    //     });
    // } else if (this.isReviews) {
    //   this.itemsList = [
    //     {
    //       summary: 'A little bit boring for me',
    //       reviewerName: 'AdrianaM',
    //       reviewText: 'I had big expectations because I love English ' +
    //         'TV, in particular Investigative and detective ' +
    //         'stuff but this guy is really boring. It didn\'t appeal to me at all.',
    //       reviewTime: '05 3, 2014',
    //     },
    //   ];
    // }

    if (this.isItems) {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      axios.get(`http://10.141.246.21:9000/${this.param}`)
        .then((resp) => {
          // console.log(resp.data);
          const templateData = resp.data;
          // const templateData = {
          //   Clothing_Shoes_and_Jewelry: [
          //     {
          //       imUrl: 'http://ecx.images-amazon.com/images/I/314qZjYevsL.jpg',
          //       asin: '0000031887',
          //       id: '5bed9825f3e9e96d4cb71f51',
          //       title: 'Ballet Dress-Up Fairy Tutu',
          //     },
          //     {
          //       imUrl: 'http://ecx.images-amazon.com/images/I/314qZjYevsL.jpg',
          //       asin: '0000031887',
          //       id: '5bed9825f3e9e96d4cb71f51',
          //       title: 'Ballet Dress-Up Fairy Tutu',
          //     },
          //   ],
          // };
          this.itemsList = Object.entries(templateData)
            .filter((e) => (e[1] as any).length >= 1 && (e[1] as any).findIndex((i: any) => i !== null) > -1)
            .map((e) => {
              return {
                typeName: e[0],
                data: (e[1] as any).filter((i: any) => i),
              };
            });
        }).finally(() => {
        this.loading.close();
      });
    } else if (this.isReviews) {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      axios.get(`http://10.141.246.21:9000/${this.param}`)
        .then((resp) => {
          // console.log(resp.data);
          this.itemsList = resp.data;
        }).finally(() => {
        this.loading.close();
      });
    }

  }
}
</script>

<style scoped lang="scss">
  .info-div {
    background-color: rgba(144,147,153,.1);
    color: #909399;
    padding: 0 10px;
    line-height: 30px;
    font-size: 12px;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid rgba(144,147,153,.2);
    max-width: 200px;
    max-height: 60px;
    overflow: hidden;
    margin: 5px 0;
  }
  .carousel-div {
    padding: 0 10px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>