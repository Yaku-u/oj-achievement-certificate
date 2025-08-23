<template>
    <div class="AppContainer">
        <Menu />
        <fallback v-if="!isLogin"/>
        <div class="container" v-if="isLogin">
            <div class="title">
                <h1>OJ Certificate</h1>
                <p class="verson">{{ version }}</p>
            </div>
            <h2>GetStart</h2>
            <p>Select the type of certificate you want to obtain</p>
            <homeBtn />
            <p class="more">More features are under development, so stay tuned... 😊</p>
        </div>

        <footer>© 2008-2025 SDUTACM. All Rights Reserved.</footer>
    </div>

</template>

<script setup>
    import Menu from '@/components/menu.vue';
    import homeBtn from '@/components/home-btn.vue';
    import fallback from "@/components/fallback.vue";
    import { ref, onMounted } from "vue";

    const version = import.meta.env.VITE_APP_VERSION;
    let isLogin = ref(true);

    async function checkSession() {
        try {
            const data = await req.get("/getSession");
            if (data) {
                nickname.value = data.nickname;
                return true;
            }
        } catch (err) {
            console.error("getSession 检查失败:", err);
        }
        return false;
    }

    onMounted(async () => {
        const loggedIn = await checkSession();
        if (!loggedIn) {
            isLogin.value = false;
        }
    });
</script>

<style scoped>
    @import url(../assets/Home.css);
</style>