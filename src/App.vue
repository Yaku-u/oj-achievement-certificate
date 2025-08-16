<template>
    <div class="AppContainer">
        <Menu :certificateRef="certificateRef" />
        <certificate ref="certificateRef" />
        <footer>© 2008-2025 SDUTACM. All Rights Reserved.</footer>
    </div>

</template>

<script setup>
    import { ref } from "vue";
    import certificate from '@/components/certificate.vue'
    import Menu from '@/components/menu.vue'

    const certificateRef = ref(null);
</script>


<style scoped>
@import url(./assets/main.css);
</style>