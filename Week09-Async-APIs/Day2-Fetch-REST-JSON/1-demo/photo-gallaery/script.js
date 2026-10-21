const btnElement = document.getElementById("load-btn");
const gallerySection = document.getElementById("gallery-box");

//create a function to fetch data from the API
async function loadPhotos() {
    //when we dont have our data yet we want to display loading 
    gallerySection.innerHTML = "<p>Loading...</p>";
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/photos");
        console.log(response);
        if (!response.ok) {
            throw new Error("server error + response.status");
        }
        const photos = await response.json();
        console.log(photos);
        
        const galleryCard = photos.map((photo) => {
            return `<div class="card">
            <h3 class="card-title">${photo.id}.${photo.title}</h3>
            <img src="${photo.url}" alt="" class="card-img">
            </div>`;
        }).join("");

        gallerySection.innerHTML = galleryCard;
    }catch (error) {
        gallerySection.innerHTML = `<p>Something went wrong: ${error.message}</p>`;
    }
}

//attach eventlistner 
btnElement.addEventListener("click", loadPhotos);