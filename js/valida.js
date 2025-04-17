document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const erroDiv = document.getElementById("erro");
  const resultado = document.getElementById("resultado");

  if (!id) {
    erroDiv.style.display = "block";
    resultado.style.display = "none";
    return;
  }

  fetch("../documentos.json")
    .then((response) => response.json())
    .then((data) => {
      const doc = data.find((d) => d.id === id);
      if (!doc) {
        erroDiv.style.display = "block";
        resultado.style.display = "none";
        return;
      }

      document.getElementById("doc-id").textContent = doc.id;
      document.getElementById("doc-cliente").textContent = doc.cliente;
      document.getElementById("doc-titulo").textContent = doc.titulo;
      document.getElementById("doc-data").textContent = doc.data;
      document.getElementById("doc-sha256").textContent = doc.sha256;
      document.getElementById("doc-pdf").href = doc.pdf_url;
    })
    .catch((err) => {
      erroDiv.style.display = "block";
      resultado.style.display = "none";
      console.error("Erro ao carregar JSON:", err);
    });
});
