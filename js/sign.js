
document.getElementById('signForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Formni to'g'ridan-to'g'ri yuborilishini to'xtatadi

    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;

    if (user && password) {
        try {
            // Sign so'rovini yuborish
            const response = await fetch('http://127.0.0.1:5000/sign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user: user, password: password })
            });

            const result = await response.json();

            // Agar muvaffaqiyatli bo'lsa, index.html ga o'tkazadi
            if (response.status === 200) {
                window.location.href = 'chat.html'; // Foydalanuvchini index sahifasiga o'tkazadi
            } else {
                // Xabarni ekranga chiqarish
                document.getElementById('message').innerText = result.message || 'Error occurred';
            }
        } catch (error) {
            document.getElementById('message').innerText = 'Server error';
        }
    } else {
        document.getElementById('message').innerText = 'Username and password are required';
    }
});