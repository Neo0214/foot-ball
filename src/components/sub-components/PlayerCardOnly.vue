<template>
    <el-dialog v-model="inputing" title="填写转会细节">
        <div class="dialog">
            <el-form>
                <el-form-item label="转会费（万欧）" label-width="150px">
                    <el-input v-model="transferInfo.fee"></el-input>
                </el-form-item>
                <el-form-item label="转入俱乐部" label-width="150px">
                    <el-select v-model="transferInfo.clubId">
                        <el-option v-for="club in clubs" :key="club.clubId" :label="club.clubName"
                            :value="club.clubId"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
    <div class="container">
        <div class="pic-container text-shadow-drop-right">
            <img :src="imgurl" alt="picture" class="player-pic">
        </div>
        <div class="info-container">
            <div class="player-name">{{ PlayerName }}</div>
            
        </div>
        <div class="line"></div>
    </div>



</template>


<script>


export default {
    name: 'PlayerCard',
    props: ['cardInfo'],
    components: {

    },
    data() {
        return {
            PlayerId: '',
            PlayerName: '',
            imgurl: '',
            inputing: false,
            transferInfo: {
                fee: 0,
                clubId: ''
            },
            clubs: [{
                clubId: 1,
                clubName: 'aaa'
            }]
        }
    },
    mounted() {
        //console.log(this.cardInfo);
        this.PlayerId = this.cardInfo.playerId;
        this.PlayerName = this.cardInfo.playerName;
        console.log(this.playerId);
        this.$axios.get('/api/player/getPlayerPic', {
            params: {
                playerId: this.PlayerId
            },
            responseType: 'blob'
        }).then(res => {
            this.imgurl = URL.createObjectURL(res.data);
        }).catch(err => {
            this.$message.error('获取球员照片失败');
            console.log(err);
        })
    },
    methods: {
        handleTransfer() {
            this.inputing = !this.inputing;
            if (this.inputing) {
                this.$axios.get('/api/club/getAllClubs', {
                    params: {
                        curClub: parseInt(localStorage.getItem('clubId')
                        )
                    }
                }).then(res => {
                    console.log(res.data);
                    this.clubs = res.data.clubs;
                }).catch(err => {
                    this.$message.error('获取俱乐部信息失败');
                    console.log(err);
                })
            }
            if (!this.inputing) {
                // 确定转会
                this.$axios.post('/api/Transfer/transferPlayer', {
                    playerId: this.PlayerId,
                    fee: this.transferInfo.fee,
                    clubId: this.transferInfo.clubId,
                    oldClubId: localStorage.getItem('clubId')
                }).then(res => {
                    if (res.data === 'success') {
                        this.$message.success('转会成功');
                        window.location.reload();
                    }
                    else {
                        this.$message.error('网络不佳，请重新提交');
                    }
                }).catch(err => {
                    this.$message.error('网络不佳，请重新提交');
                    console.log(err);
                })
            }
        }
    },

}
</script>

<style scoped>
.container {
    width: 23%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px 20px;
}

.pic-container {
    width: 100%;
    height: 490px;
    overflow: hidden;
    position: relative;
}

.player-pic {
    width: 100%;
    height: auto;
    max-height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.5s;
    transform-origin: 0 0;
}

.info-container {
    margin-top: 15px;
    width: 95%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;

}

.player-name {
    font-family: 'Courgette';
    font-size: 20px;
    font-weight: bold;
    text-align: center;
}

.line {
    margin: 15px 0;
    height: 2px;
    width: 50%;
    background-color: #000;
}



.player-pic:hover {
    cursor: pointer;
    transform: scale(1.3);


}

.text-shadow-drop-right {
    -webkit-transition: box-shadow 0.6s;
    transition: box-shadow 0.6s;
    box-shadow: transparent;
}

.text-shadow-drop-right:hover {
    -webkit-animation: text-shadow-drop-right 0.6s both;
    animation: text-shadow-drop-right 0.6s both;
}


/**
 * ----------------------------------------
 * @animation text-shadow-drop-right
 * ----------------------------------------
 */
@-webkit-keyframes text-shadow-drop-right {
    0% {
        box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    }

    100% {
        box-shadow: 6px 0 18px rgba(0, 0, 0, 0.35);
    }
}

@keyframes text-shadow-drop-right {
    0% {
        box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    }

    100% {
        box-shadow: 6px 0 18px rgba(0, 0, 0, 0.35);
    }
}

.dialog {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>