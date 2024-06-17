<template>
    <div>
        <subHeader :prop-active-index="5"/>
    </div>
</template>


<script>
import subHeader from '@/components/sub-components/Header.vue'
export default {
    name:'PageTest',
    components:{
        subHeader
    },
    data(){
        return{
            
        }
    }
}
</script>


<style scoped>

</style>
