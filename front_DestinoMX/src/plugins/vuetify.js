// Vuetify
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import { VDatePicker } from "vuetify/labs/VDatePicker"
import "vuetify/dist/vuetify.min.css"
import "@mdi/font/css/materialdesignicons.css"

export const vuetify = createVuetify({
  components: {
    ...components,
    VDatePicker,
  },
  directives,
  theme: {
    defaultTheme: "light",
    //
  },
  icons: {
    iconfont: "mdi",
    color: "#fdba74",
  },
})
