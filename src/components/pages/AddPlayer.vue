<template>
    <div>
        <SubpageHeader title="添加球员" />
    </div>
    <div class="main">
        <div class="left">
            <el-upload class="avatar-uploader" ref="upload" :auto-upload="false"
                :action="'http://localhost:5000/api/player/uploadPic'" list-type="picture-card"
                :before-upload="beforeUpload" :on-preview="handlePreview" :on-remove="handleRemove"
                :on-change="handleChange" :on-success="handleSuccess" :on-error="handleError">
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                </el-icon>
            </el-upload>
            <el-button type="primary" @click="submitUpload" style="position:absolute;bottom:20%;">添加球员</el-button>
        </div>
        <div class="right">
            <el-form>
                <el-form-item label="姓名">
                    <el-input v-model="player.name"></el-input>
                </el-form-item>
                <el-form-item label="国籍">
                    <el-input v-model="player.nation"></el-input>
                </el-form-item>
                <el-form-item label="位置">
                    <el-select v-model="player.position" placeholder="选择司职">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="身价（万欧）">
                    <el-input v-model="player.value"></el-input>
                </el-form-item>
                <el-form-item label="合约到期时间">
                    <el-date-picker v-model="player.expire_date" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="综合评分">
                    <el-input v-model="player.score" disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="射门评价">
                    <el-select v-model="player.shot" placeholder="选择评级">
                        <el-option v-for="item in scoreOptions" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="传球评价">
                    <el-select v-model="player.pass" placeholder="选择评级">
                        <el-option v-for="item in scoreOptions" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="盘带评价">
                    <el-select v-model="player.dribble" placeholder="选择评级">
                        <el-option v-for="item in scoreOptions" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="防守评价">
                    <el-select v-model="player.defence" placeholder="选择评级">
                        <el-option v-for="item in scoreOptions" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="速度评价">
                    <el-select v-model="player.vel" placeholder="选择评级">
                        <el-option v-for="item in scoreOptions" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="体力评价">
                    <el-select v-model="player.energy" placeholder="选择评级">
                        <el-option v-for="item in scoreOptions" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
import SubpageHeader from '@/components/sub-components/SubpageHeader.vue'
import { Plus } from '@element-plus/icons-vue'
export default {
    name: 'AddPlayer',
    components: {
        SubpageHeader,
        Plus
    },
    data() {
        return {
            player: {
                name: '',
                position: '',
                value: '',
                expire_date: '',
                score: 90,
                shot: 90,
                pass: 90,
                dribble: 90,
                defence: 90,
                vel: 90,
                energy: 90,
                nation: '',
                club_id:localStorage.getItem('clubId'),
                img: ''
            },
            playerId: '',
            fileRaw: '',
            options: [
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
                    value: '4',
                    label: '左后腰'
                },
                {
                    value: '5',
                    label: '右后腰'
                },
                {
                    value: '6',
                    label: '中场'
                },
                {
                    value: '7',
                    label: '前腰'
                },
                {
                    value: '8',
                    label: '左边锋'
                },
                {
                    value: '9',
                    label: '右边锋'
                },
                {
                    value: '10',
                    label: '中锋'
                }
            ],
            scoreOptions: [
                {
                    value: 90,
                    label: '优',
                },
                {
                    value: 80,
                    label: '良',
                },
                {
                    value: 70,
                    label: '中',
                },
                {
                    value: 60,
                    label: '差',
                },
                {
                    value: 40,
                    label: '极差',
                }
            ]
        };
    },
    watch:{
        player:{
            handler: function(){
                this.calcTotalScore();
            },
            deep: true
        }
    },
    methods: {
        calcTotalScore(){
            this.player.score = Math.floor((this.player.shot + this.player.pass + this.player.dribble + this.player.defence + this.player.vel + this.player.energy) / 6);
        },
        submitUpload() {
            console.log(this.player);
            this.$axios.post('/api/player/addPlayer', this.player).then(res => {
                if (res.data.success) {
                    console.log('添加成功');
                    this.playerId = res.data.playerId; // 获取到新的id
                    console.log(this.playerId);
                    this.uploadPlayerPic(); // 修改此处调用方法
                    this.$message.success('添加成功');
                    window.location.reload();
                } else {
                    this.$message.error('添加失败');
                    this.$message.error('该国家不是FIFA成员国');
                }

            }).catch(err => {
                this.$message.error('添加失败');
                console.log(err);
            });

        },
        handlePreview(file) {
            console.log('Preview:', file);
        },
        handleRemove(file, fileList) {
            console.log('Remove:', file, fileList);
            this.fileList = fileList;
        },
        handleChange(file, fileList) {
            this.fileList = fileList;
            this.fileRaw = file.raw;
        },
        uploadPlayerPic() {
            // 构造表单数据，包含 playerId 和上传的图片文件
            let formData = new FormData();
            console.log(this.playerId);
            formData.append('playerId', parseInt(this.playerId));
            console.log(this.$refs.upload);
            formData.append('file', this.fileRaw);

            // 使用 axios 或者其他 HTTP 库上传图片
            this.$axios.post('/api/player/uploadPic', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    if (res.data.success) {
                        console.log('图片上传成功');
                        // 可以根据实际需求处理成功上传后的逻辑
                    } else {
                        this.$message.error('图片上传失败');
                    }
                })
                .catch(err => {
                    this.$message.error('图片上传失败');
                    console.error('上传图片时出错：', err);
                });
        },
        uploadSuccess(response) {
            if (response === 'success') {
                this.$message.success('添加成功');
                this.$router.go(-1);
            } else {
                this.$message.error('添加失败');
            }
        },
        handleError(err) {
            console.log('Upload error:', err);
            this.$message.error('文件上传失败');
        }
    }


};
</script>

<style scoped>
.main {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    padding: 5%;
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
    width: 45%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>