<template>
  <div>
    <h1>Please input your personal info.</h1>
    <el-form>
      <el-row>
        <el-col :span="24">
          <el-form-item label="Name" class="login-input-item">
            <el-input v-model="username"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="Password" class="login-input-item">
            <el-input v-model="password" type="password"></el-input>
          </el-form-item>
        </el-col>
        <el-col v-if="isSignUp" :span="24">
          <el-form-item label="Password Confirm" class="login-input-item">
            <el-input v-model="passwordAgain" type="password"
                      @change="isSignUpPasswordRight = password === passwordAgain"></el-input>
            <span v-if="!isSignUpPasswordRight">Please input the same password!</span>
          </el-form-item>
        </el-col>

        <el-col :span="24" style="margin-top: 20px;">
          <el-button :type="isSignUp ? '' : 'primary'" @click.stop="signInClick">Sign In</el-button>
          <el-button :type="isSignUp ? 'primary' : ''" @click.stop="signUpClick">Sign Up</el-button>
        </el-col>
      </el-row>

    </el-form>
  </div>
</template>

<script lang="ts">
import Vuex from 'vuex';
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  protected isSignUp: boolean = false;
  protected isSignUpPasswordRight: boolean = true;
  private username: string = 'adbLarryRun';
  private password: string = 'addb2204';
  private passwordAgain: string = '';
  private signInClick() {
    if (this.isSignUp) {
      this.isSignUp = false;
    } else {
      // post to sign in

      const postUrl = 'http://10.141.246.21:9000/login?name=' + encodeURIComponent(this.username) +
        '&pwd=' + encodeURIComponent(this.password);
      axios.post(postUrl).then((resp) => {
        // console.log(resp.data);
        if (resp.data.status === 'ok') {
          // sign in ok
          this.$store.commit('changeUser', {
            id: resp.data.id,
            username: resp.data.name,
          });
          this.$router.push({
            name: 'home',
          });
        } else {
          this.$message.error('Username or Password not correct!');
        }
      });
    }
  }
  private signUpClick() {
    if (this.isSignUp && this.isSignUpPasswordRight) {
      // post to sign up

      // TODO just mock:
      this.$store.commit('changeUser', {
        id: 'A001114613O3F18Q5NVR6',
        username: 'adbLarryRun',
      });
      this.$router.push({
        name: 'home',
      });

      // this.$http.post('http://xxxxx:xxx/xxx', {
      //   username: this.username,
      //   password: this.password,
      // }).then((resp) => {
      //   if (resp.data.status === 'ok') {
      //     // sign up ok
      //   } else {
      //     this.$message.error('Username has conflict');
      //   }
      // });
    } else {
      this.isSignUp = true;
    }
  }
}
</script>

<style scoped lang="scss">
.login-input-item {
  width: 50%;
  margin: auto;
  min-width: 200px;
}
</style>