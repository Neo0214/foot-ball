<template>
  <div>
    <div class="main">
      <el-card class="login" :body-class="login">
        <div class="mycard">
          <div class="head-line scale-in-hor-center"></div>
          <div class="header">
            <h1>LOGIN</h1>
          </div>
          <div class="form">
            <div style="margin-bottom: 5px;font-size: 20px;">用户名:</div>
            <el-input v-model="userName" style="height:40px;">
            </el-input>
          </div>
          <div class="form">
            <div style="font-size: 20px;">密码:</div>
            <el-input v-model="password" style="height:40px;">
            </el-input>
          </div>
          <div class="bottom">
          <el-button class="btn" type="primary" @click="Login">
            登录
          </el-button>
          <el-text style="margin-top: 10px;position:absolute;right:0;">没有账号？<router-link to="/register">点击注册</router-link></el-text>
          </div>
        </div>
      </el-card>
    </div>
  </div>

</template>

<script>
export default {
  name: 'PageLogin',
  data() {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    Login() {
      this.$axios.post('/api/user/login', {
        userName: this.userName,
        password: this.password
      }).then(res => {
        if (res.data.message == 'success') {
          localStorage.setItem('id', res.data.id);
          localStorage.setItem('token', res.data.token);
          this.$message.success('登录成功')
          this.$router.push('/home')
        }
        else {
          this.$message.error('用户名或密码错误')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('网络连接失败')
      })
    }
  }
}
</script>


<style scoped>
.main {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/images/bg.jpg');
}

.login {
  width: 30%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 0;
  margin: 0;
  box-shadow: 4px solid #000000;
}

.login>>>.el-card__body {
  padding: 0;
  width:80%;
}
.bottom{
  position:relative;
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header {
  width: 100%;
  display: flex;
  justify-content: center;
}

.form {
  width: 100%;
  padding: 6px;
  margin: 5% 0%;
  display: flex;
  flex-direction: column;

}

.mycard {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.btn{
  width:30%;
}

.head-line {
  width: 35%;
  height: 3px;
  background-color: #ffffff;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(17.5px);
  -webkit-backdrop-filter: blur(17.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.scale-in-hor-center {
  -webkit-animation: scale-in-hor-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: scale-in-hor-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}


/**
 * ----------------------------------------
 * animation scale-in-hor-center
 * ----------------------------------------
 */
@-webkit-keyframes scale-in-hor-center {
  0% {
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    opacity: 1;
  }

  100% {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
    opacity: 1;
  }
}

@keyframes scale-in-hor-center {
  0% {
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    opacity: 1;
  }

  100% {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
    opacity: 1;
  }
}
</style>