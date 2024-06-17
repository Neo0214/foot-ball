<template>
    <div class="main">
        <div class="bar">
            <h3>{{ info.name }}</h3>
            <div style="width:5%"></div>
            <h3>{{ info.position }}</h3>
        </div>
        <div class="content">
            <div class="left">
                <div>
                    <div id="radarChart" style="width:400px;height:400px;" class="radar"></div>
                </div>
            </div>
            <div class="middle">
                <img :src="imgUrl" alt="player" class="player-pic scale-in-hor-right" id="player-pic">
            </div>
            <div class="right">
            </div>
            <SubDraw v-if="headOK" text="体能: 68" :startX="headX" :startY="headY" />
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
            headX: 0,
            headY: 0,
            poseLandmarker: null,
            id: this.$route.query.id,
            imgUrl: '',
            modelOK: false,
            info: {
                name: 'Thomas Muller',
                position: '中锋',
            },
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
                                value: [57, 82, 83, 78, 55, 68],
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
            const head = detections.landmarks[0][0];
            console.log(head);
            // 获取图片位置和大小
            const eleImg = document.getElementById('player-pic');
            const imgRect = eleImg.getBoundingClientRect();
            // 获取图片的宽高
            const imgWidth = imgRect.width;
            const imgHeight = imgRect.height;
            console.log(imgHeight);
            // 调整subDraw的位置，取整数
            this.headX = Math.round(head.x * imgWidth + imgRect.left);
            this.headY = Math.round(head.y * imgHeight + imgRect.top);
            console.log(this.headX, this.headY);
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
    justify-content: center;
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
    -webkit-animation: scale-in-hor-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation: scale-in-hor-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
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
</style>