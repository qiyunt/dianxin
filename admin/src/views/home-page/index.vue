<script setup>

import Nav from "@/components/Nav.vue";
import DataBox from "@/components/DataBox.vue";
import ListBox from "@/components/ListBox.vue";
import Plus from "@/components/Plus.vue";
</script>

<template>
  <div class="container">
    <Nav></Nav>
    <div class="content">
      <DataBox/>
      <ListBox/>
    </div>

    <Plus></Plus>
  </div>
</template>

<style scoped>

.container {
  background: #F1F3F9;
  min-height: 100vh;
}

.content{
  padding: 10px;
}
</style>
