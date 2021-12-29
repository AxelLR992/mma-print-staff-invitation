const guestForm = document.getElementById("guest-form");

guestForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Set button to loading mode
  const submitButton = document.getElementById("submit-button");
  submitButton.innerHTML = "LOADING...";
  submitButton.disabled = true;

  const firstName = document
    .getElementById("guest-form-first-name")
    .value.toUpperCase();
  const lastName = document
    .getElementById("guest-form-last-name")
    .value.toUpperCase();
  const phone = document.getElementById("guest-form-phone").value;

  if (
    !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone)
  ) {
    return alert("Please input a valid cell phone");
  }
  fetch("/services/printInvitation.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      phone,
    }),
  })
    .then((response) => response.blob())
    .then((blob) => {
      blob.type = "application/pdf";
      const objectUrl = URL.createObjectURL(blob);
      submitButton.innerHTML = "ENTER";
      submitButton.disabled = false;
      window.location.href = objectUrl;
    });
});
