<template>
  <div>
    <div class="main">
      <el-card class="login" :body-class="login">
        <div class="mycard">
          <div class="header">
            <h1>欢迎回来</h1>
          </div>
          <div class="form">
            <div style="margin-bottom: 5px;">用户名:</div>
            <el-input v-model="userName">
            </el-input>
          </div>
          <div class="form">
            <div style="margin-bottom: 5px;">密码:</div>
            <el-input v-model="password">
            </el-input>
          </div>
          <el-button class="btn" type="primary" @click="Login">
            登录
          </el-button>
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
  width: 40%;
  height: 55%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 0;
  margin: 0;
  box-shadow: 4px solid #000000;
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
</style>