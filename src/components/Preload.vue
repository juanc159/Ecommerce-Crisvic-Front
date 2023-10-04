<template>
    <div class="container cajaContainer">
        <span class="loader"></span>
        <br /><br />
    </div>
</template>
<style>
.cajaContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100vh;
    height: 100vh;
}

.loader {
    position: relative;
    width: 48px;
    height: 48px;
    background: #2d439e;
    transform: rotateX(65deg) rotate(45deg);
    color: #092150;
    animation: layers1 1s linear infinite alternate;
}

.loader:after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(100, 166, 233, 0.7);
    animation: layerTr 1s linear infinite alternate;
}

@keyframes layers1 {
    0% {
        box-shadow: 0px 0px 0 0px
    }

    90%,
    100% {
        box-shadow: 20px 20px 0 -4px
    }
}

@keyframes layerTr {
    0% {
        transform: translate(0, 0) scale(1)
    }

    100% {
        transform: translate(-25px, -25px) scale(1)
    }
}</style>