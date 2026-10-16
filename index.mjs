import app from "./src/app.mjs";

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Huellas & Cia corriendo en http://localhost:${PORT}`);
});
