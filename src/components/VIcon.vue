<script type="text/jsx">
export default {
  name: 'VIcon',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  render() {
    const name = this.$props.name
    if (name === undefined) {
      return ''
    }
    if (name.indexOf('el-') === 0) {
      return <i class={name}/>
    }
    if (name.indexOf('ra-') === 0) {
      return <i class={'iconfont ' + name}/>
    }
    return <svg class='icon svg-icon' aria-hidden='true'>
      <use href={'#icon-' + name}/>
    </svg>
  }
}
</script>
<style scoped>
.svg-icon {
  width: 1.1em;
  height: 1.1em;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
</style>
