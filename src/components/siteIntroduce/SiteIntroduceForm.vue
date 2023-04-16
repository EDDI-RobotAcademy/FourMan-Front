<template>
    <div class="NanumGothic mt-16">
        <div class="text-center mb-10" style="font-size: 35px; font-weight: bold;">
            FOUR MAN 소개
        </div>
        <div class="text-center mb-6" style="font-size: 17px;">
            카페는 많고 다양한 사람들이 휴식 공간, 회의, 공부 등 다양한 목적으로 이용하는 공간입니다.<br>
            이러한 카페는 막상 이용하고자 하는 시간에 사람들이 몰리거나 원하는 자리에 사람이 앉아 있으면 자리를 잡지 못하고 헛걸음을 하게 되는 일이 생기게 됩니다.<br>
            저희는 그래서 이러한 문제점을 해결해보고자 카페를 이용하고자 하는 시간과, 좌석, 주문까지 할 수 있는 웹사이트를 만들어보고자 하였습니다. 
        </div>
        <div class="mb-10">
            <img src="@/assets/naver.jpeg" style="width: 100%;
                                                height: 300px;
                                                margin: 0;
                                                padding: 0;">
        </div>
        <div class="mb-16" style="display: flex; margin-left: 200px; ,margin-right: 300px;">
            <div style="width: 20%; font-size: 18px; font-weight: bold;">
                TECK<br>
                STACK
            </div>
            <div style="width: 70%;">
                <v-divider class="mt-1 mb-3" style="border-top: 2px solid #808080;" />
                <div style="display: flex;">
                    <div style="width: 25%; font-size: 16px; font-weight: bold;">FRONT</div>
                    <div>Vue, Vuetify, Visual Studio Code</div>
                </div>
                <v-divider class="mt-3 mb-3" />
                <div style="display: flex;">
                    <div style="width: 25%; font-size: 16px; font-weight: bold;">BACK</div>
                    <div>Spring Boot, MySQL, JPA, IntelliJ</div>
                </div>
                <v-divider class="mt-3 mb-3" />
                <div style="display: flex;">
                    <div style="width: 25%; font-size: 16px; font-weight: bold;">ETC</div>
                    <div>Slack, GitHub, Docker, Redis, Notion</div>
                </div>
                <v-divider class="mt-3" />
            </div>
        </div>
        <div class="mb-16" style="display: flex; margin-left: 200px; ,margin-right: 300px;">
            <div style="width: 20%; font-size: 18px; font-weight: bold;">
                COMPANY<br>
                PROFILE
            </div>
            <div style="width: 70%;">
                <v-divider class="mt-1 mb-3" style="border-top: 2px solid #808080;" />
                <div style="display: flex;">
                    <div style="width: 25%; font-size: 16px; font-weight: bold;">설립연도</div>
                    <div>2023년 4월</div>
                </div>
                <v-divider class="mt-3 mb-3" />
                <div style="display: flex;">
                    <div style="width: 25%; font-size: 16px; font-weight: bold;">본사 위치</div>
                    <div>서울특별시 강남구 강남구 테헤란로14길 6</div>
                </div>
                <v-divider class="mt-3 mb-3" />
                <div style="display: flex;">
                    <div style="width: 25%; font-size: 16px; font-weight: bold;">주요 서비스</div>
                    <div>카페 예약 서비스</div>
                </div>
                <v-divider class="mt-3 mb-3" />
                <div style="display: flex;">
                    <div style="width: 25%; font-size: 16px; font-weight: bold;">매출액</div>
                    <div>8조 2,201억 원 (2023년)</div>
                </div>
                <v-divider class="mt-3 mb-3" />
                <div style="display: flex;">
                    <div style="width: 25%; font-size: 16px; font-weight: bold;">전체인력</div>
                    <div>4명 (본사 기준, 2023년 기준)</div>
                </div>
                <v-divider class="mt-3" />
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "SiteIntroduceForm",
}
</script>

<style scoped>
</style>