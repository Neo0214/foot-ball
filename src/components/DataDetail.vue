<template>
    <div class="main">
        <div class="bar">
            <h3>{{ info.name }}</h3>
            <div style="width:5%"></div>
            <h3>{{ info.position }}</h3>
            <div style="width:5%"></div>
            <div class="pic-container">
                <img :src="info.nationPic" alt="nation" class="nation-pic">
            </div>
        </div>
        <div class="content">
            <div class="left">
                <div style="margin-bottom: 30px;">
                    <div id="radarChart" style="width:400px;height:400px;" class="radar"></div>
                </div>
                <div>
                    <el-card v-for="item in transferRecord" :key="item.id">
                        <div>从{{ item.fromName }}转入{{ item.toName }}——{{ item.cost }}万欧</div></el-card>
                </div>
            </div>
            <div class="middle">
                <img :src="imgUrl" alt="player" class="player-pic scale-in-hor-right" id="player-pic">
            </div>
            <div class="right">
            </div>
            <SubDraw v-if="headOK" text1="速度: " :text2="radarOption.series[0].data[0].value[0]" :startX="headX[0]" :startY="headY[0]" />
            <SubDraw v-if="headOK" text1="射门: " :text2="radarOption.series[0].data[0].value[1]" :startX="headX[1]" :startY="headY[1]" />
            <SubDraw v-if="headOK" text1="传球: " :text2="radarOption.series[0].data[0].value[2]" :startX="headX[2]" :startY="headY[2]" />
            <SubDraw v-if="headOK" text1="盘带: " :text2="radarOption.series[0].data[0].value[3]" :startX="headX[3]" :startY="headY[3]" />
            <SubDraw v-if="headOK" text1="防守: " :text2="radarOption.series[0].data[0].value[4]" :startX="headX[4]" :startY="headY[4]" />
            <SubDraw v-if="headOK" text1="体能: " :text2="radarOption.series[0].data[0].value[5]" :startX="headX[5]" :startY="headY[5]" />
        </div>
    </div>
</template>


<script>
import * as echarts from 'echarts';
import { PoseLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import SubDraw from '@/components/sub-components/Draw.vue'
export default {
    name: 'DataDetail',
    components: {
        SubDraw
    },
    data() {
        return {
            loadOK: false,
            headOK: false,
            headX: [],
            headY: [],
            poseLandmarker: null,
            id: this.$route.query.id,
            imgUrl: '',
            modelOK: false,
            nationPic: '',
            info: {
                name: '',
                position: '',
                nation: 1,
            },
            transferRecord:[
                {
                    fromName:'',
                    toName:'',
                    cost:0
                }
            ],
            radarOption: {
                color: ['#000000'],
                legend: {},
                radar: {
                    indicator: [
                        { name: '速度', max: 100, color: '#ff0000' },
                        { name: '射门', max: 100, color: '#ff0000' },
                        { name: '传球', max: 100, color: '#ff0000' },
                        { name: '盘带', max: 100, color: '#ff0000' },
                        { name: '防守', max: 100, color: '#ff0000' },
                        { name: '体能', max: 100, color: '#ff0000' },
                    ],
                    center: ['50%', '50%'],
                    radius: 120,
                    axisName: {
                        fontSize: 20,
                    },
                    splitNumber: 4,
                    splitArea: {
                        areaStyle: {
                            color: ['rgb(219, 0, 0)', 'rgb(255, 205, 25)', 'rgb(97, 255, 18)', 'rgb(12, 183, 0)'],
                            shadowColor: 'rgba(0, 0, 0, 0.2)',
                            shadowBlur: 10
                        }
                    },
                    animationDuration: 2000, // 动画时长
                    animationEasing: 'elasticOut', // 动画缓动效果
                    animationDelay: function (idx) {
                        return idx * 100; // 每个数据点的动画延迟
                    }
                },
                series: [
                    {
                        type: 'radar',
                        data: [
                            {
                                value: [0,0,0,0,0,0],
                                areaStyle: {
                                    color: 'rgba(255, 255, 255, 1)'
                                }
                            }
                        ],
                        emphasis: {
                            lineStyle: {
                                width: 5
                            }
                        },

                    }

                ]

            }
        }
    },
    mounted() {
        this.$axios.get('/api/transfer/getAll',{
            params:{
                playerId:this.$route.query.id
            }
        }).then(res=>{
            this.transferRecord=res.data.transferRecord;
        }).catch(err=>{
            this.$message.error('获取转会记录失败');
            console.log(err);
        })
        // 获取数据展示信息
        this.$axios.get('/api/player/getDetail',{
            params:{
                playerId:this.$route.query.id
            }
        }).then(res=>{
            this.radarOption.series[0].data[0].value=res.data.valueData;
            const myChart=echarts.init(document.getElementById('radarChart'));
            myChart.setOption(this.radarOption);
            this.info.name=res.data.name;
            this.info.position=res.data.position;
            this.info.nation=res.data.nation;
            this.$axios.get('/api/nation/getPic',{
                params:{
                    nationId:this.info.nation
                },
                responseType:'blob'
            }).then(res=>{
                this.info.nationPic=URL.createObjectURL(res.data);
            }).catch(err=>{
                this.$message.error('获取国籍图片失败');
                console.log(err);
            })
        }).catch(err=>{
            this.$message.error('获取球员信息失败');
            console.log(err);
        })
        var chartDom = document.getElementById('radarChart');
        var myChart = echarts.init(chartDom);
        myChart.setOption(this.radarOption);
        console.log('begin init');
        this.initPose();
        console.log('end init');
        console.log(this.$route.query.id);
        this.$axios.get('/api/player/getPlayerPic', {
            params: {
                playerId: this.$route.query.id
            },
            responseType: 'blob'
        }).then(res => {
            this.imgUrl = URL.createObjectURL(res.data);
        }).catch(err => {
            this.$message.error('获取图片失败')
            console.log(err)
        })
        console.log('mounted OK');
        this.loadOK = true;
    },
    methods: {
        async initPose() {
            const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm");
            this.poseLandmarker = await PoseLandmarker.createFromOptions(
                vision,
                {
                    baseOptions: {
                        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/latest/pose_landmarker_lite.task",
                        //modelAssetPath:"/src/assets/pose_landmarker_lite.task",
                        delegate: "CPU"
                    },
                    runningMode: "IMAGE"
                });
            this.modelOK = true;
            console.log('model OK');
        },
        drawInfos(detections) {
            // 按照头部、左膝盖、左腰、左肩、左手、左胳膊的顺序
            console.log(detections.landmarks[0][0]);
            const bodys = [detections.landmarks[0][0],detections.landmarks[0][25],detections.landmarks[0][23],detections.landmarks[0][11],detections.landmarks[0][15],detections.landmarks[0][13]];
            
            // 获取图片位置和大小
            const eleImg = document.getElementById('player-pic');
            const imgRect = eleImg.getBoundingClientRect();
            // 获取图片的宽高
            const imgWidth = imgRect.width;
            const imgHeight = imgRect.height;
            // 调整subDraw的位置，取整数
            this.headX = [
                Math.round(bodys[0].x * imgWidth + imgRect.left),
                Math.round(bodys[1].x * imgWidth + imgRect.left),
                Math.round(bodys[2].x * imgWidth + imgRect.left),
                Math.round(bodys[3].x * imgWidth + imgRect.left),
                Math.round(bodys[4].x * imgWidth + imgRect.left),
                Math.round(bodys[5].x * imgWidth + imgRect.left)];
            this.headY = [
                Math.round(bodys[0].y * imgHeight + imgRect.top),
                Math.round(bodys[1].y * imgHeight + imgRect.top),
                Math.round(bodys[2].y * imgHeight + imgRect.top),
                Math.round(bodys[3].y * imgHeight + imgRect.top),
                Math.round(bodys[4].y * imgHeight + imgRect.top),
                Math.round(bodys[5].y * imgHeight + imgRect.top)];
            this.headOK = true;
        }
    },
    watch: {
        modelOK: function () {
            if (this.loadOK && this.modelOK) {
                this.$axios.get('/api/player/getPlayerPic', {
                    params: {
                        playerId: this.$route.query.id
                    },
                    responseType: 'blob'
                }).then((response) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(response.data);

                    reader.onload = () => {
                        const image = new Image();
                        image.src = reader.result;
                        image.onload = () => {
                            console.log(response.data);
                            const detections = this.poseLandmarker.detect(image);
                            console.log('next: draw');
                            this.drawInfos(detections);
                        }
                    }
                });
            }
        }

    }
}
</script>

<style scoped>
.main {
    width: 100%;
    height: 102vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url('@/assets/images/data-bg.jpg');
    background-size: cover;
}

.bar {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}

.content {
    width: 99%;
    height: 90%;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    padding-bottom: 10px;
    position: relative;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
}

.left {
    width: 35%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.right {
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.middle {
    width: 30%;
    height: 100%;
    position: relative;
    padding-bottom: 10px;
}

.player-pic {
    width: 100%;
    height: 100%;
    box-shadow: 0 0 3px 5px rgb(255, 255, 255);
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.5);
}

.radar {
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(9px);
    -webkit-backdrop-filter: blur(9px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
}

.scale-in-hor-right {
    -webkit-animation: scale-in-hor-right 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation: scale-in-hor-right 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

/**
 * ----------------------------------------
 * animation scale-in-hor-right
 * ----------------------------------------
 */
@-webkit-keyframes scale-in-hor-right {
    0% {
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        -webkit-transform-origin: 100% 100%;
        transform-origin: 100% 100%;
        opacity: 1;
    }

    100% {
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
        -webkit-transform-origin: 100% 100%;
        transform-origin: 100% 100%;
        opacity: 1;
    }
}

@keyframes scale-in-hor-right {
    0% {
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        -webkit-transform-origin: 100% 100%;
        transform-origin: 100% 100%;
        opacity: 1;
    }

    100% {
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
        -webkit-transform-origin: 100% 100%;
        transform-origin: 100% 100%;
        opacity: 1;
    }
}

.pic-container{
    width:auto;
    height:50%;
}
.nation-pic{
    width:100%;
    height:100%;
    object-fit: cover;
}
</style>