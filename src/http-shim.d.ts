// 1. Make sure to import 'vue' before declaring augmented types
import Vue from 'vue';
import { HttpOptions, HttpResponse, $http } from 'vue-resource/types/vue_resource';

// 2. Specify a file with the types you want to augment
//    Vue has the constructor type in types/vue.d.ts
declare module 'vue/types/vue' {
  // 3. Declare augmentation for Vue
  interface Vue {
    $http: { (options: HttpOptions): PromiseLike<HttpResponse>; get: $http; post: $http; put: $http; patch: $http; delete: $http; jsonp: $http; }
  }
}