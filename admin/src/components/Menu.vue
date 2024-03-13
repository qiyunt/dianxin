<script setup>

const show = defineModel({
  default: false,
  type: Boolean
})

const closeModal = ()=>{
  show.value = false
}
</script>

<template>
  <div v-if="show" class="menu-bg">
  </div>
  <div v-if="show" class="menu-content">
    <div class="top">
      <div class="le">后台管理</div>
      <div class="lr" @click="closeModal">
        <img alt="" class="icon" src="@/assets/img/close-white.png">
      </div>
    </div>
    <div class="content">
      <div class="item active">
        <img alt="" class="user" src="@/assets/img/user-grayblue.png">
        <span>账户名字</span>
      </div>

      <div class="tit">系统</div>
      <div class="item flex align-center justify-between">
        <div class="flex align-center">

        <img alt="" class="user" src="@/assets/img/user-grayblue.png">
        <span>显示离线设备</span>
        </div>
        <div>
          <label class="switch">
            <input type="checkbox">
            <span class="slider"></span>
          </label>
        </div>
      </div>
      <div class="item ">
        <img alt="" class="user" src="@/assets/img/user-grayblue.png">
        <span>备用</span>
      </div>
      <div class="item ">
        <img alt="" class="user" src="@/assets/img/user-grayblue.png">
        <span>备用</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
}

.align-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

/* From www.lingdaima.com */
/* The switch - the box around the slider */
.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 35px;
  height: 20px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 30px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  border-radius: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background-color: rgb(0,221,80);
}

input:focus + .slider {
  box-shadow: 0 0 1px rgb(0,221,80);
}

input:checked + .slider:before {
  transform: translateX(15px);
}
.content {
  padding: 10px;

  .tit{
    margin-top: 20px;
    color: #8D8F90;
    font-size: 12px;
    margin-left: 10px;
  }

  .item {
    color: #484951;
    padding: 10px;
    font-size: 15px;
    display: flex;
    align-items: center;
    border-radius: 5px;

    &.active {
      color: #000;
      background: #D8DEED;
    }

    .user {
      width: 15px;
      height: 15px;
      margin-right: 5px;
    }
  }

}

.menu-bg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  z-index: 10;
}

.menu-content {
  position: fixed;
  left: 0;
  top: 0;
  width: 80%;
  height: 100vh;
  background: #fff;
  z-index: 11;

  .top {
    padding: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    background: #415997;
    justify-content: space-between;
    font-size: 14px;
    color: #fff;

    .icon {
      width: 15px;
      height: 15px;
    }
  }
}
</style>
