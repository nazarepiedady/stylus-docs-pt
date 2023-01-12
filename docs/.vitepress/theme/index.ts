import { h } from 'vue'
import Theme from 'vitepress/theme'
import '../style/main.css'
import '../style/vars.css'
import 'uno.css'
import HomePage from '../components/HomePage.vue'
import Runkit from '../components/Runkit.vue'

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      'home-features-after': () => h(HomePage),
    })
  },
  enhanceApp({ app }) {
    app.component('Runkit', Runkit)
  }
}

