const form = document.querySelector("form");
const get = async (resurs) => {
  const request = await fetch(resurs);
  const data = await request.json();
  return data;
};
const userValue = localStorage.getItem("user");
const check = (value) => {
  get("https://chat-server-json.onrender.com/users")
    .then((data) => {
      const dataArr = Array.from(data);
      console.log(data);
      dataArr.map((user) => {
        if (user.user === value) {
          window.open("./chat.html", "_self");
        } else {
          form.addEventListener("submit", (e) => {
            e.preventDefault();

            if (
              form.user.value === user.user &&
              form.password.value === user.password
            ) {
              window.open("./chat.html", "_self");
              localStorage.setItem("user", user.user);
            }
          });
        }
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
window.addEventListener("DOMContentLoaded", check(userValue));
