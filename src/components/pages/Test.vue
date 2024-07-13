<template>
    <div>
        <subHeader :prop-active-index="5" />
    </div>
    <div class="main">
        <div class="left">
            <el-select v-model="curChoice" placeholder="请选择" style="width:40%;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <div style="height:50px;"></div>
            <el-select v-model="score" placeholder="选择今日训练效果" style="width:40%;">
                <el-option v-for="item in scoreOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <div style="height:50px;"></div>
            <el-button type="primary" @click="submitScore">提交</el-button>
        </div>
        <div class="right">
            <div class="table">
                <el-table stripe="true" :data="showData">
                    <el-table-column prop="date" label="日期" width="180">
                    </el-table-column>
                    <el-table-column prop="score" label="训练评价" width="180">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>


<script>
import subHeader from '@/components/sub-components/Header.vue'
export default {
    name: 'PageTest',
    components: {
        subHeader
    },
    data() {
        return {
            options: [{
                value: 1,
                label: 'Neuer'
            }],
            scoreOptions: [{
                value: 95,
                label: 'A+',
            },
            {
                value: 85,
                label: 'A',
            },
            {
                value: 75,
                label: 'B',
            },
            {
                value: 65,
                label: 'C',
            },
            {
                value: 55,
                label: 'D',
            }],
            curChoice: '',
            score: '',
            showData: []
        }
    },
    mounted() {
        this.$axios.get('/api/player/getMyPlayer', {
            params: {
                clubId: localStorage.getItem('clubId')
            }
        }).then(res => {
            this.options = res.data.options
        }).catch(err => {
            console.log(err)
            this.$message.error('获取球员列表失败')
        })
    },
    watch: {
        curChoice: function () {
            this.getData();

        }
    },
    methods: {
        getData() {
            console.log(this.curChoice);
            this.$axios.get('/api/train/getTrain', {
                params: {
                    playerId: this.curChoice
                }
            }).then(res => {
                this.showData = res.data.trainData
                console.log(this.showData)
            }).catch(err => {
                console.log(err)
                this.$message.error('获取训练记录失败')
            })
        },
        submitScore() {
            this.$axios.post('/api/train/makeTrain', {
                playerId: this.curChoice,
                score: this.score
            }).then(res => {
                if (res) {
                    this.$message.success('提交成功');
                    this.getData();
                }
            }).catch(err => {
                console.log(err)
                this.$message.error('提交失败')
            })
            
        }
    }
}
</script>


<style scoped>
.main {
    width: 95%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    padding: 2% 0 5% 5%;

}

.left {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.right {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.table {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
