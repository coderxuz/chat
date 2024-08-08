type Text1 = {
  user: string;
  text: string;
};
const POLLING_INTERVAL = 5000;
const user = localStorage.getItem("user");
if (!user) {
  window.open("index.html", "_self");
} 
const post = async (url: string, data: Text1) => {
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


const get1 = async (url: string): Promise<Text1[]> => {
  const request = await fetch(url);
  if (!request.ok) {
    throw new Error(`${request.status}`);
  }
  const data = await request.json();
  return data;
};
function startPolling(url: string) {
  setInterval(async () => {
    try {
      const data = await get1(url);
      console.log('Yangi ma\'lumotlar:', data);
      updateContent(data); // Ma'lumotlarni yangilash uchun funksiya
    } catch (error) {
      console.error('Polling xatosi:', error);
    }
  }, POLLING_INTERVAL);
}
const del = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    for (let item of data) {
      const del = await fetch(`${url}/${item.id}`, {
        method: "DELETE",
      });
    }
  } catch (err) {
    console.error(err);
  }
};
function updateContent(data: Text1[]) {
  const content = document.querySelector<HTMLDivElement>('.content');
  if (content) {
    content.innerHTML = ''; // Eski ma'lumotlarni tozalash
    for (let item of data) {
      const box = document.createElement('div');
      box.classList.add('box');
      const boxInner = document.createElement('div');
      boxInner.classList.add('box-inner');
      boxInner.innerHTML = `<p>${item.text}</p>`;
      if (item.user === localStorage.getItem('user')) {
        boxInner.style.right = '0';
      } else {
        boxInner.style.left = '0';
      }
      box.appendChild(boxInner);
      content.appendChild(box);
    }
  }
}

const nameDiv = document.querySelector<HTMLDivElement>(".name")!;
const content = document.querySelector(".content")! as HTMLDivElement;
const formChat = document.querySelector("form");

if (user) {
  const h1 = document.createElement("h1");
  nameDiv.appendChild(h1);
  h1.innerHTML = user;
}
const btn = document.createElement("button");
nameDiv.appendChild(btn);
btn.innerHTML = "Clear";

class text {
  user: string;
  text: string;
  constructor(user: string, text: string) {
    this.user = user;
    this.text = text;
  }
}
formChat?.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  if (formChat.text.value === "") {
    e.preventDefault();
  } else {
    const userText1 = new text(`${user}`, `${formChat.text.value}`);
    post("https://chat-server-json.onrender.com/chat", userText1);
    formChat.text.value = "";
  }
});

btn.addEventListener("click", () => {
  del("https://chat-server-json.onrender.com/chat");
});
startPolling('https://chat-server-json.onrender.com/chat');