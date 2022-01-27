window.addEventListener("load", () => {
    let date = new Date();
    let hour = date.getHours();

    if (hour >= 6 && hour <= 18) {
        document.body.style.background = "#ffffff";
        document.body.style.color = "#000";
    } else {
        document.body.style.background = "#000";
        document.body.style.color = "#ffffff";
    }

    /* let queryData = "india"
    let client_id = "IiqmPv9eivEXrHG5uV9XuYHOp0OBxEnquG5vv9-rhIo";
    const url = `https://api.unsplash.com/search/photos?page=1&query=${queryData}&client_id=${client_id}&per_page=30`

    axios.get(url).then((res)=>{
        console.log(res);
    }) */
})

const search = () => {
    let val = document.getElementById('input').value;
    getImagesFromUnplashServer(val);
}

const enterKeyPressHandler = (event) => {
    if (event.key == "Enter") {
        getImagesFromUnplashServer(event.target.value);
    }
}

const getImagesFromUnplashServer = (queryData) => {
    if (!!queryData) {
        let client_id = "IiqmPv9eivEXrHG5uV9XuYHOp0OBxEnquG5vv9-rhIo";
        const url = `https://api.unsplash.com/search/photos?page=1&query=${queryData}&client_id=${client_id}&per_page=30`
        axios.get(url).then((res) => {
            document.getElementById('grid').innerHTML = "";
            loadImagesToUI(res.data.results);
        })
    }
}


const loadImagesToUI = (results) => {
    for (let index = 0; index < results.length; index++) {
        let imageDiv = document.createElement('div');
        imageDiv.className = "img";
        imageDiv.style.backgroundImage = "url(" + results[index].urls.raw + ")";
        imageDiv.addEventListener('click', () => {
            window.open(results[index].links.download, "_blank");
        })
        document.getElementById('grid').appendChild(imageDiv);
    }
}
