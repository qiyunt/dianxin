<script setup>
import {reactive} from "vue";
import Menu from '@/components/Menu.vue'

const modalFrom = reactive({
  show: false,
  openModal() {
    modalFrom.show = true;
  },
  closeModal() {
    modalFrom.show = false;
  },
  zhuxiao() {
    localStorage.removeItem("ttoken");
    router.push({name: 'Login'})
  }
})
const menuModal = reactive({
  show: false,
  openModal() {
    menuModal.show = true;
  },
  closeModal() {
    menuModal.show = false;
  }
})
</script>

<template>
  <div>
    <div class="nav">
      <div class="le" @click="menuModal.openModal">
        <img alt="" class="icon" src="@/assets/img/menu.png">
        监工设置
      </div>

      <div class="lr" @click="modalFrom.openModal">
        <img alt="" class="user" src="@/assets/img/user.png">
        <span class="text">admin</span>
        <img alt="" class="down" src="@/assets/img/down.png">
      </div>
    </div>

    <div class="popup-box" v-if="modalFrom.show">
      <div class="popup-content">
        <div class="item" @click="modalFrom.zhuxiao()">注销登录</div>
        <div class="item" @click="modalFrom.closeModal()">取消</div>
      </div>
    </div>

    <Menu v-model="menuModal.show"></Menu>
  </div>
</template>

<style scoped>
.nav {
  padding: 10px;
  height: 30px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  width: 100%;
  z-index: 2;
  left: 0;
  top: 0;

  .icon {
    width: 20px;
    height: 20px;
  }

  .le, .lr {
    display: flex;
    align-items: center;
  }

  .le {
    font-size: 12px;
  }

  .lr {
    img {
      width: 15px;
      height: 15px;
    }

    .text {
      margin: 0 5px;
    }
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

  .popup-content{
    background: #fff;
    border-radius: 5px 5px 0 0 ;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    .item{
      padding: 10px;
      text-align:center;
      color: #5D5D5E;
      border-bottom: 3px solid #F7F8FA;
    }
  }
}
</style>
