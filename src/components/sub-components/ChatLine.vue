<template>
    <div>
        <div v-if="propRight" class="chat-line-right">
            <div>{{ propContent }}</div>
            <div class="pic-container">
                <img :src="propMainURL" class="pic">
            </div>
        </div>
        <div v-else class="chat-line-left">
                <div class="pic-container">
                    <img :src="propTargetURL" class="pic">
                </div>
                <div>{{ propContent }}</div>
        </div>
    </div>

</template>


<script>
export default {
    name: 'ChatLine',
    props: ['propContent', 'propMainURL', 'propTargetURL', 'propRight'],
    data() {
        return {

        }
    },

}


</script>

<style scoped>
.chat-line-right {
    width: 100%;
    padding: 5px;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.chat-line-left {
    width: 100%;
    padding: 5px;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.pic-container {
    width: 70px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.pic {
    width: 50px;
    height: 50px;
}
</style>