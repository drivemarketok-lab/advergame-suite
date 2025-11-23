const { GoogleGenerativeAI } = require("@google/generative-ai");

// Accedemos a la clave que ya guardaste en Secrets
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    console.log("🔍 Consultando modelos disponibles para tu llave...");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Dummy init

    // Truco para listar modelos (usamos fetch directo porque la librería a veces lo oculta)
    const apiKey = process.env.GEMINI_API_KEY;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();

    if (data.models) {
      console.log("\n✅ MODELOS APROBADOS PARA TI:");
      data.models.forEach(m => {
        if (m.name.includes("gemini")) {
          console.log(`👉 ${m.name.replace("models/", "")}`);
        }
      });
    } else {
      console.log("❌ Error:", data);
    }
  } catch (error) {
    console.error("Error fatal:", error);
  }
}

listModels();