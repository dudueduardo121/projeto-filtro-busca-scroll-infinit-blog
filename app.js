const postContainer = document.querySelector('#posts-container')
const loaderContainer = document.querySelector('.loader')
const inputFilter = document.querySelector('#filter')

let page = 1
const url = `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`

const getPost = async () => {
   const response =  await fetch(url)
   return response.json()
}

const addPostsIntoDom = async () => {
    const posts = await getPost()
    const postTemplates = posts.map(({id, title, body}) => 
        `<div class="post">
            <div class="number">${id}</div>
            <div class="post-info">
                <h2 class="post-title">${title}</h2>
                <p class="post-body">${body}</p>
            </div>
        </div>`
    ).join('')

    postContainer.innerHTML += postTemplates
    //console.log(postTemplates)
}

addPostsIntoDom()

const getNextPosts = () => {
    setTimeout(() =>{
        page++
        addPostsIntoDom()
    }, 300)
}

const removeLoader = () => {
    setTimeout(() => {
        loaderContainer.classList.remove('show')
        getNextPosts()
    },1000)
}

const showLoader = () =>{
    loaderContainer.classList.add('show')
    removeLoader()
}

window.addEventListener('scroll', ()=>{
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement
    const isPage =scrollTop + clientHeight >= scrollHeight - 10 

   if(isPage){
    //console.log('faltam 10 pixels para pagina acabar')
    showLoader()
   }
})

// recebe input value como parametro 
const selectPostVisibit = inputValue => post => {

    const postTitle = post.querySelector('.post-title').textContent.toLowerCase()
    const postBody = post.querySelector('.post-body').textContent.toLowerCase()
    const inputVerifi =  postTitle.includes(inputValue) || postBody.includes(inputValue)

    if(inputVerifi){
        post.style.display = 'flex'
        return
    }

    post.style.display = 'none'
    
}

const randoInputValue = event =>{
    const inputValue = event.target.value.toLowerCase()
    const posts = document.querySelectorAll('.post')

    posts.forEach(selectPostVisibit(inputValue))

    

}

inputFilter.addEventListener('input', randoInputValue)

