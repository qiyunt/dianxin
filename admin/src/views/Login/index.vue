<template>
  <div class="login-bg">
    <div class="round"></div>

    <div class="form-bg">
      <div class="title">欢迎使用云监工</div>
      <div class="content">
        <div class="input-box">
          <input v-model="infoModal.info.phone" placeholder="请输入您的用户名">
        </div>
        <div class="input-box">
          <input v-model="infoModal.info.password" placeholder="请输入您的密码" type="password">
        </div>
        <div v-if="infoModal.show" class="input-box">
          <input v-model="infoModal.info.password2" placeholder="请再次输入您的密码" type="password">
        </div>

        <div class="config">
          <div class="flex align-center">
            <input v-model="infoModal.checked" type="checkbox">
            <span>记住账号</span>
          </div>
          <span>忘记密码?</span>
        </div>

        <div class="btn-box">
          <div class="flex align-center justify-between">
            <div class="btn clear flex align-center justify-center" @click="infoModal.zhuce()">注册</div>
            <div class="btn login flex align-center justify-center" @click="infoModal.submit()">登录</div>
          </div>
          <div class="btn tutorial flex align-center justify-center">点心云监工使用教程</div>
        </div>
        <div class="theme-btn flex align-center justify-around">
          <div class="locale-box">
            <img alt="" class="theme-icon" src="@/assets/img/locale.png" @click="selectModal.openModal()">
            <div class="locale" v-if="selectModal.show">
                <div class="it active">English</div>
                <div class="it">日本語</div>
                <div class="it">简体中文</div>
                <div class="it">繁體中文</div>
            </div>
            <div class="locale-bg"></div>
          </div>
          <img v-if="theme === 'light'" alt="" class="theme-icon" src="@/assets/img/mone.png" @click="changeTheme">
          <img v-else alt="" class="theme-icon" src="@/assets/img/sun.png" @click="changeTheme">
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {reactive, ref} from "vue";
import { useRouter } from "vue-router";
import request from "@/request/request";

const router = useRouter()

const theme = ref(localStorage.getItem("theme") || 'light')

const themeInfo = ref({})


const s = reactive({
  show: false,

})


const selectModal = reactive({
  show: false,
  openModal() {
    selectModal.show = !selectModal.show
  },
  closeModal() {
    selectModal.show = false
  }
})
const infoModal = reactive({
  show:false,
  checked: false,
  info: {
    phone: '',
    password: '',
  },
  changeCheck() {
    infoModal.checked = !infoModal.checked
  },
  getInfo() {
    const {check, phone, password} = JSON.parse(localStorage.getItem('config')) || {}
    if (check) {
      infoModal.info.phone = phone
      infoModal.info.password = password
      infoModal.checked = check
    }
  },
  submit() {
    var that = this;
    if (this.info.phone.length == 0 || this.info.password.length == 0) {
      alert("请输入账号密码");
      return;
    }
    request({
                method: 'Get',
                url: '/user/login?username=' + that.info.phone + '&password=' + that.info.password,
    }).then(res => {
              console.log(res);
                if (res.data.code == 500) {
                  alert(res.data.msg);
                } else if (res.data.code == 200) {
                  localStorage.setItem("ttoken",res.data.data);
                    router.push({name: 'Home'})
                } else {
                    alert(res.data.msg);
                }
            }).catch(err => {
              alert("网络连接失败");
            })
  },
  zhuce() {
    // this.show = true;
    var that = this;
    if (this.info.phone.length == 0 || this.info.password.length == 0) {
      alert("请输入账号密码");
      return;
    }
    request({
                method: 'Post',
      url: '/user/register',
      data: {
        username: this.info.phone,
                  password:this.info.password
                }
    }).then(res => {
              console.log(res);
                if (res.data.code == 500) {
                  alert(res.data.msg);
                } else if (res.data.code == 200) {
                    alert(res.data.msg);
                } else {
                    alert(res.data.msg);
                }
            }).catch(err => {
                that.$message.error("网络连接失败");
            })

  }
})
infoModal.getInfo()

const changeTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
  getThemeInfo()
}
const getThemeInfo = () => {
  if (theme.value === 'light') {
    themeInfo.value = {
      bg: "#A9C6FF",
      from_bg: "#fff",
      title: "#0391FF",
      input_bg: "#F2F3F5",
      input_plc: "#A0A2A3",
      config_text: "#8D8C93",
      clear_text: "#30748F",
      clear_bg: "#DBF2F6",
      login_text: "#386FC2",
      login_bg: "#E1EEFE",
      tutorial_text: "#584D92",
      tutorial_bg: "#ECE9FC",
      text:'#000',
    }
  } else {
    themeInfo.value = {
      bg: "#052B74",
      from_bg: "#151718",
      title: "#0391FF",
      input_bg: "#202425",
      input_plc: "#61686E",
      config_text: "#6C7379",
      clear_text: "#06B8CD",
      clear_bg: "#05313B",
      login_text: "#4B9EEE",
      login_bg: "#102A4D",
      tutorial_text: "#9A8AF7",
      tutorial_bg: "#2C2250",
      text:'#fff',
    }
  }
}
getThemeInfo()
</script>
<style scoped>

input {
  /* 去除所有内边距 */
  padding: 0;

  /* 去除所有外边距 */
  margin: 0;

  /* 去除所有边框 */
  border: none;

  /* 去除所有背景色 */
  background-color: transparent;

  /* 去除所有字体样式 */
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;

  /* 去除所有颜色 */
  color: inherit;

  /* 去除所有文本对齐方式 */
  text-align: inherit;

  /* 去除所有垂直对齐方式 */
  vertical-align: middle;
}

.locale-box {
  position: relative;
  z-index: 1;

  .locale-bg{
    position: absolute;
    width:  100%;
    height: 100%;
    z-index: 1;
  }

  .locale {
    position: absolute;
    left: 0;
    top: 100%;
    width: 100px;
    background: v-bind(themeInfo.from_bg);
    padding: 5px;
    border-radius: 5px;
    z-index: 2;

    .it{
      color: v-bind(themeInfo.text);
      padding: 5px;
      font-size: 14px;

      &.active{
        background: v-bind(themeInfo.input_bg);
        border-radius: 5px;

      }

    }
  }
}

.flex {
  display: flex;
}

.align-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.justify-around {
  justify-content: space-around;
}

.justify-center {
  justify-content: center;
}

.theme-btn {
  margin-top: 20px;

  .theme-icon {
    width: 30px;
    height: 30px;
  }
}

.btn-box {
  margin-top: 10px;

  .btn {
    border-radius: 5px;
  }

  .clear {
    width: 48%;
    color: v-bind(themeInfo.clear_text);
    background: v-bind(themeInfo.clear_bg);
    padding: 5px 30px;
  }

  .login {
    width: 48%;
    color: v-bind(themeInfo.login_text);
    background: v-bind(themeInfo.login_bg);
    padding: 5px 30px;
  }

  .tutorial {
    width: 100%;
    padding: 5px;
    color: v-bind(themeInfo.tutorial_text);
    background: v-bind(themeInfo.tutorial_bg);
    margin-top: 15px;
  }
}

.login-bg {
  height: 100vh;
  background: v-bind(themeInfo.bg);
  position: relative;
  overflow: hidden;

  .round {
    position: absolute;
    left: 0px;
    bottom: -450px;
    width: 600px;
    height: 600px;
    background: #28A7EE;
    border-radius: 50%;

  }
}


.form-bg {
  background: v-bind(themeInfo.from_bg);
  width: 90%;
  height: 60vh;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  padding: 10px;

  .title {
    color: v-bind(themeInfo.title);
    text-align: center;
    font-size: 24px;
    margin: 10px 0;
  }

  .content {
    padding: 10px;
  }

  .config {
    font-size: 12px;
    color: v-bind(themeInfo.config_text);
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      margin: 5px;
    }
  }

  .input-box {
    background: v-bind(themeInfo.input_bg);
    border-radius: 10px;
    padding: 10px;
    margin: 15px auto;

    input {
      width: 100%;
      height: 100%;
      outline: none;
    }

    input:placeholder-shown {
      color: v-bind(themeInfo.input_plc);
    }

    input:focus {
      border: none;
    }

  }
}
</style>
