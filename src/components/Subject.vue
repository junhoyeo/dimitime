<script>
export default {
  name: 'Subject',
  props: {
    subject: {
      type: String,
      default: ''
    },
    query: {
      type: String,
      default: '.'
    },
    time: {
      type: String,
      default: '10시'
    }
  }
}
</script>

<template>
  <td :class="{ selected: (subject == query) }">
    {{ subject }}
  </td>
</template>

<style lang="scss" scoped>
td.selected {
  background-color: #f5e78d;
}

.description {
  position: inline-block;
  background: rgba(29, 106, 154, 0.72);
  color: #fff;
  visibility: hidden;
  opacity: 0;

  /* transition effect. not necessary */
  transition: opacity .2s, visibility .2s;
}
td:hover .description {
  visibility: visible;
  opacity: 1;
}
</style>
