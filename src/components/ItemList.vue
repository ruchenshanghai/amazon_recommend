<template>
  <div style="padding: 10px;">
    Fetch data by {{ param }}
    <el-row v-for="(type, index) in itemsList" :key="index" :gutter="10">
      <el-col :span="6">
        <el-tag type="success">{{ type.typeName }}</el-tag>
      </el-col>
      <el-col :span="4" v-for="(i, iIdx) in type.data" :key="iIdx">
        <router-link :to="{name: 'item', params: { ID: i}}">
          <el-button type="text">{{ i }}</el-button>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Watch, Vue} from 'vue-property-decorator';

@Component
export default class ItemList extends Vue {
  @Prop() private param!: string;
  private itemsList: any = [];
  private responseData: any = {
    Amazon_Instant_Video: [
      11, 22, 33,
    ],
    reviews_Toys_and_Games: [
      23, 321, 22,
    ],
  };

  @Watch('param', { immediate: true })
  private fetchParamChange() {
    this.itemsList = Object.entries(this.responseData).map((e) => {
      return {
        typeName: e[0],
        data: this.randomIntegerArray(20, 5000),
      };
    });
    // this.$http.get('http://xxxxx:xxx/xxx').then((resp) => {
    //   if (resp.data.status === 'ok') {
    //     this.itemsList = Object.entries(this.responseData).map((e) => {
    //       return {
    //         typeName: e[0],
    //         data: e[1],
    //       };
    //     });
    //   } else {
    //     this.$message.error('param not correct!');
    //   }
    // });
  }

  private randomIntegerArray(count: number, range: number): number[] {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(Math.ceil(Math.random() * range) + 1);
    }
    return result;
  }
}
</script>

<style scoped>

</style>