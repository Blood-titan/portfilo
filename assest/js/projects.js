document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("projects-container");

  fetch("https://api.github.com/users/Blood-titan/repos?sort=updated")
    .then(res => res.json())
    .then(repos => {
      repos.forEach(repo => {
        // Skip forks
        if (repo.fork) return;

        const card = document.createElement("div");
        card.className = "project-card";

        card.innerHTML = `
          <div class="project-title">${repo.name}</div>
          
          <div class="project-links">
            <a href="${repo.html_url}" class="btn" target="_blank">GitHub</a>
            ${repo.homepage ? `<a href="${repo.homepage}" class="btn" target="_blank">Live Demo</a>` : ""}
          </div>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => {
      container.innerHTML = "<p>Failed to load projects. Please check back later.</p>";
      console.error(err);
    });
});
