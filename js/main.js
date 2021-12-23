const guestForm = document.getElementById("guest-form");

guestForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = document.getElementById("guest-form-first-name").value;
  const lastName = document.getElementById("guest-form-last-name").value;
  const email = document.getElementById("guest-form-email").value;

  fetch("/services/printInvitation.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
    }),
  })
    .then((response) => response.blob())
    .then((blob) => {
      const objectUrl = URL.createObjectURL(blob);
      window.open(objectUrl);
    });
});
