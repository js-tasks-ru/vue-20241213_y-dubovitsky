import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const count = ref(0);

    const changeCountHandler = (event, direction) => {
      switch(direction) {
        case 'plus': {
          // Увеличиваем, если count больше 0 и меньше 5
          if (count.value >= 0 && count.value <= 5) {
            count.value++;
          }
          break;
        }
        case 'minus': {
          // Уменьшаем, если count больше 0 и меньше 5
          if (count.value >= 0 && count.value <= 5) {
            count.value--;
          }
          break;
        }
      }
    }

    return {
      count,
      changeCountHandler
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        @click="(e) => changeCountHandler(e, 'minus')"
        :disabled="count <= 0"
      >➖</button>

      <span class="count" data-testid="count">{{count}}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        @click="(e) => changeCountHandler(e, 'plus')"
        :disabled="count >= 5"
      >➕</button>
    </div>
  `,
})
