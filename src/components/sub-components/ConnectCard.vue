<template>
    <div style="display: flex; justify-content: center;">
        <div class="main">
            <div class="left">
                <img :src="imgUrl" class="pic">
            </div>
            <div class="right">
                <div>{{ propConnecterName }}</div>
            </div>
        </div>
    </div>

</template>


<script>
export default{
    name:'ConnectCard',
    props:['propConnecterId','propConnecterName'],
    data(){
        return{
            imgUrl:'',
        }
    },
    mounted(){
        console.log('connectcard get club logo'+this.propConnecterId);
        this.$axios.get('/api/club/getclublogo',{
            params:{
                clubId:this.propConnecterId
            },
            responseType:'blob'
        }).then(res=>{
            this.imgUrl=URL.createObjectURL(res.data)
        }).catch(err=>{
            console.log(err)
            this.$message.error('获取图片失败')
        })
    }
}
</script>

<style scoped>
.main{
    width:90%;
    height:80px;
    display: flex;
    justify-content: center;
    background-color:rgb(255, 255, 255);
    padding:5px;
    border-radius: 3px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    margin:5px 0;
}
.main:hover{
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.5)
}
.left{
    width:20%;
    height:auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
.right{
    width:80%;
    height:auto;
    display: flex;
    justify-content: center;
    align-items: center;

}
.pic{
    width:100%;
    height:auto;
}
</style>