<template>
    <div>
        <subHeader :prop-active-index="4" />
        <div class="main">
            <el-card v-for="(item,index) in allConnector" :key="index" class="card-main" >
                <div class="card">
                    <div class="pic-container">
                        <img :src="`http://localhost:5000/api/club/getClubLogo?clubId=${item.clubId}`" class="pic">
                    </div>
                    <div class="info-container">
                        <div class="title">{{ item.clubName }}</div>
                        <div class="score">评分：{{ item.clubScore }}</div>
                    </div>
                    
                </div>
            </el-card>
        </div>
    </div>
</template>


<script>

import subHeader from '@/components/sub-components/Header.vue'

export default {
    name: 'PageConnect',
    components: {
        subHeader,
    },
    data() {
        return {
            allConnector:[],
        }
    },
    methods: {
        

    },
    mounted(){
        // 获取allConnector
        this.$axios.get('/api/club/getAllClubsWithScore',{
            params:{
                curClub:localStorage.getItem('clubId')
            }
        }).then(res=>{
            this.allConnector=res.data.clubs;
            console.log(this.allConnector)
        }).catch(err=>{
            console.log(err)
            this.$message.error('获取聊天对象失败')
        })
    }
}
</script>


<style scoped>
.main {
    width: 99%;
    height: 95vh;
    display: flex;
    flex-direction: column;
    align-items: center;

}
.pic-container{
    width:70px;
    height:70px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right:30px;
}
.pic{
    width:70px;
    height:70px;
    border-radius: 50%;
}
.card{
    width:80%;
    height:auto;
    display: flex;
    align-items: center;
}
.card-main{
    width:80%;
    height:auto;
    display: flex;
    align-items: center;
    margin:10px 0;
}
.title{
    width:400px;
    height:auto;

}
.score{
    width:100px;
    height:auto;
}
.left {
    width: 20%;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-right: 1px solid #000000;
    padding: 10px 0px;
}

.right {
    width: 80%;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
}

.chating {
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
}

.inputing {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: column;
    border-top: 1px solid #4f4f4f;
}

.btn {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.bar {
    width: 100%;
    height: 60px;
    display: flex;
    justify-self: flex-start;
    align-items: center;
    padding: 5px;
    border-bottom: 1px solid #4f4f4f;
}

.title{
    font-family:  'Arial Narrow Bold', sans-serif;
    font-size: 30px;
}
</style>
