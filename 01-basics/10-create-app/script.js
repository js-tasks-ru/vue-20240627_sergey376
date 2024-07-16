import { defineComponent, createApp } from 'vue/dist/vue.esm-bundler.js'

const options = {
  dateStyle: 'long'
};

const DateLocal = defineComponent({
  name: 'DateLocal',
  setup () {
    function formatAsLocalDate() {
      return new Date().toLocaleDateString('ru-RU', options)
    }
    return {
      formatAsLocalDate,
    }
  },
  template:  '<div>Сегодня {{ formatAsLocalDate() }}</div>'
})

createApp(DateLocal)
  .mount('#app')
