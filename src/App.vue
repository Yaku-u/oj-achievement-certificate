<template>
    <div class="container">
        <div class="certificate-container">
            <div class="certificate-border">
                <div class="content">
                    <div class="title">
                        <p>获奖证书</p>
                        <h1>Certificate of Achievement</h1>
                    </div>

                    <div class="user">
                        <p>恭喜 / Congratulation</p>
                        <div class="nickname">{{ nickname }}</div>
                        <p>获得 / Acquire</p>
                    </div>
                    <div class="achievement">
                        <canvas ref="achievementCloud"></canvas>
                    </div>
                </div>

                <div class="footer">
                    <div>
                        Date: <strong>{{ IssueDate }}</strong>
                    </div>
                    <div>
                        Certificate ID: <strong>{{ CertificateID }}</strong>
                    </div>
                </div>

                <div class="left">
                    <div class="top"></div>
                    <div class="bottom"></div>
                    <div class="mid-bottom"></div>
                    <div class="mid-top"></div>
                </div>

                <div class="right">
                    <div class="top"></div>
                    <div class="bottom"></div>
                    <img src="./assets/sdutacm_logo_colorful.svg" class="logo" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    import WordCloud from "wordcloud";
    import req from "@/utils/req.js";
    import achievementsConfig from "./configs/achievement-config";

    const IssueDate = new Date().toISOString().slice(0, 10);
    const CertificateID = Date.now().toString();
    const levelToWeight = {
        3: 35,
        2: 25,
        1: 14,
    };
    const levelToColor = {
        3: "#000",
        2: "#333",
        1: "#888",
    };
    const achievementCloud = ref(null);
    const achievements = ref([]);
    const nickname = ref("");

    // 获取会话状态并获取昵称
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


    // 模拟登录
async function ojLogin() {
    try {
        const res = await req.post("/login", {
            loginName: "sdutwujinhao@gmail.com",
            password: "138671995qq"
        });
        console.log("模拟登录成功:", res);
        return true;
    } catch (err) {
        console.error("模拟登录失败:", err);
        return false;
    }
}

    // 获取用户成就
    async function getSelfAchievedAchievements() {
        try {
            const data = await req.post("/getSelfAchievedAchievements");
            achievements.value = [];
            data.rows.forEach((item) => {
                const config = achievementsConfig.find(
                    (a) => a.achievementKey === item.achievementKey
                );
                if (config) {
                    achievements.value.push({
                        achievementKey: item.achievementKey,
                        title: config.title,
                        level: config.level,
                    });
                }
            });
            initWordCloud();
        } catch (err) {
            console.error("获取成就失败", err);
        }
    }


    // 创建 Canvas
    function createHiDPICanvas(canvas, cssWidth, cssHeight) {
        const ratio = window.devicePixelRatio || 1; //读取当前设备的像素比
        canvas.width = cssWidth * ratio;
        canvas.height = cssHeight * ratio;
        canvas.style.width = cssWidth + "px";
        canvas.style.height = cssHeight + "px";
        const ctx = canvas.getContext("2d");
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    const initWordCloud = () => {
        const canvas = achievementCloud.value;
        const cssWidth = 800; 
        const cssHeight = 340; 

        // 提升 Canvas 像素密度
        createHiDPICanvas(canvas, cssWidth, cssHeight);
        const sortAchievements = [...achievements.value].sort((a,b) => b.level - a.level);
        const wordList = sortAchievements.map((a) => [
            a.title,
            levelToWeight[a.level],
        ]);

        const achievementCount = achievements.value.length;
        const gridSize = achievementCount < 15 ? 20 : 8;
        const weightFactor = achievementCount < 15 ? 1.8 : 1.5;


        WordCloud(canvas, {
            list: wordList,
            gridSize: gridSize,
            weightFactor: weightFactor,
            fontFamily: "Microsoft YaHei, Arial, sans-serif",
            color: (word) => {
                const a = achievements.value.find((item) => item.title === word);
                return a ? levelToColor[a.level] : "#000";
            },
            backgroundColor: "#fff",
            rotateRatio: 0,
            drawOutOfBound: false,
            shrinkToFit: true,
            origin: [cssWidth / 2, cssHeight / 2],
        });
    };

    onMounted(async () => {
        const loggedIn = await checkSession();
        if(!loggedIn){
            await ojLogin();
        }
        await getSelfAchievedAchievements();
    });
</script>

<style scoped>
    @import url(./assets/test.css);
</style>