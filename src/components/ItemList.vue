<template>
  <div style="padding: 10px;">
    <h2>Fetch data by {{ param }}</h2>
    <el-row v-for="(item, index) in itemsList" :key="index" :gutter="10">
      <template v-if="isItems">
        <el-col :span="6">
          <el-tag type="success">{{ item.typeName }}</el-tag>
        </el-col>
        <el-col :span="24" v-for="(i, iIdx) in item.data" :key="'items' + iIdx">
          <router-link :to="{name: 'item', params: { ID: i.id}}" target='_blank'>
            <el-button type="text">{{ i.title }}</el-button>
          </router-link>
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
          <el-tag type="info">{{ item.asin }}</el-tag>
        </el-col>
        <el-col :span="6">
          <router-link :to="{name: 'item', params: { ID: item.id}}" target='_blank'>
            <el-tag type="info">{{ item.id }}</el-tag>
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

<style scoped>

</style>