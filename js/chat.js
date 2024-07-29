const nameDiv = document.querySelector(".name");
const content = document.querySelector(".content");
const form = document.querySelector("form");
const h1 = document.createElement("h1");
nameDiv.appendChild(h1);
h1.innerHTML = localStorage.getItem("user");
const deleteBtn = document.createElement("button");
deleteBtn.innerHTML = "Clear";
nameDiv.appendChild(deleteBtn);
const get = async (resurs) => {
  const request = await fetch(resurs);
  const data = await request.json();
  return data;
};
const deleteMessage = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) {
    console.error('DELETE so\'rovida xato:', error);
  }
};

// Ma'lumot yuborish funksiyasi
const post = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('POST so\'rovida xato:', error);
  }
};
setInterval(async () => {
  try {
    const response = await fetch('https://chat-server-json.onrender.com/chat');
    const messages = await response.json();
    textshow()
  } catch (error) {
    console.error('Xatolik:', error);
  }
}, 3000);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.text.value) {
    e.preventDefault();
  } else {
    const text = {
      user: localStorage.getItem("user"),
      text: form.text.value,
    };
    post("https://chat-server-json.onrender.com/chat", text);
    setTimeout(() => {
      textshow();
    }, 500);
  }
  form.text.value = "";
});
window.addEventListener("DOMContentLoaded", textshow());
function textshow() {
  get("https://chat-server-json.onrender.com/chat").then((data) => {
    const dataArr = Array.from(data);
    content.innerHTML = "";
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

deleteBtn.addEventListener("click", (e) => {
  e.preventDefault();
  deleteMessage("https://chat-server-json.onrender.com/chat");
  setTimeout(() => {
    location.reload();
  }, 3000);
});
