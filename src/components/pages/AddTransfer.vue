<template>
    <div>
        <SubpageHeader title="进行转会" />
    </div>
    <div class="main">
        <div>
            <div class="one-title">门将</div>
            <div v-for="(group, index) in keeper" :key="index" class="row">
                <PlayerCard v-for="(player, index) in group" :key="index" :card-info="player" />
            </div>

        </div>
        <div>
            <div class="one-title">前场</div>
            <div v-for="(group, groupIndex) in forward" :key="`group-${groupIndex}`" class="row">
                <PlayerCard v-for="(player, playerIndex) in group" :key="`player-${groupIndex}-${playerIndex}`"
                    :card-info="player" />
            </div>
        </div>
        <div>
            <div class="one-title">中场</div>
            <div v-for="(group, index) in midfielder" :key="index" class="row">
                <PlayerCard v-for="(player, index) in group" :key="index" :card-info="player" />
            </div>
        </div>
        <div>
            <div class="one-title">后防</div>
            <div v-for="(group, index) in defender" :key="index" class="row">
                <PlayerCard v-for="(player, index) in group" :key="index" :card-info="player" />
            </div>
        </div>
    </div>

</template>

<script>
import SubpageHeader from '@/components/sub-components/SubpageHeader.vue';
import PlayerCard from '@/components/sub-components/PlayerCard.vue';
export default {
    name: 'AddTransfer',
    components: {
        SubpageHeader,
        PlayerCard,
    },
    data() {
        return {
            keeper: [],
            forward: [],
            midfielder: [],
            defender: [],
        }
    },
    mounted() {
        this.$axios.get('/api/Transfer/getPlayerByPosition', {
            params: {
                clubId: localStorage.getItem('clubId'),
            }
        }).then(res => {
            console.log(res.data);
            this.keeper = res.data.keeper;
            this.forward = res.data.forward;
            this.midfielder = res.data.midfielder;
            this.defender = res.data.defender;
        }).catch(err => {
            this.$message.error('获取球员信息失败');
            console.log(err);

        })
    }
}
</script>

<style scoped>
.main {
    width: 95%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 5% 0 5% 5%;
   
}

.one-title {
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 2%;
}

.row {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
}
</style>