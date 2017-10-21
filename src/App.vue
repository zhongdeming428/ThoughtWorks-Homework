<template>
  <div id="app">
    <head-part></head-part>
    <div id="content">
      <content-left id="left" @changeData="changeData"></content-left>
      <content-right id="right" :cars="data"></content-right>
    </div>
  </div>
</template>

<script>
  import HeadPart from "./components/Header";
  import ContentLeft from "./components/ContentLeft";
  import ContentRight from "./components/ContentRight";

export default {
  components: {ContentRight, ContentLeft, HeadPart},
  name: 'app',
  data(){
      return {
          data:{}
      }
  },
  methods:{
      changeData(data){
          //...
          let obj = {};
          obj.TimeRelatedMaintenance = data.TimeRelatedMaintenance.sort((a, b) => {
             return a.carBrand.charCodeAt(0) - b.carBrand.charCodeAt(0);
          });
          obj.DistanceRelatedMaintenance = data.DistanceRelatedMaintenance.sort((a, b) => {
            return a.carBrand.charCodeAt(0) - b.carBrand.charCodeAt(0);
          });
          obj.WriteOff = data.WriteOff.sort((a, b) => {
            return a.carBrand.charCodeAt(0) - b.carBrand.charCodeAt(0);
          });
          this.data = obj;
      }
  }
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html {
  font-size: 16px;
}
body {
  background-color: aqua;
}
#content {

}
#left,
#right {
  width: 50%;
  float: left;
  height:25rem;
  min-width: 500px;
}
#right {
  height: 30rem;
}
/* http://meyerweb.com/eric/tools/css/reset/
 v2.0 | 20110126
 License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  /*font-size: 100%;*/
  /*font: inherit;*/
  vertical-align: baseline;
  text-decoration: none;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
</style>
