<template>
    <div>
        <div class="background-container">
            <div class="image-container">
                <img :src="imgUrl" class="background-image" alt="background-image" />
            </div>

            <div class="infos">
                <h1>{{ info.PlayerName }}</h1>
                <h2>司职：{{ info.PlayerPosition }}</h2>
                <h2>身价：{{ info.PlayerValue }}万欧</h2>
                <h2>合约到期时间：{{ info.PlayerExpireDate }}</h2>
                <h2>出售俱乐部：{{ info.PlayerClub }}</h2>
            </div>
            <div class="shadow"> </div>
        </div>
    </div>
</template>



<script>
export default {
    name: 'CarouselCard',
    props: ['cardInfo'],
    data() {
        return {
            info: this.cardInfo,
            imgUrl: ''
        }
    },
    mounted() {
        this.$axios.get('/api/Player/getPlayerPic', {
            params: {
                playerId: this.info.PlayerId
            },
            responseType: 'blob'
        }).then(res => {
            this.imgUrl = URL.createObjectURL(res.data);

        })
    }
}
</script>


<style scoped>
.background-container {
    width: 100%;
    height: 500px;
    display: flex;
    background: rgba(255, 255, 255, 0.55);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(8.5px);
    -webkit-backdrop-filter: blur(8.5px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
}

.image-container {
    width: 40%;
    height: 100%;
}

.infos {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    padding-top:30px;
}

.background-image {
    max-width: 100%;
    background-position: left top;
    background-repeat: no-repeat;
    background-size: auto;
    overflow: hidden;
}



.shadow{
    position: absolute;
    /* 设置绝对定位 */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(0, 0, 0,0.4), rgba(0, 0, 0, 0));
    /* 从下到上，颜色从深到浅 */
    pointer-events: none;
    /* 遮罩不会阻挡鼠标事件 */
}
</style>