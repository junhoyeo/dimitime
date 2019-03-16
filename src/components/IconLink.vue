<script>
export default {
  name: 'IconLink',
  props: {
    name: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    }
  },

  methods: {
    onClick: function () {
      window.open(this.url, '_blank')
    }
  }
}
</script>

<template>
  <div class="wrap" @click="onClick">
    <img :src="require(`./../assets/${icon}.png`)"/>
  </div>
</template>

<style lang="scss" scoped>
div.wrap {
  display: inline-block;
  position: relative;
  text-align: center;
}

span {
  font-family: 'NanumSquare', sans-serif;
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50%;
}

img {
  margin: 3px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 8px 1px lightgray;
}

img:hover {

}
</style>
