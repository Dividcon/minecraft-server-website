document.querySelectorAll(".copy-ip").forEach(button => {

  button.addEventListener("click", async () => {

    const ip = button.dataset.copy;

    try {

      await navigator.clipboard.writeText(ip);

      const toast =
        document.getElementById("toast");

      toast.classList.add("show");

      setTimeout(() => {
        toast.classList.remove("show");
      }, 1800);

    } catch {

      button.textContent =
        "IP: " + ip;

      setTimeout(() => {
        button.textContent =
          "COPY IP";
      }, 1800);

    }

  });

});

// ================= SERVER PLAYER COUNT =================

const playerCount = document.getElementById("player-count");
const serverStatus = document.querySelector(".status");

async function updateServerStatus() {
  try {
    const response = await fetch(
      "https://api.mcsrvstat.us/3/play.oceansurvival.net"
    );

    const data = await response.json();

    if (data.online) {
      const online = data.players?.online ?? 0;
      const max = data.players?.max ?? 0;

      playerCount.textContent =
        `${online} / ${max}`;

      serverStatus.innerHTML =
        `<span></span> ONLINE`;

      serverStatus.classList.add("online");
      serverStatus.classList.remove("offline");

    } else {
      playerCount.textContent = "0";

      serverStatus.innerHTML =
        `<span></span> OFFLINE`;

      serverStatus.classList.add("offline");
      serverStatus.classList.remove("online");
    }

  } catch (error) {
    console.error("Could not fetch server status:", error);

    playerCount.textContent = "—";
  }
}


// Check immediately
updateServerStatus();

// Update every 60 seconds
setInterval(updateServerStatus, 60000);
