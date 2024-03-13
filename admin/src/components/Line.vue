<script setup>
const props = defineProps({
  value: {
    default: 0,
    type: Number,
  },
  color: {
    default: '#17B777',
    type: String
  }
})
</script>

<template>
  <div class="line-box" >
    <div class="line" :style="{background:color,width:value+'%'}"></div>
  </div>
</template>

<style scoped>
.line-box{
  width: 100%;
  height: 18px;
  position: relative;
  background: #EFEFEF;
  overflow: hidden;
  border-radius: 10px;

  .line{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    border-radius: 10px;
  }
}
</style>
