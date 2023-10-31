<template>
    <div class="app">
        <Navbar :toggleTheme="toggleTheme" />
        <router-view></router-view>
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

        <!-- 5 блок заданий -->
        <!-- <Task5Form/> -->
        <!-- <AnotherTask5Form/> -->
        <!-- <CounterTask5Vue/> -->
        <!-- <ToggleComponentTask5/> -->
        <!-- <TogglerComponent/> -->
        <!-- <div>
            <h2>Select Component Example</h2>
            <SelectComponent v-model="selectedOption" :options="options" />
            <p>Selected Option in Parent: {{ selectedOption }}</p>
        </div> -->
        <!-- <SelectComponent :selectedOption='selectedOption' :options="options"/> -->
        <!-- <div>
            <h2>Dropdown Select Example</h2>
            <DropdownSelect v-model="selectedOption" :options="dropdownOptions" />
            <p>Selected Option in Parent: {{ selectedOption }}</p>
        </div>
        <CustomSelectComponent :options="options" v-model="selectedOption"/> -->
    </div>
    
</template>

<script>
import Navbar from './components/UI/Navbar.vue';
import TaskNamedSlot from "@/components/tasksComponents/TaskNamedSlot.vue";
import FallbackContentSlot from "@/components/tasksComponents/FallbackContentSlot.vue";
import ChildSlotComponent from "@/components/tasksComponents/ChildSlotComponent.vue";
import ModalSlot from "@/components/ModalSlot.vue";
import ValueUpdateDirictive from '@/components/directives/ValueUpdateDirictive.js';
import TooltipDirective from "@/components/directives/TooltipDirective";
import Task5Form from "@/components/tasksComponents/Task5From.vue";
import AnotherTask5Form from './components/tasksComponents/AnotherTask5Form.vue';
import CounterTask5Vue from './components/tasksComponents/CounterTask5.vue';
import ToggleComponentTask5 from './components/tasksComponents/ToggleComponentTask5.vue';
import TogglerComponent from './components/tasksComponents/TogglerComponent.vue';
import SelectComponent from './components/tasksComponents/SelectComponent.vue';
import CustomSelectComponent from './components/tasksComponents/CustomSelectComponent.vue';

export default{
    components:{
        Navbar, TaskNamedSlot, FallbackContentSlot, 
        ChildSlotComponent, ModalSlot, ValueUpdateDirictive, 
        TooltipDirective, Task5Form, AnotherTask5Form, CounterTask5Vue,
        ToggleComponentTask5, TogglerComponent, SelectComponent, CustomSelectComponent
    },
    data() {
        return {
            isModalVisible: false,
            directiveValue: "Ой",
            elementTightened: false,
            selectedOption: 'Option 1',
            options: ['Option 1', 'Option 2', 'Option 3'],
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