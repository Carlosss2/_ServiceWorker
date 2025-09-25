// Modal
const modal = document.getElementById("animeModal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");

// Lista de cole
const animeForm = document.getElementById("animeForm");
const animeList = document.querySelector(".anime-list");


openModal.onclick = () => modal.style.display = "block";
closeModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };





if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/src/serviceWorker.js')
      .then(reg => console.log('Service Worker registrado:', reg))
      .catch(err => console.log('Error al registrar SW:', err));
  });
}


// Función para crear un card dinámico
function crearAnimeCard(nombre, descripcion, capitulos) {
  const card = document.createElement("div");
  card.className = "anime-card";

  const imgDiv = document.createElement("div");
  imgDiv.className = "anime-img";
  const img = document.createElement("img");
  img.src = "/public/hunter.jpg"; 
  img.alt = nombre;
  img.className = "anime-img";
  imgDiv.appendChild(img);

  const infoDiv = document.createElement("div");
  infoDiv.className = "anime-info";
  const h3 = document.createElement("h3");
  h3.textContent = nombre;
  const p = document.createElement("p");
  p.textContent = descripcion;
  infoDiv.appendChild(h3);
  infoDiv.appendChild(p);

  const span = document.createElement("span");
  span.className = "anime-episodes";
  span.textContent = `${capitulos} capítulos`;

  card.appendChild(imgDiv);
  card.appendChild(infoDiv);
  card.appendChild(span);

  animeList.appendChild(card);
}

// Evento submit del formulario
animeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const capitulos = document.getElementById("capitulos").value.trim();

  if (nombre && descripcion && capitulos) {
    crearAnimeCard(nombre, descripcion, capitulos);

    // Cierra modal y resetea formulario
    modal.style.display = "none";
    animeForm.reset();
  }
});