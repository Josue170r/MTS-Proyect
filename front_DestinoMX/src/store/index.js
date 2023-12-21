import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate"

export default createStore({
  state: {
    idUsuario: null,
  },
  plugins: [
    createPersistedState({
      paths: ["idUsuario"],
    }),
  ],
})
