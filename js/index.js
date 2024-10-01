window.onload = function() {
    const form = document.querySelector('form');
    const userInput = document.getElementById('user');
    const passwordInput = document.getElementById('password');
    const messagePara = document.querySelector('p');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Formni avtomatik yuborilishini oldini olish

        const user = userInput.value;
        const password = passwordInput.value;

        if (user && password) {
            try {
                // Login GET so'rovini yuborish
                const response = await fetch(`http://127.0.0.1:5000/login?username=${user}&password=${password}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const result = await response.json();

                if (response.status === 200) {
                    // Login muvaffaqiyatli bo'lsa, foydalanuvchini chat.html sahifasiga o'tkazish
                    window.open('chat.html')
                } else {
                    // Login yoki parol xato bo'lsa
                    messagePara.innerText = result.message || 'Login or password is incorrect';
                }
            } catch (error) {
                messagePara.innerText = 'Server error. Please try again later.';
            }
        } else {
            messagePara.innerText = 'Username and password are required';
        }
    });
}
