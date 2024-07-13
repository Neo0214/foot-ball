<template>
    <div>
        <div class="main">
            <div class="card">
                <div class="above">
                    <div class="container">
                        <div class="title">
                            个人信息
                        </div>
                        <div class="info">
                            姓名: {{ info.name }}
                        </div>
                        <div class="info">
                            电话: {{ info.tele }}
                        </div>
                        <div class="info">
                            邮箱: {{ info.email }}
                        </div>
                        <div class="info">
                            地址: {{ info.address }}
                        </div>
                    </div>
                    <div class="container-ava">
                        <div class="line">
                        </div>
                        <div class="circle-avatar">
                            <img :src="userAvatar" alt="" class="avatar">
                        </div>
                    </div>
                    <div class="container">
                        <div class="title">
                            俱乐部信息
                        </div>
                        <div class="info">
                            俱乐部: {{ clubName }}
                        </div>
                        <img class="club-logo" :src="imgUrl" />
                    </div>
                </div>
                <div class="below">
                    <el-card v-for="item in history" :key="item.id" class="history-card">
                        <div class="history-card-header">
                            <div style="width:50%">{{ item.title }}</div>
                            <div style="width:50%">{{ item.startYear }}——{{ item.endYear }}</div>
                        </div>
                        <div class="history-card-content">
                            {{ item.content }}
                        </div>
                    </el-card>
                    <el-card class="history-card" v-if="isAdding">
                        <div class="history-card-header">
                            <el-input style="width:20%" v-model="newInfo.title"></el-input>
                            <div style="width:30%"></div>
                            <el-date-picker v-model="newInfo.startYear" type="date" placeholder="开始日期"></el-date-picker>
                            <el-date-picker v-model="newInfo.endYear" type="date" placeholder="结束日期"></el-date-picker>
                        </div>
                        <el-input class="history-card-content" v-model="newInfo.content" type="textarea"></el-input>
                    </el-card>
                    <el-button type="primary" @click="addNewInfo">{{ addText }}</el-button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'PageInfo',
    components: {

    },
    data() {
        return {
            userAvatar: '',
            clubName: '',
            imgUrl: '',
            isAdding: false,
            addText: '新增履历',
            info: {
                name: '',
                tele: '',
                email: '',
                address: '',
                clubId: '',
            },
            newInfo: {
                title: '',
                startYear: '',
                endYear: '',
                content: '',
            },
            history: []
        }
    },
    mounted() {
        console.log(localStorage.getItem('id'));
        this.$axios.get('/api/user/getUserAvatar', {
            params: { userId: localStorage.getItem('id') },
            responseType: 'blob'
        }).then(res => {
            this.userAvatar = URL.createObjectURL(res.data);
        }).catch(err => {
            this.$message.error('获取头像失败');
            console.log(err);
        });

        this.$axios.post('/api/user/info')
            .then(res => {
                this.info = res.data


                this.$axios.post('/api/club/getClubName', { clubId: this.info.clubId }).then(res => {
                    this.clubName = res.data
                }).catch(err => { console.log(err) })

                console.log('info get club logo'+localStorage.getItem('clubId'));
                this.$axios.get('/api/club/getClubLogo', {
                    params: { clubId: localStorage.getItem('clubId') },
                    responseType: 'blob'
                }).then(res => {
                    console.log(res.data)
                    this.imgUrl = URL.createObjectURL(res.data);
                }).catch(err => {
                    this.$message.error('获取俱乐部头像失败');
                    console.log(err);
                });

            }).catch(err => {
                console.log(err)
            })
        this.$axios.post('/api/user/getUserHistory')
            .then(res => {
                this.history = res.data.histories
                console.log(this.history)
            }).catch(err => {
                console.log(err)
            })
    },
    methods: {
        addNewInfo() {
            // 弹窗编辑
            this.isAdding = !this.isAdding;
            this.addText = this.isAdding ? '保存' : '新增履历';
            if (!this.isAdding) {
                // 此时点击的是保存
                console.log(this.newInfo);
                this.$axios.post('/api/user/addHistory', this.newInfo).then(res => {
                    if (res.data === 'success') {
                        this.$message.success('保存成功');
                        this.$axios.post('/api/user/getUserHistory')
                            .then(res => {
                                this.history = res.data.histories
                                console.log(this.history)
                            }).catch(err => {
                                console.log(err)
                            })
                        this.newInfo = {
                            title: '',
                            startYear: '',
                            endYear: '',
                            content: '',
                        };
                        this.isAdding = false;
                    } else {
                        this.$message.error('保存失败，请重试');
                    }
                }).catch(err => {
                    this.$message.error('保存失败，请重试');
                    console.log(err);
                })
            }

        }
    }
}
</script>

<style scoped>
.main {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url('@/assets/images/info.jpg');
    background-size: cover;

}

.card {
    width: 90%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.469);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.18);
}

.above {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    margin-top: 40px;
}

.container {
    width: 30%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.container-ava {
    width: 20%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.line {
    width: 3px;
    height: 100px;
    background-color: #000;
}

.circle-avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    background-color: transparent;
}

.avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;

}

@keyframes rotation {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.title {
    font-size: 24px;
    color: antiquewhite;
    font-weight: bold;
    margin-bottom: 20px;
    padding: 9px 50px;
    background-color: rgba(0, 121, 30, 0.8);
}

.info {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    font-size: 18px;
    margin-bottom: 10px;
    padding: 9px 50px;

}

.club-logo {
    width: 100px;
    height: 100px;
    margin-top: 20px;
    animation: rotation 5s infinite linear;
}

.below {
    margin-top: 50px;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.history-card {
    width: 61%;
    height: auto;
    margin: 20px;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.55);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(7px);
    -webkit-backdrop-filter: blur(7px);
    border: 1px solid rgba(255, 255, 255, 0.18);
}

.history-card:hover {
    box-shadow: 0 0 10px rgba(18, 90, 0, 0.5);
}

.history-card-header {
    font-size: 24px;
    font-weight: bold;
    padding: 10px;
    display: flex;
    justify-content: space-around;
}

.history-card-content {
    font-size: 18px;
    padding: 10px;
}
</style>