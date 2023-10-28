<template>
    <div class="app">
        <navbar :toggleTheme="toggleTheme"></navbar>
        <router-view></router-view>
        <main-page></main-page>
        <!-- <task-named-slot>
            <template v-slot:header>
                <h2>Custom Header</h2>
            </template>

            <template v-slot:content>
                <p>Custom Content</p>
            </template>

        </task-named-slot> -->

        <!-- <fallback-content-slot>
            <template v-slot:content>
                <p>Hello world!</p>
            </template>
        </fallback-content-slot> -->
        <!-- <child-slot-component>
            <template v-slot="{ data }">
                <p>Данные из дочернего компонента: {{ data }}</p>
            </template>
        </child-slot-component> -->
        <!-- <button @click="openModal">Открыть модальное окно</button>
        <modal-slot :show="isModalVisible" @close="closeModal">
            <template v-slot:header>
                <h3>Новый заголовок</h3>
            </template>
            <template v-slot:body>
                <p>Новый текст</p>
            </template>
            <template v-slot:footer>
                <button @click="closeModal">Закрыть</button>
            </template>
        </modal-slot> -->
        
        <!-- 1 По директивам -->
        <!-- <p v-text-color>Vcvcvcbvc</p> -->
        
        <!-- 2 По директивам  -->
        <!-- <div>
            <button @click="updateValue">Update Directive Value</button>
            <p v-update="directiveValue">Directive Value: {{ directiveValue }}</p>
        </div> -->

        <!-- <div>
            <p v-tooltip="'This is a tooltip'">Hover over me</p>
            <p v-tooltip="'Another tooltip'">Hover over this</p>
        </div> -->
        <!-- <div>
            <button @click="toggleElement()">Toggle Element</button>
            <p v-tighten="elementTightened">This element can be tightened.</p>
        </div> -->

        <!-- <div>
            <button @click="sayHello">Say Hello</button>
        </div> -->
    </div>
    
</template>

<script>
import Navbar from './components/UI/Navbar.vue';
import TaskNamedSlot from "@/components/TaskNamedSlot.vue";
import FallbackContentSlot from "@/components/FallbackContentSlot.vue";
import ChildSlotComponent from "@/components/ChildSlotComponent.vue";
import ModalSlot from "@/components/ModalSlot.vue";
import ValueUpdateDirictive from '@/components/directives/ValueUpdateDirictive.js';
import TooltipDirective from "@/components/directives/TooltipDirective";

export default{
    components:{
        Navbar, TaskNamedSlot, FallbackContentSlot, ChildSlotComponent, ModalSlot, ValueUpdateDirictive, TooltipDirective
    },
    data() {
        return {
            isModalVisible: false,
            directiveValue: "Ой",
            elementTightened: false
        };
    },
    methods: {
        openModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        updateValue() {
            this.directiveValue = "Ура!";
        },
        toggleElement() {
            this.elementTightened = !this.elementTightened;
        },
    },
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
}

</style>