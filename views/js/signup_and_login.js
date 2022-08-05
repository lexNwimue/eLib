// Login Script
const form = document.getElementById("login-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const errSpan = document.getElementById("err-span");
  errSpan.style.visibility = "hidden";
  const email = form.email.value;
  const password = form.password.value;
  const body = { email, password };

  const response = await fetch("/user/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (data.err) {
    errSpan.style.visibility = "visible";
  }
});
