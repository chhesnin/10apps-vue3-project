<template lang="pug">
.object-detection
  h1.title Object Detection
  h5 *Try With Cell Phone Only
  //- *(ref="")
  //- *v-show 讓元素保持存在才不會抓不到
  video(v-show="isStreaming", ref="videoRef", autoplay="true")
  img(
    src="https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ref="imgRef",
    crossorigin="anonymous",
    v-show="!isStreaming"
  )
  //- *防止沒有 result 時出錯
  button(v-if="!isStreaming", @click="openCamera") Open Camera
  .btns(v-else)
    button(@click="snapshot") Snapshot
    button(@click="stopStreaming") Stop Streaming
  button.detect(@click="detect")
    span(v-if="isLoading") Loading...
    span(v-else) Detect Object
  .result(v-if="result.length > 0")
    h3 result: {{ result[0].class }}
</template>

<script>
require("@tensorflow/tfjs-backend-cpu");
require("@tensorflow/tfjs-backend-webgl");
const cocoSsd = require("@tensorflow-models/coco-ssd");
import { ref } from "vue";
// import { log } from "@tensorflow/tfjs-core";
export default {
  setup() {
    const imgRef = ref("");
    const videoRef = ref("");
    const result = ref([]);
    const isLoading = ref(false);
    const isStreaming = ref(false);

    async function detect() {
      const img = imgRef.value;
      isLoading.value = true;

      // *Load the model.
      const model = await cocoSsd.load();

      // *Classify the image.
      const predictions = await model.detect(img);
      result.value = predictions;
      isLoading.value = false;

      // console.log("Predictions: ");
      // console.log(result.value);
    }
    async function openCamera() {
      // *取用相機
      if (navigator.mediaDevices.getUserMedia) {
        // *列舉所有
        const devices = await navigator.mediaDevices.enumerateDevices();
        // *以 kind 過濾
        const cams = devices.filter((cam) => cam.kind == "videoinput");
        // *使用指定裝置
        const camId = cams[0].deviceId;
        isStreaming.value = true;
        navigator.mediaDevices
          // *OverconstrainedError:當使用 min 或者 exact 關鍵詞請求一個比較高的幀速率或者高的分辨率的時候就會出現此錯誤。
          // *.getUserMedia({ video: { deviceId: { exact: camId } } })
          .getUserMedia({ video: { deviceId: camId } })
          .then((stream) => {
            videoRef.value.srcObject = stream;
          });
      }
    }
    function stopStreaming() {
      const stream = videoRef.value.srcObject;
      const tracks = stream.getTracks();
      // *forEach or map
      tracks.forEach((track) => {
        track.stop();
      });
      isStreaming.value = false;
    }
    function snapshot() {
      const canvas = document.createElement("canvas");
      canvas.width = 300;
      canvas.height = 220;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.value, 0, 0, canvas.width, canvas.height);
      const data = canvas.toDataURL("image/png");
      // console.log(data);
      stopStreaming();
      imgRef.value.setAttribute("src", data);
      // imgRef.value.setAttribute("width", "300px");
      // imgRef.value.setAttribute("height", "220px");
    }

    return {
      imgRef,
      result,
      detect,
      isLoading,
      openCamera,
      videoRef,
      isStreaming,
      stopStreaming,
      snapshot,
    };
  },
};
</script>

<style lang="sass">
.object-detection
  display: flex
  flex-direction: column
  align-items: center
  margin-top: 30px
  overflow: hidden
  h1.title
    text-align: center
    letter-spacing: 1px
    margin-bottom: 30px
    @media screen and (max-width: 576px)
      margin-bottom: 20px
  h5
    font-weight: 300
    color: #c43131
    letter-spacing: 1px
    margin-bottom: 10px
  video
    border: 2px solid #ddd
    width: 300px
    height: 220px

  img
    // *只給一邊就會照原比例
    max-width: 300px
    width: 100%
  button
    margin: 50px 5px 0px 5px
    width: 115px
    &.detect
      margin-top: 15px
      span
        &:hover
          color: #eee
  .result
    h3
      margin-top: 30px
      letter-spacing: 1px
      color: rgba(#177089,0.8)
</style>