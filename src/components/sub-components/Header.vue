<template>
    <div>
        <div class="header">
            <div class="pic" id="mypic" @click="jumpToInfo">
                <img :src="imgurl" alt="logo" class="img">
            </div>
            <div class="bar" id="mybar">
                <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" :ellipsis="false">
                    <el-menu-item index="1">首页</el-menu-item>
                    <el-menu-item index="2">转会</el-menu-item>
                    <el-menu-item index="3">数据</el-menu-item>
                    <el-menu-item index="4">队伍</el-menu-item>
                    <el-menu-item index="5">评测</el-menu-item>
                </el-menu>
            </div>
            <div class="time">
                {{ clubName }}
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'SubHeader',
    props: ['propActiveIndex'],
    data() {
        return {
            activeIndex: '1',
            imgurl: '',
            clubName: '',
        }
    },
    mounted() {
        this.activeIndex = this.propActiveIndex;
        this.$axios.post('/api/Club/getClubId').then(res => {
            if (localStorage.getItem('clubId') == null) {
                localStorage.setItem('clubId', res.data);
            }
            this.getContent();
        }).catch(err => {
            this.$message.error('获取俱乐部信息失败');
            console.log(err);
        });
    },
    methods: {
        getContent() {
            this.$axios.post('/api/Club/getClubName',{
                clubId: localStorage.getItem('clubId')
            }).then(res => {
                this.clubName = res.data;
            }).catch(err => {
                this.$message.error('获取俱乐部信息失败');
                console.log(err);
            });
            console.log('head get club logo'+localStorage.getItem('clubId'));
            this.$axios.get('/api/Club/getClubLogo', {
                params: { clubId: localStorage.getItem('clubId') },
                responseType: 'blob'
            }).then(res => {
                this.imgurl = URL.createObjectURL(res.data);
            }).catch(err => {
                this.$message.error('获取俱乐部信息失败');
                console.log(err);
            });
        },
        handleSelect(index) {
            this.activeIndex = index;
            console.log(index);
            console.log(this.activeIndex);
            switch (index) {
                case '1':
                    this.$router.push('/home');
                    break;
                case '2':
                    this.$router.push('/transfer');
                    break;
                case '3':
                    this.$router.push('/data');
                    break;
                case '4':
                    this.$router.push('/connect');
                    break;
                case '5':
                    this.$router.push('/test');
                    break;
            }
        },
        jumpToInfo() {
            this.$router.push('/info');
        }
    }
}
</script>


<style scoped>
.header {
    position: relative;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.pic {
    width: 200px;
    height: 50px;
    padding: 5px 20px;
}

.pic:hover {
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
    transform: scale(1.1);
    /* 鼠标悬停时放大 10% */
}

.img {
    height: 45px;

}



.bar {
    width: auto;
    height: 100%;
    display: flex;
    justify-content: center;
    flex: 1;
}

.time {
    width: 200px;
    height: auto;
    margin: 0 15px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>