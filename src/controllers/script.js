if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/serviceWorker.js')
      .then(reg => console.log('Service Worker registrado:', reg))
      .catch(err => console.log('Error al registrar SW:', err));
  });
}

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("animeModal");
    const openModal = document.getElementById("openModal");
    const closeModal = document.getElementById("closeModal");

    const animeForm = document.getElementById("animeForm");
    const animeList = document.querySelector(".anime-list");

    // Abrir/cerrar modal
    openModal.onclick = () => modal.style.display = "block";
    closeModal.onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };

    let animes;
    try {
        animes = JSON.parse(localStorage.getItem("animes")) || [];
        animes.forEach(anime => crearAnimeCard(anime));
    } catch (error) {
        console.warn("Error al parsear desde localStorage:", error);
        animes = [];
    }

    // Evento submit
    animeForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const anime = {
            nombre: document.getElementById("nombre").value.trim(),
            descripcion: document.getElementById("descripcion").value.trim(),
            capitulos: document.getElementById("capitulos").value.trim()
        };

        if (anime.nombre && anime.descripcion && anime.capitulos) {
            animes.push(anime);
            localStorage.setItem("animes", JSON.stringify(animes));

            crearAnimeCard(anime);

            modal.style.display = "none";
            animeForm.reset();
            document.getElementById("nombre").focus();
        }
    });

    // Función para crear card en el DOM
    function crearAnimeCard(anime) {
        const card = document.createElement("div");
        card.className = "anime-card";

        const imgDiv = document.createElement("div");
        imgDiv.className = "anime-img";
        const img = document.createElement("img");
        img.src = "/public/hunter.jpg";
        img.alt = anime.nombre;
        img.className = "anime-img";
        imgDiv.appendChild(img);

        const infoDiv = document.createElement("div");
        infoDiv.className = "anime-info";
        const h3 = document.createElement("h3");
        h3.textContent = anime.nombre;
        const p = document.createElement("p");
        p.textContent = anime.descripcion;
        infoDiv.appendChild(h3);
        infoDiv.appendChild(p);

        const span = document.createElement("span");
        span.className = "anime-episodes";
        span.textContent = `${anime.capitulos} capítulos`;

        card.appendChild(imgDiv);
        card.appendChild(infoDiv);
        card.appendChild(span);

        animeList.appendChild(card);
    }
  });