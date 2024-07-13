<template>
    <div class="strip" :style="{ left: startX + 'px', top: Y + 'px' }">
        <div class="left">
            <div class="line-oblique  scale-in-hor-left">

            </div>
        </div>
        <div class="right scale-in-hor-left">
            <div class="text tracking-in-contract-bck-bottom">{{text1}}{{ text2 }}</div>
            <div class="line">

            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'SubDraw',
    components: {

    },
    props: {
        startX: {
            type: Number,
            default: 0
        },
        startY: {
            type: Number,
            default: 0
        },
        text1: {
            type: String,
            default: ''
        },
        text2:{
            type:String,
            default:''
        }
    },
    data() {
        return {
            Y: 0
        }
    },
    mounted() {
        this.Y = this.startY - 170;
        console.log(this.Y);
    }
}
</script>

<style scoped>
.strip {
    width: 500px;
    height: 100px;
    position: absolute;
    display: flex;
    justify-content: center;
    z-index: 10;
}

.text {
    width: 100%;
    height: 50%;
    margin-left: 45%;
    font-family:'Microsoft YaHei';
    font-size: 20px;
    color: rgb(255, 255, 255);
}

.left {
    width: 90px;
    height: 100%;
    display: flex;
}

.right {
    width: 410px;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.line {
    width: 70%;
    height: 100%;
    border-top: 5px solid rgb(255, 255, 255);

}

.left::after {
    content: '';
    position: absolute;
    bottom: 14px;
    left: 14px;
    width: 19.2%;
    height: 5px;
    background-color: rgb(255, 255, 255);
    transform-origin: left bottom;
    transform: translateY(100%) rotate(-35deg);
}

.left::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 10px;
    height: 10px;
    border: 3px solid rgb(255, 255, 255);
    border-radius: 50%;
}

/* HTML: <div class="loader"></div> */
.loader {
    width: 120px;
    height: 20px;
    background:
        radial-gradient(circle 10px, #000 95%, #0000) right /calc(200% + 20px) 100%,
        linear-gradient(#000 0 0) center/100% 6px;
    background-repeat: no-repeat;
    -webkit-mask: radial-gradient(circle 4px, #0000 93%, #000) right/calc(200% + 20px) 100%;
    animation: l6 1s linear forwards;
    animation-iteration-count: 1;
}

@keyframes l6 {
    100% {
        background-position: left;
        -webkit-mask-position: left
    }
}

.text-pop-up-top {
    display: inline-block;
    -webkit-animation: text-pop-up-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation: text-pop-up-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

/**
 * ----------------------------------------
 * animation text-pop-up-top
 * ----------------------------------------
 */
@-webkit-keyframes text-pop-up-top {
    0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        -webkit-transform-origin: 50% 50%;
        transform-origin: 50% 50%;
        text-shadow: none;
    }

    100% {
        -webkit-transform: translateY(-50px);
        transform: translateY(-50px);
        -webkit-transform-origin: 50% 50%;
        transform-origin: 50% 50%;
        text-shadow: 0 1px 0 #cccccc, 0 2px 0 #cccccc, 0 3px 0 #cccccc, 0 4px 0 #cccccc, 0 5px 0 #cccccc, 0 6px 0 #cccccc, 0 7px 0 #cccccc, 0 8px 0 #cccccc, 0 9px 0 #cccccc, 0 50px 30px rgba(0, 0, 0, 0.3);
    }
}

@keyframes text-pop-up-top {
    0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        -webkit-transform-origin: 50% 50%;
        transform-origin: 50% 50%;
        text-shadow: none;
    }

    100% {
        -webkit-transform: translateY(-50px);
        transform: translateY(-50px);
        -webkit-transform-origin: 50% 50%;
        transform-origin: 50% 50%;
        text-shadow: 0 1px 0 #cccccc, 0 2px 0 #cccccc, 0 3px 0 #cccccc, 0 4px 0 #cccccc, 0 5px 0 #cccccc, 0 6px 0 #cccccc, 0 7px 0 #cccccc, 0 8px 0 #cccccc, 0 9px 0 #cccccc, 0 50px 30px rgba(0, 0, 0, 0.3);
    }
}

.leFlyInBottom span {
    animation-name: leFlyInBottom
}

@keyframes leFlyInBottom {
    0% {
        transform: translate(0px, 80px);
        opacity: 0
    }

    50% {
        transform: translate(10px, -50px);
        animation-timing-function: ease-in-out
    }
}

.scale-in-hor-left {
    -webkit-animation: scale-in-hor-left 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation: scale-in-hor-left 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

/**
 * ----------------------------------------
 * animation scale-in-hor-left
 * ----------------------------------------
 */
@-webkit-keyframes scale-in-hor-left {
    0% {
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        -webkit-transform-origin: 0% 0%;
        transform-origin: 0% 0%;
        opacity: 1;
    }

    100% {
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
        -webkit-transform-origin: 0% 0%;
        transform-origin: 0% 0%;
        opacity: 1;
    }
}

@keyframes scale-in-hor-left {
    0% {
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        -webkit-transform-origin: 0% 0%;
        transform-origin: 0% 0%;
        opacity: 1;
    }

    100% {
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
        -webkit-transform-origin: 0% 0%;
        transform-origin: 0% 0%;
        opacity: 1;
    }
}

.tracking-in-contract-bck-bottom {
    -webkit-animation: tracking-in-contract-bck-bottom 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
    animation: tracking-in-contract-bck-bottom 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
}

/**
 * ----------------------------------------
 * animation tracking-in-contract-bck-bottom
 * ----------------------------------------
 */
@-webkit-keyframes tracking-in-contract-bck-bottom {
    0% {
        letter-spacing: 1em;
        -webkit-transform: translateZ(400px) translateY(300px);
        transform: translateZ(400px) translateY(300px);
        opacity: 0;
    }

    40% {
        opacity: 0.6;
    }

    100% {
        -webkit-transform: translateZ(0) translateY(0);
        transform: translateZ(0) translateY(0);
        opacity: 1;
    }
}

@keyframes tracking-in-contract-bck-bottom {
    0% {
        letter-spacing: 1em;
        -webkit-transform: translateZ(400px) translateY(300px);
        transform: translateZ(400px) translateY(300px);
        opacity: 0;
    }

    40% {
        opacity: 0.6;
    }

    100% {
        -webkit-transform: translateZ(0) translateY(0);
        transform: translateZ(0) translateY(0);
        opacity: 1;
    }
}
</style>