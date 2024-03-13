import {createRouter, createWebHashHistory} from "vue-router";


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/Login',
            name: 'Login',
            component: () => import('@/views/Login/index.vue')
        },
        {
            name: 'Home',
            path: '/home',
            component: () => import('@/views/home-page/index.vue')
        },
    ],
})

router.beforeEach((to,from,next)=>{
  let target = to.fullPath;
  if(target=="/Login"){
    //判断是否你已经登录了
    //是的--->首页
    //不是的--->放行
    if(localStorage.getItem("ttoken")){
      next({"path":"/home"});
    }else{
      //放行
      next();
    }
  }else{
    //去到其他界面
    //判断是否有登录
    //没有登录 --->去到登录界面
    //有登录   --->放行
    if(localStorage.getItem("ttoken")){
      //放行
      next();
    }else{
      //没有登录
      next({"path":"/Login"});
    }
  }
})


export default router
