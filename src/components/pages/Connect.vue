<template>
    <div>
        <subHeader :prop-active-index="4" />
        <div class="main">
            <div class="left">
                <ConnectCard style="width:100%;" />
            </div>
            <div class="right">
                <div class="bar">
                    <div>FC</div>
                </div>
                <div class="chating">

                </div>
                <div class="inputing">
                    <el-input placeholder="请输入内容" style="width:100%;height:100%;"></el-input>
                    <div class="btn">
                        <el-button>发送</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import ConnectCard from '@/components/sub-components/ConnectCard.vue'
import subHeader from '@/components/sub-components/Header.vue'
export default {
    name: 'PageConnect',
    components: {
        subHeader,
        ConnectCard
    },
    data() {
        return {

        }
    }
}
</script>


<style scoped>
.main {
    width: 100%;
    height: 95vh;
    display: flex;
    justify-content: center;
}

.left {
    width: 20%;
    height: 100%;
    background-color: #c4c4c4;
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
</style>
