<template>
    <div>
        <subHeader :prop-active-index="2" />
    </div>
    <div class="main">
        <div class="option">
            <h3>筛选</h3>
            <el-select v-model="curChoice" placeholder="选择司职">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <div style="height:30px"></div>
            <el-input v-model="curClub" placeholder="筛选俱乐部"></el-input>
            <div style="height: 30px;"></div>
            <el-input v-model="curName" placeholder="查找球员姓名"></el-input>
            <div style="height:50px"></div>
            <el-button type="primary" @click="jumpToAddPlayer">添加转会意愿</el-button>
        </div>
        <div class="line"></div>
        <div class="table">
            <el-table stripe="true" :data="showData" style="width: 100%" height="100vh" max-height="100vh" v-loading="isLoading" >
                <el-table-column prop="name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="position" label="司职" width="180">
                </el-table-column>
                <el-table-column prop="value" label="身价" sortable>
                </el-table-column>
                <el-table-column prop="club" label="当前俱乐部">
                </el-table-column>
                <el-table-column prop="contract" label="合同到期日期" sortable>
                </el-table-column>
                <el-table-column prop="expireTime" label="合同到期剩余时间" sortable>
                </el-table-column>
                <el-table-column label="">
                    <template v-slot="scope">
                        <el-button @click="handleDetail(scope.row)">详细数据</el-button>
                    </template>
                    
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>


<script>
import subHeader from '@/components/sub-components/Header.vue'
export default {
    name: 'PageTransfer',
    components: {
        subHeader
    },
    data() {
        return {
            tableData: [],
            showData: [],
            options:[
                {
                    value: '0',
                    label: '左后卫'
                },
                {
                    value: '1',
                    label: '右后卫'
                },
                {
                    value: '2',
                    label: '中卫'
                },
                {
                    value: '3',
                    label: '门将'
                },
                {
                    value:'4',
                    label:'左后腰'
                },
                {
                    value:'5',
                    label:'右后腰'
                },
                {
                    value:'6',
                    label:'中场'
                },
                {
                    value:'7',
                    label:'前腰'
                },
                {
                    value:'8',
                    label:'左边锋'
                },
                {
                    value:'9',
                    label:'右边锋'
                },
                {
                    value:'10',
                    label:'中锋'
                }
            ],
            curChoice:'', // 当前选择的司职，初始不选
            curClub:'', // 当前选择的俱乐部，初始不选
            curName:'', // 当前输入的姓名，初始为空
            isLoading: false
        }
    },
    methods: {
        jumpToAddPlayer(){
            this.$router.push({path:'/addTransfer'});
        },
        handleDetail(row) {
            // 获取该行数据
            this.$router.push({ path: '/data/details', query: { id: row.id } });
        },
        filterData(){
            // 筛选数据
            this.isLoading=true;
            var curData=this.tableData;
            if(this.curChoice !== ''){
                curData = curData.filter(item => item.position === this.options[this.curChoice].label);
            }
            if(this.curClub !== ''){
                curData = curData.filter(item => item.club.includes(this.curClub));
            }
            if(this.curName !== ''){
                curData = curData.filter(item => item.name.includes(this.curName));
            }
            this.isLoading=false;
            this.showData = curData;
        }
    },
    mounted(){
        this.isLoading=true;
        this.$axios.post('/api/player/getAllTransfer').then(res => {
            this.tableData = res.data.transferInfos;
            this.showData= this.tableData;
            console.log(this.tableData);
            this.isLoading=false;
        }).catch(err => {
            this.$message.error('获取数据失败');
            console.log(err);
        })
    },
    watch:{
        curChoice:function(){
            // 每次选择司职都会触发这个函数，筛选数据
            this.filterData();
        },
        curClub:function(){
            // 每次选择俱乐部都会触发这个函数，筛选数据
            this.filterData();
        },
        curName:function(){
            // 每次输入姓名都会触发这个函数，筛选数据
            this.filterData();
        }
    }
}



</script>


<style scoped>
.main {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    margin-top: 2%;
}

.option {
    width: 10%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 1%;
}

.table {
    width: 85%;
    height: auto;
    display: flex;
    justify-content: center;
    margin: 1%;
}

.line {
    width: 3px;
    height: 100%;
    background-color: #409EFF;
}
</style>
