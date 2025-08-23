<template>
    <div class="fallback " >
        <div class="text">Please Login First</div>
        <div class="loginBtn">
            <el-button class="btn" tag="a" href="https://oj.sdutacm.cn">To Login</el-button>
            <el-button class="btn" @click="reload">↻ Reload </el-button>
        </div>

    </div>
</template>

<script setup>


function reload(){
    window.location.reload()
}

</script>

<style scoped>
    .fallback{
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .text {
        font-size: 20px;
        font-weight: 600;
        padding: 20px;
        margin-bottom: 20px;
        color: var(--font-color);
    }

    .loginBtn{
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 8px;
    }

    .btn{
        margin: 0 !important;
        width: 100px;
        text-decoration: none;
    }
</style>