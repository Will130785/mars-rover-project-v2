//DATA OBJECT
const store = {
    name: "",
    latestPhotoDate: "",
    launch_date: "",
    landing_date: "",
    status: "",
    photos: []
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
        return `<h1>Welcome to the Mars Rover dashboard`
    }
};

//INFO COMPONENT
const Info = (state) => {

    return (`
        <div class="info">
            <h2>${state.name}</h2>
            <ul>
                <li class="info-item">Latest Photo Date: ${state.latestPhotoDate}</li>
                <li class="info-item">Launch Date: ${state.launch_date}</li>
                <li class="info-item">Landing Date: ${state.landing_date}</li>
                <li class="info-item">Status: ${state.status}</li>
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
                    <img class="photo-pic" src=${photo}>
                `
            }).join("")}
        </div>
    `)
};



//EVENT LISTENERS
const eventListeners = () => {
    document.querySelector(".Curiosity").addEventListener("click", (e) => {
        console.log("You clicked me");
        const newData = {
            name: "Curiosity",
            // latestPhotoDate: "17-11-2020",
            // launchDate: "20-12-2010",
            // landingDate: "20-01-2011",
            // status: "Active",
            // photos: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1SqrBHzWoPE6n8P0_WP-PCqjD1J8z97A_ng&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpSwyLLNVcKnRibjV9RljP2dKHwirqRCqYGw&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw3BxQgdMOWzaoAj8RGF7X3sakQiiEjUlHAw&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC9pJB1Hy2liZmqHignhfG5XOzNd4D0i2Yug&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThxX7_vVzY8LpIGxGnoy0ue-c_jgMuJXXgrQ&usqp=CAU"]
        }
    
        updateStore(store, newData);
        console.log(store);
        getInfo(store.name);
        // render(App);
    });

    document.querySelector(".Spirit").addEventListener("click", (e) => {
        console.log("You clicked me");
        const newData = {
            name: "Spirit",
            // latestPhotoDate: "13-9-2019",
            // launchDate: "20-12-2009",
            // landingDate: "20-01-2009",
            // status: "Complete",
            // photos: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1SqrBHzWoPE6n8P0_WP-PCqjD1J8z97A_ng&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpSwyLLNVcKnRibjV9RljP2dKHwirqRCqYGw&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw3BxQgdMOWzaoAj8RGF7X3sakQiiEjUlHAw&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC9pJB1Hy2liZmqHignhfG5XOzNd4D0i2Yug&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThxX7_vVzY8LpIGxGnoy0ue-c_jgMuJXXgrQ&usqp=CAU"]
        }
    
        updateStore(store, newData);
        console.log(store);
        getInfo(store.name);
    
        // render(App);
    });

    document.querySelector(".Opportunity").addEventListener("click", (e) => {
        console.log("You clicked me");
        const newData = {
            name: "Opportunity",
            // latestPhotoDate: "12-10-2020",
            // launchDate: "20-12-2009",
            // landingDate: "20-01-2009",
            // status: "Active",
            // photos: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1SqrBHzWoPE6n8P0_WP-PCqjD1J8z97A_ng&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpSwyLLNVcKnRibjV9RljP2dKHwirqRCqYGw&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw3BxQgdMOWzaoAj8RGF7X3sakQiiEjUlHAw&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC9pJB1Hy2liZmqHignhfG5XOzNd4D0i2Yug&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThxX7_vVzY8LpIGxGnoy0ue-c_jgMuJXXgrQ&usqp=CAU"]
        }
    
        updateStore(store, newData);
        console.log(store);
        getInfo(store.name);
    
        // render(App);
    });
}

//API CALLS
const getInfo = async (rover) => {
    const result = await fetch(`http://localhost:3000/info?rover=${rover}`)
    .then(res => res.json())

    console.log(result.result);
    updateStore(store, result.result.photo_manifest);
    render(App);
};

// getInfo();
//Initiate event listeners
eventListeners();
render(App);
