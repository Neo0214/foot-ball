<template>
    <div>
        <div class="main">
            <el-icon :size="20" @click="returnPage" class="icon">
                <DArrowLeft />
            </el-icon>
            <h3>{{ title }}</h3>
            <el-icon :size="20">
                <Right />
            </el-icon>
            <h3>{{ clubName }}</h3>
        </div>
    </div>

</template>



<script>
import { DArrowLeft, Right } from '@element-plus/icons-vue';
export default {
    props:['title'],
    name: 'SubpageHeader',
    components: {
        DArrowLeft,
        Right,
    },
    data() {
        return {
            clubName: '',
        }
    },
    mounted() {
        console.log(localStorage.getItem('clubId'));
        this.$axios.post('/api/Club/getClubName', {
            clubId: localStorage.getItem('clubId')
        }).then(res => {
            this.clubName = res.data;
        }).catch(err => {
            this.$message.error('获取俱乐部信息失败');
            console.log(err);
        });
    },
    methods: {
        returnPage() {
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
.main {
    position: relative;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ;
    background-image: linear-gradient(to right, rgb(86, 171, 0), rgb(123, 205, 40), rgb(86, 171, 0) );
}

.icon {
    position: absolute;
    left: 10px;
}
</style>