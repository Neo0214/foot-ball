<template>
  <div>
    <div class="main">
      <el-card class="register" :body-class="register">
        <div class="mycard">
          <div class="head-line scale-in-hor-center"></div>
          <div class="header">
            <h1>REGISTER</h1>
          </div>
          <div class="form">
            <div style="margin-bottom: 5px;font-size: 15px;">用户名:</div>
            <el-input v-model="user.name" style="height:30px;">
            </el-input>
          </div>
          <div class="form">
            <div style="margin-bottom: 5px;font-size: 15px;">邮箱:</div>
            <el-input v-model="user.email" style="height:30px;">
            </el-input>
          </div>
          <div class="form">
            <div style="margin-bottom: 5px;font-size: 15px;">电话:</div>
            <el-input v-model="user.teleNumber" style="height:30px;">
            </el-input>
          </div>
          <div class="form">
            <div style="margin-bottom: 5px;font-size: 15px;">住址:</div>
            <el-input v-model="user.address" style="height:30px;">
            </el-input>
          </div>
          <div class="form">
            <div style="margin-bottom: 5px;font-size: 15px;">密码:</div>
            <el-input v-model="user.password" style="height:30px;">
            </el-input>
          </div>
          <div class="bottom">
            <el-button class="btn" type="primary" @click="Register">
              立即注册
            </el-button>
          </div>

        </div>
      </el-card>
    </div>
  </div>

</template>



<script>
export default {
  name: 'PageRegister',
  data() {
    return {
      user: {
        name: '',
        email: '',
        teleNumber: '',
        address: '',
        password: ''
      }
    }
  },
  methods: {
    Register() {
      this.$axios.post('/api/user/register', {
        name: this.user.name,
        email: this.user.email,
        teleNumber: this.user.teleNumber,
        address: this.user.address,
        password: this.user.password
      }).then(res => {
        if (res.data == 'success') {
          this.$message.success('注册成功')
          this.$router.go(-1)
        }
        else {
          this.$message.error('注册失败')
          console.log(res.data.message)
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

.register {
  width: 30%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 0;
  margin: 0;
  box-shadow: 4px solid #000000;
}

.register>>>.el-card__body {
  padding: 0;
  width: 80%;
}

.bottom {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3%;
}

.header {
  width: 100%;
  display: flex;
  justify-content: center;
}

.form {
  width: 80%;
  padding: 6px;
  margin: 1% 0%;
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

.btn {
  width: 30%;
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