import { defineComponent, createApp } from 'vue';

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const getLongDateTime = (date) => (
  date.toLocaleDateString('en-EN', options)
)

const rootComponent = defineComponent({
  name: 'RootComponent',
  setup() {
    const currentDate = getLongDateTime(new Date(), options)

    return { currentDate };
  },
  template: `<div>Сегодня {{ currentDate }}</div>`
});

createApp(rootComponent).mount('#app');
