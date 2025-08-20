<template>
    <div class="AppContainer">
        <Menu :certificateRef="certificateRef" />
        <certificate ref="certificateRef" class="certificate" @updateData="handleUpdate" v-show="!isMobile" />
        <media class="media" v-show="isMobile" :nickname="certificateData.nickname"
            :totalAchievements="certificateData.totalAchievements" :goldCount="certificateData.goldCount"
            :silverCount="certificateData.silverCount" :copperCount="certificateData.copperCount"
            :certificateRef="certificateRef" />
        <footer>© 2008-2025 SDUTACM. All Rights Reserved.</footer>
    </div>

</template>

<script setup>
    import { ref, reactive, onMounted } from "vue";
    import certificate from '@/components/certificate.vue'
    import Menu from '@/components/menu.vue'
    import media from '@/components/media.vue';

    const certificateRef = ref(null);
    const isMobile = ref(false);
    
    onMounted(() => {
        isMobile.value = window.innerWidth <= 768
        window.addEventListener("resize", () => {
            isMobile.value = window.innerWidth <= 768
        })
    })

    const certificateData = reactive({
        totalAchievements: 0,
        nickname: "",
        goldCount: 0,
        silverCount: 0,
        copperCount: 0
    })

    function handleUpdate(payload) {
        Object.assign(certificateData, payload)
    }


</script>


<style scoped>
    @import url(./assets/main.css);
</style>