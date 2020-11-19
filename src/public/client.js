//DATA STORES
//Initiate store and photoObj variables to empty strings, these will be replaced by immutable objects upon page load
let store = "";
let photoObj = "";

//RENDER
const render = (component, rover) => {
    const root = document.getElementById("root");

    root.innerHTML = component(Info, Photos, rover);
};

//APP COMPONENT
const App = (info, photos, rover) => {

    //Check that store exists, if not render the welcome screen or if so render info and photo components
    if(store) {
        //Get rover and photo data
        const data = store.get(rover);
        const photoData = photoObj.get(rover)
        return (
            `   <div>
                    ${info()(data)}
                    ${photos()(photoData)}
                </div>
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
const Info = () => {

    return (data) => {
        return (`
        <div class="info">
            <h2>${data.photo_manifest.name}</h2>
            <ul>
                <li class="info-item">Latest Photo Date (Earth): ${data.photo_manifest.max_date}</li>
                <li class="info-item">Latest Photo Date (Sol): ${data.photo_manifest.max_sol}</li>
                <li class="info-item">Total photos taken: ${data.photo_manifest.total_photos}</li>
                <li class="info-item">Launch Date: ${data.photo_manifest.launch_date}</li>
                <li class="info-item">Landing Date: ${data.photo_manifest.landing_date}</li>
                <li class="info-item ${data.photo_manifest.status === "active" ? "active" : "complete"}">Status: ${data.photo_manifest.status}</li>
            </ul>
        </div>
    `)

    }

};

//PHOTOS COMPONENT
const Photos = () => {
  
  return (data) => {

        return (`
        <div class="photos">
            ${data.latest_photos.map(photo => {
                return `
                    <img class="photo-pic" src=${photo.img_src}>
                `
            }).join("")}
        </div>
    `)
    }

};


//EVENT LISTENERS
const eventListeners = () => {
    document.querySelector(".Curiosity").addEventListener("click", (e) => {
        render(App, "curiosity");
    });

    document.querySelector(".Spirit").addEventListener("click", (e) => {
        render(App, "spirit")

    });

    document.querySelector(".Opportunity").addEventListener("click", (e) => {
        render(App, "opportunity");

    });
}

//API CALLS
const getInfo = async (rover) => {
    //Save result of api call to result variable
    const result = await fetch(`http://localhost:3000/info?rover=${rover}`)
    .then(res => res.json())

    //Build Immutable store object
    store = await Immutable.Map({
        curiosity: result.curiosity,
        spirit: result.spirit,
        opportunity: result.opportunity
    });

    //Render data
    render(App);
};

const getPhotos = async (rover) => {
    //Save result of api call to result variable
    const result = await fetch(`http://localhost:3000/photos?rover=${rover}`)
    .then(res => res.json())

    //Build Immutable photo object
    photoObj = await Immutable.Map(result)

};

//Render app as soon as page loads
render(App);
//Initiate event listeners
eventListeners();
//Build store and photoObj as soon as page loads
getInfo();
getPhotos();

