import { Router } from "express"
import express from "express"
import { converter } from "./converter.js"
import path from "node:path"

const router = Router()

router.use("/", express.static(path.join("./src/pages")))
router.use("/xml-to-json", converter)
router.post("/xml-to-json", converter)

export { router }
