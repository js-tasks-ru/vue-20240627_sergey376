import { defineComponent, createApp } from 'vue/dist/vue.esm-bundler.js'

const options = {
  dateStyle: 'long'
};

const DateLocal = defineComponent({
  name: 'DateLocal',
  setup () {
    function formatAsLocalDate() {
      return new Date().toLocaleDateString(navigator.language, options)
    }
    return {
      data: formatAsLocalDate(),
    }
  },
  template:  '<div>Сегодня {{ data }} </div>'
})

createApp(DateLocal)
  .mount('#app')
