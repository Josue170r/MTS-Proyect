// Vuetify
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import { VDatePicker } from "vuetify/labs/VDatePicker"

export const vuetify = createVuetify({
  components: {
    ...components,
    VDatePicker,
  },
  directives,
})
