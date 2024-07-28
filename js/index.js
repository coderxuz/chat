const form = document.querySelector('form')
const get = async(resurs)=>{
    const request = await fetch(resurs)
    const data = await request.json()
    return data
}
const userValue = localStorage.getItem('user')
const check = (value)=>{
        get('http://localhost:3000/users').then((data)=>{
            const dataArr = Array.from(data)
            if(value){
                window.open('./chat.html', '_self')
            }
            else{

                form.addEventListener('submit', (e)=>{
                    e.preventDefault()
                    dataArr.map((user)=>{
                        
                        if(form.user.value === user.user && form.password.value === user.password){
                           window.open('./chat.html', '_self')
                           localStorage.setItem('user', user.user)
                        }
                    })
                })
            }
        })
}
window.addEventListener('DOMContentLoaded', check(userValue))