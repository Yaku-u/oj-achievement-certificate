<template>
    <div class="downMenu">
        <div class="downBtn" @click="print">
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px">
                <path
                    d="M640-640v-120H320v120h-80v-200h480v200h-80Zm-480 80h640-640Zm560 100q17 0 28.5-11.5T760-500q0-17-11.5-28.5T720-540q-17 0-28.5 11.5T680-500q0 17 11.5 28.5T720-460Zm-80 260v-160H320v160h320Zm80 80H240v-160H80v-240q0-51 35-85.5t85-34.5h560q51 0 85.5 34.5T880-520v240H720v160Zm80-240v-160q0-17-11.5-28.5T760-560H200q-17 0-28.5 11.5T160-520v160h80v-80h480v80h80Z" />
            </svg>
            Print
        </div>
        <div class="downBtn" @click="downloadAsPNG">
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px">
                <path
                    d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
            </svg>
            Export as PNG
        </div>
        <div class="downBtn" @click="downloadAsPDF">
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px">
                <path
                    d="M360-460h40v-80h40q17 0 28.5-11.5T480-580v-40q0-17-11.5-28.5T440-660h-80v200Zm40-120v-40h40v40h-40Zm120 120h80q17 0 28.5-11.5T640-500v-120q0-17-11.5-28.5T600-660h-80v200Zm40-40v-120h40v120h-40Zm120 40h40v-80h40v-40h-40v-40h40v-40h-80v200ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z" />
            </svg>
            Export as PDF
        </div>
    </div>
</template>

<script setup>
    import html2canvas from "html2canvas";
    import { jsPDF } from "jspdf";
    import { toRefs } from "vue";

    const props = defineProps({
        certificateRef: Object
    });

    const { certificateRef } = toRefs(props);

    async function captureCertificate() {
        const target = certificateRef.value?.$el || certificateRef.value;
        if (!target) return;

        // 先用 html2canvas 渲染
        const rawCanvas = await html2canvas(target, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff"
        });

        // 创建一个新的 Canvas，把图片缩放到 A4 300 DPI 尺寸
        const A4_WIDTH = 3508;
        const A4_HEIGHT = 2480;
        const finalCanvas = document.createElement("canvas");
        finalCanvas.width = A4_WIDTH;
        finalCanvas.height = A4_HEIGHT;

        const ctx = finalCanvas.getContext("2d");
        ctx.drawImage(rawCanvas, 0, 0, A4_WIDTH, A4_HEIGHT);
        return finalCanvas;
    }

    async function downloadAsPNG() {
        const canvas = await captureCertificate();
        if (!canvas) return;
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "certificate.png";
        link.click();
    }

    async function downloadAsPDF() {
        const canvas = await captureCertificate();
        if (!canvas) return;
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (imgHeight <= pageHeight) {
            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        } else {
            let heightLeft = imgHeight;
            let position = 0;
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
        }

        pdf.save("certificate.pdf");
    }
</script>

<style scoped>
    .downMenu {
        transition: all 0.3s ease;
        position: absolute;
        top: 60px;
        right: 20px;
        background-color: white;
        border: 1px solid #ccc;
        min-width: 100px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        z-index: 100;
    }

    .downBtn {
        padding: 15px;
        cursor: pointer;
        transition: all 0.3s;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .downBtn:hover {
        color: #40a9ff;
        fill: #40a9ff;
    }

</style>
