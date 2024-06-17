import { createRouter,createWebHistory } from "vue-router";
import PageHome from "@/components/pages/Home.vue";
import PageLogin from "@/components/pages/Login.vue";
import PageTransfer from "@/components/pages/Transfer.vue";
import PageConnect from "@/components/pages/Connect.vue";
import PageData from "@/components/pages/Data.vue";
import PageTest from "@/components/pages/Test.vue";
import PageInfo from "@/components/pages/Info.vue";
import DataDetail from "@/components/DataDetail.vue";
import AddPlayer from '@/components/pages/AddPlayer.vue';

const routes=[
    {
        path:'/',
        name:'Login',
        component:PageLogin
    },
    {
        path:'/Home',
        name:'Home',
        component:PageHome
    },
    {
        path:'/Transfer',
        name:'Transfer',
        component:PageTransfer
    },
    {
        path:'/Connect',
        name:'Connect',
        component:PageConnect
    },
    {
        path:'/Data',
        name:'Data',
        component:PageData
    },
    {
        path:'/Data/Details',
        name:'Details',
        component:DataDetail
    },
    {
        path:'/Test',
        name:'Test',
        component:PageTest
    },
    {
        path:'/Info',
        name:'Info',
        component:PageInfo
    },
    {
        path:'/data/AddPlayer',
        name:'AddPlayer',
        component:AddPlayer
    }
]

const router=createRouter({
    history:createWebHistory(),
    routes
})

export default router
