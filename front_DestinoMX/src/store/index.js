import { createStore } from "vuex"

export default createStore({
  state: {
    idUsuario: localStorage.getItem("idUsuario"),
  },
})
