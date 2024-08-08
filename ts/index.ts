const form = document.querySelector('form')  as HTMLFormElement
type user = {user:string, password:string}[]
const load = document.querySelector('.load')! as HTMLDivElement
const get = async (url:string):Promise<user>=>{
    const request = await fetch(url)
    if(!request.ok){
        throw new Error(`${request.status}`);
        
    }
    const data = await request.json()
    load.style.display = 'none'
    return data
}

get('https://chat-server-json.onrender.com/users').then((data:user)=>{
    form?.addEventListener('submit', (e:SubmitEvent)=>{
        e.preventDefault()
       if(form.user && form.password){
        for(let item of data){
            console.log(item);
            console.log(item.user);
            
            if(item.user === form.user.value && item.password === form.password.value){
                window.open('chat.html', '_self')
                localStorage.setItem('user', item.user)
            }
            else{
                const p = document.querySelector('p')!
                p.innerHTML = 'username or password false'
            }
        }
       }
    })
})