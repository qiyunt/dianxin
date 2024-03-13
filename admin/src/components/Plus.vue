<template>
  <div>
    <div class="plus-box" @click="openModal">
      <img alt="" class="icon" src="@/assets/img/plus.png">
    </div>

    <div v-if="show" class="popup-box">
      <div class="popup-content">
        <img alt="" class="close" src="@/assets/img/close.png" @click="openModal">
        <input class="input" v-model="wxid" placeholder="输入wxid绑定账号">
        <div class="btn" @click="banding">提交绑定</div>
      </div>
    </div>
  </div>
</template>


<script>
import { useRouter } from "vue-router";
import request from "@/request/request";
import Line from "@/components/Line.vue";
export default {
  name: 'Login',
  data(){
    return{
      list: [],
      show: false,
      wxid:''
    }
  },
  created() {

  },
  methods: {
    openModal() {
      this.show = !this.show
    },
    banding() {
      if (this.wxid.length == 0) {
        alert("请输入wxid");
        return;
      }
      const username = localStorage.getItem("ttoken");
      request({
        method:"put",
        url: "/user/bind",
        data: {
          username: username,
          wxid:this.wxid
        }
      }).then((res) => {
        if (res.data.code == 200) {
          alert(res.data.msg);
          this.openModal();
        } else if (data.code == 500) {
          alert(res.data.msg)
        }
        else {
          alert(res.data.msg)
        }
      }).catch((err) => {
        alert("网络错误")
      })
    }
  }
}


</script>


<style scoped>
input, textarea, select {
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  font-size: 100%;
  background: none;
}

.plus-box {
  position: fixed;
  right: 5%;
  bottom: 10%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #1689FA;

  .icon {
    width: 30px;
    height: 30px;
  }
}

.popup-box {
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100vh;
  z-index: 10;

  .popup-content {
    background: #fff;
    border-radius: 5px 5px 0 0;
    position: absolute;
    width: 80%;
    left: 50%;
    bottom: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;

    .close {
      position: absolute;
      right: 10px;
      top: 10px;
      width: 20px;
      height: 20px;
    }

    .input {
      margin-top: 30px;
      width: 100%;
      height: 40px;
      border: 1px solid #e7e7e7;
      padding: 0 5px;
      box-sizing: border-box;
    }

    .btn {
      width: 100%;
      height: 30px;
      background: #1689FA;
      color: #fff;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
      border-radius: 5px;
    }
  }
}

.input:placeholder-shown {
  font-size: 14px;
}

</style>
