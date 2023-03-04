

fetch("https://api.themoviedb.org/3/movie/popular?api_key=4f5f43495afcc67e9553f6c684a82f84&language=en-US").then(response=>{
    return response.json()
}).then((data)=>{
    console.log(data.results)
})