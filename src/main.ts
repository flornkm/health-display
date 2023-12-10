import express from "express"
import { router } from "./router.js"

const app = express()
const port = 3000

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true, limit: "50mb" }))

app.use("/", router)

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})
