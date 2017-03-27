<template>
    <div class="st-picker">
            <div class="st-picker__thumbnail">
                <div v-show="isEnabled" ref="preview" class="st-picker__preview"></div>
                <input ref="inputfile" v-on:change="init" v-if="selectimage" id="inputFileToLoad" type="file"/>
                 <!--v-model="imageValue"-->
                <div id="imagePlaceHolder">
                    <img :src="imageValue" ref="prevewImage"
                    v-on:click="onSelectColor"
                    v-on:mousedown="handleMouseDown"
                    v-on:mousemove="onMouseMove" />
                </div>
                <div class="st-picker__result" ref="result" v-if="showcolor" v-show="curentColor"></div>
                <button v-on:click="toggleState" ref="but" id="st-picker__enableColorPicker" v-if="toggleselect">выбрать цвет</button>
            </div>
            <canvas id="st-picker__cs" ref="c"></canvas>
        </div>
</template>
<script src="./ImgColorPicker.js"></script>
<style src="./ColorPickerStyle.css" scoped></style>
