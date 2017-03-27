<template>
  <div id="app">
   <div class="st-picker-demo">
            <h3>Basic usage</h3>
            <p></p>
            <code>
                &lt;image-color-picker imagesrc="test-img.jpg"&gt;&lt;/image-color-picker&gt;
            </code>
            <div class="demo-element">
                <image-color-picker imagesrc="./demo/test-img.jpg"></image-color-picker>
            </div>
        </div>
         <div class="st-picker-demo">
            <h3>Image selection</h3>
            <p></p>
            <code>
                &lt;image-color-picker toggleselect="true"&gt;&lt;/image-color-picker&gt;
            </code>
            <div class="demo-element">
                <image-color-picker toggleselect="true"></image-color-picker>
            </div>
        </div>
  </div>
</template>

<script>
import ImageColorPicker from '../src/VueImgColorPicker.vue'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    'image-color-picker' : ImageColorPicker
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
