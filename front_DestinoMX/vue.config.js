const fs = require("fs")
const path = require("path")

const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  transpileDependencies: true,
})

module.exports = {
  devServer: {
    https: true,
    port: 8081,
  },
  devServer: {
    https: {
      key: fs.readFileSync(
        path.resolve("../back_DestinoMX/src/OpenSSL/certKey.key"),
      ),
      cert: fs.readFileSync(
        path.resolve("../back_DestinoMX/src/OpenSSL/cert.crt"),
      ),
    },
  },
}
