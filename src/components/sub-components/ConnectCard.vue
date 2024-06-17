<template>
    <div style="display: flex; justify-content: center;">
        <div class="main">
            <div class="left">
                <img src="https://www.fcbayern.cn/images/head-title-logo.png" class="pic">
            </div>
            <div class="right">
                <div>Fc Bayern Munchen</div>
            </div>
        </div>
    </div>

</template>


<script>
export default{
    name:'ConnectCard',
    data(){
        return{
            
        }
    }
}
</script>

<style scoped>
.main{
    width:80%;
    height:80px;
    display: flex;
    justify-content: center;
    background-color:rgba(161, 255, 171,0.4);
    padding:5px;
    border-radius: 3px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5)
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