import { Router } from "express"
import { readFileSync } from "fs"
import { parseStringPromise } from "xml2js"

const converter = Router()

converter.get("/", async (req, res) => {
  try {
    // Read XML file synchronously
    const xmlData = readFileSync("./public/export.xml", "utf8")

    // Parse XML to JSON using xml2js (promisified)
    const result = await parseStringPromise(xmlData, { explicitArray: false })

    // Stream JSON response in chunks
    res.type("json")
    result.HealthData.ExportDate = { value: result.HealthData.ExportDate }
    const jsonString = JSON.stringify(result.HealthData)

    // Split the JSON string into chunks and send them
    const chunkSize = 1024 // Set your desired chunk size
    for (let i = 0; i < jsonString.length; i += chunkSize) {
      const chunk = jsonString.slice(i, i + chunkSize)
      res.write(chunk)
    }
    res.end()
  } catch (error) {
    console.error("Error:", error)
    res.status(500).send("Internal Server Error")
  }
})

export { converter }
