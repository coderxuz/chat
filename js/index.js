"use strict";
const form = document.querySelector('form');
const load = document.querySelector('.load');
const get = async (url) => {
    const request = await fetch(url);
    if (!request.ok) {
        throw new Error(`${request.status}`);
    }
    const data = await request.json();
    load.style.display = 'none';
    return data;
};
get('https://chat-server-json.onrender.com/users').then((data) => {
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (form.user && form.password) {
            for (let item of data) {
                console.log(item);
                console.log(item.user);
                if (item.user === form.user.value && item.password === form.password.value) {
                    window.open('chat.html', '_self');
                    localStorage.setItem('user', item.user);
                }
                else {
                    const p = document.querySelector('p');
                    p.innerHTML = 'username or password false';
                }
            }
        }
    });
});
