<script>
import { useRouter } from "vue-router";
import request from "@/request/request";
import Line from "@/components/Line.vue";
export default {
  name: 'Login',
  data(){
    return{
      list: [],
      total: 0,
      onlineTotal: 0,
      shouyi: 0,
      shangxing:0 
    }
  },
  created() {
    const ttoken = localStorage.getItem("ttoken");
    this.getList(ttoken);
  },
  methods: {
    
    getList(username) {
      var that = this;
      request({
        method:"get",
        url:"/user/" + username,
      }).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.list = res.data.data;
          this.total = this.list.length;
          for (let index = 0; index < this.list.length; index++) {
            if (this.list[index].online == '0') {
              this.onlineTotal = this.onlineTotal + 1;
              this.shangxing = Number(that.list[index].up) + this.shangxing;
            }
            this.shouyi = Number(that.list[index].todayincome) + this.shouyi;
          }
          this.shouyi = this.shouyi.toFixed(2);
          this.shangxing = this.shangxing.toFixed(2);
        } else if (res.data.code == 500) {
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

<template>
<div class="aox">
    <div class="item">
      <div class="num">{{ total }}</div>
      <div class="tips">设备总数</div>
    </div>
    <div class="item">
      <div class="num">{{ onlineTotal }}</div>
      <div class="tips">在线设备</div>
    </div>
    <div class="item">
      <div class="num">{{ shouyi }}</div>
      <div class="tips">总收益</div>
    </div>
    <div class="item">
      <div class="num">{{ shangxing }}</div>
      <div class="tips">总上行</div>
    </div>
  </div>



  <div>
    <div v-for="item in list" class="box">
      <div class="top">
        <span class="up"></span>
        <span class="up">
          <img alt="" class="icon" src="@/assets/img/up.png">
          {{item.up}}M/s
        </span>
        <span v-if="item.online == '0'" class="smil">
          在线
          <img alt="" class="icon" src="@/assets/img/smil.png">
        </span>
       <span v-if="item.online == '1'" class="smil cry">-->
         离线
         <img alt="" class="icon" src="@/assets/img/cry.png">
        </span>
      </div>

      <div class="tips mt-5">
        <div class="le">sn : {{ item.sn }}</div>
        <div class="lr">151222222</div>
      </div>
      <div class="mt-5">
        <span class="mr-5">今日收益 : {{item.todayincome}}</span>
        <!-- <span>昨收:00.00</span> -->
      </div>
      <div class="line-item mt-5">
        <span class="it" style="color: #17B777">CPU : {{ item.cpuratio }}</span>
        <Line :value="30"></Line>
      </div>
      <div class="line-item mt-5">
        <span class="it" style="color: #FCB805">内存 : {{ item.memorysize }}</span>
        <Line :value="50" color="#FCB805"></Line>
      </div>
      <div class="line-item mt-5">
        <span class="it" style="color: #209FFD">硬盘 : {{ item.disktotal }}</span>
        <Line :value="70" color="#209FFD"></Line>
      </div>

      <div class="foot mt-5">
        <div class="le">
          <div v-if="item.cpucount == 'CPU:4核'" class="btn green mr-5">N1</div>
          <div v-if="item.cpucount == 'CPU:8核'" class="btn green mr-5">3Pro</div>
          <div class="btn blue">{{item.natstatus}}</div>
        </div>

        <div class="btn red">删除</div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.aox {
  border-radius: 5px;
  background: #fff;
  padding: 10px;
  display: flex;

  .item{
    text-align: center;
    width: 25%;

    .num{
      margin-top: 10px;
      font-size: 20px;
    }

    .tips{
      font-size: 14px;
      margin-top: 10px;
    }
  }
}
.box {
  border-radius: 5px;
  background: #fff;
  padding: 10px;
  margin-top: 20px;

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;


    .up {
      color: #1CF929;
      display: flex;
      align-items: center;
      font-size: 20px;
      font-weight: bold;


      .icon {
        width: 20px;
        height: 20px;
      }
    }

    .smil {
      color: #1F6525;
      display: flex;
      align-items: center;

      &.cry{
        color: #AC574C;
      }

      .icon {
        width: 20px;
        height: 20px;
        margin-left: 5px;
      }
    }
  }

  .tips {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .lr {
      font-size: 16px;
    }
  }

  .line-item{
    display: flex;
    align-items: center;
    margin-top: 5px;
    white-space: nowrap;
    .it{
      margin-right: 5px;
    }
  }

  .foot{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;

    .le{
      display: flex;
      align-items: center;
    }

    .btn{
      padding:2px 6px;
      color: #000;
      font-size: 14px;
      border-radius: 5px;

      &.blue{
        background: #1A88F5;
      }
      &.green{
        background: #05C160;
      }
      &.red{
        background: #EE0925;
        color: #fff;
        padding: 4px 5px;
        font-size: 10px;
      }
    }
  }

}

.mr-5{
  margin-right: 5px;
}

.mt-5{
  margin-top: 5px!important;
}
</style>
