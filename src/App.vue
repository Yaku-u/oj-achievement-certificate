<template>
    <div class="container">
        <Menu :certificateRef="certificateRef" />
        <certificate ref="certificateRef" />
    </div>

</template>

<script setup>
    import { ref } from "vue";
    import certificate from '@/components/certificate.vue'
    import Menu from '@/components/menu.vue'

    const certificateRef = ref(null);
</script>


<style scoped>
    .container {
        -webkit-user-select: none;
        user-select: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>