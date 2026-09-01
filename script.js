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
