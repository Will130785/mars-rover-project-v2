//DATA OBJECT
const store = {
    name: "",
    latestPhotoDate: "",
    launch_date: "",
    landing_date: "",
    status: "",
    photos: [],
    total_photos: "",
    max_sol: ""
};



//RENDER
const render = component => {
    const root = document.getElementById("root");

    root.innerHTML = component(store, Info, Photos);
};

//UPDATE STORE
const updateStore = (store, newState ) => {
    store = Object.assign(store, newState)
};

//APP COMPONENT
const App = (state, info, photos) => {

    if(state.name) {
        return (
            `
                ${info(state)}
                ${photos(state)}
            `
        )
    } else {
        return (
            `
                <div class="welcome">
                    <h1>Welcome to the Mars Rover dashboard</h1>
                    <h2>Please select a Rover to view its latest photos and data</h2>
                </div>
            `
        )
    }
};

//INFO COMPONENT
const Info = (state) => {

    return (`
        <div class="info">
            <h2>${state.name}</h2>
            <ul>
                <li class="info-item">Latest Photo Date (Earth): ${state.latestPhotoDate}</li>
                <li class="info-item">Latest Photo Date (Sol): ${state.max_sol}</li>
                <li class="info-item">Total photos taken: ${state.total_photos}</li>
                <li class="info-item">Launch Date: ${state.launch_date}</li>
                <li class="info-item">Landing Date: ${state.landing_date}</li>
                <li class="info-item ${state.status === "active" ? "active" : "complete"}">Status: ${state.status}</li>
            </ul>
        </div>
    `)
};

//PHOTOS COMPONENT
const Photos = (state) => {

    return (`
        <div class="photos">
            ${state.photos.map(photo => {
                return `
                    <img class="photo-pic" src=${photo.img_src}>
                `
            }).join("")}
        </div>
    `)
};



//EVENT LISTENERS
const eventListeners = () => {
    document.querySelector(".Curiosity").addEventListener("click", (e) => {
        const newData = {
            name: "Curiosity"
        }
    
        updateStore(store, newData);
        getInfo(store.name);
    });

    document.querySelector(".Spirit").addEventListener("click", (e) => {
        const newData = {
            name: "Spirit"
        }
    
        updateStore(store, newData);
        getInfo(store.name);

    });

    document.querySelector(".Opportunity").addEventListener("click", (e) => {
        const newData = {
            name: "Opportunity"
        }
    
        updateStore(store, newData);
        getInfo(store.name);

    });
}

//API CALLS
const getInfo = async (rover) => {
    //Save result of api call to result variable
    const result = await fetch(`http://localhost:3000/info?rover=${rover}`)
    .then(res => res.json())

    //Update store with photo_manifest info
    updateStore(store, result.res1.photo_manifest);
    //Update store again with latest photos
    updateStore(store, {photos: result.res2.photos});
    //Update store once more with latest photo date
    updateStore(store, {latestPhotoDate: result.date});

    //Render data
    render(App);
};

//Initiate event listeners
eventListeners();
render(App);
