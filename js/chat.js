const nameDiv = document.querySelector(".name");
const content = document.querySelector(".content");
const form = document.querySelector("form");

const get = async (resurs) => {
  const request = await fetch(resurs);
  const data = await request.json();
  return data;
};
nameDiv.innerHTML = `<h1>${localStorage.getItem("user")}</h1>`;
const post = async (url, data = {}) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error(err);
  }
};
form.addEventListener("submit", (e) => {
    e.preventDefault()
  if (!form.text.value) {
    e.preventDefault();
  } else {
    const text = {
      user: localStorage.getItem("user"),
      text: form.text.value,
    };
    post("https://chat-server-json.onrender.com/chat", text);
    textshow();
  }
});
window.addEventListener("DOMContentLoaded", textshow());
function textshow() {
  get("https://chat-server-json.onrender.com/chat").then((data) => {
    const dataArr = Array.from(data);
    dataArr.map((item) => {
      const box = document.createElement("div");
      const boxInner = document.createElement("div");
      content.appendChild(box);
      box.appendChild(boxInner);
      box.classList = "box";
      boxInner.classList = "box-inner";
      boxInner.id = item.user;
      boxInner.innerHTML = `<p>${item.text}</p>`;
      if (item.user === localStorage.getItem("user")) {
        boxInner.style.right = "0";
      } else {
        boxInner.style.left = "0";
      }
    });
  });
}
