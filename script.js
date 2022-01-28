let client_id = "IiqmPv9eivEXrHG5uV9XuYHOp0OBxEnquG5vv9-rhIo";
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

    localStorage.setItem('pageNum', "1");
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

const next = () => {
    let pageNum = +localStorage.getItem("pageNum");
    pageNum += 1;// pageNum = pageNum +1;
    localStorage.setItem("pageNum", pageNum);
    let queryData = localStorage.getItem("queryData");
    getImagesFromUnplashServer(queryData, pageNum)
}

const getImagesFromUnplashServer = (queryData, pageNum = 1) => {
    if (!!queryData) {
        localStorage.setItem("queryData", queryData);
        const url = `https://api.unsplash.com/search/photos?page=${pageNum}&query=${queryData}&client_id=${client_id}&per_page=30`
        axios.get(url).then((res) => {
            const gridEle = document.getElementById('grid');
            gridEle.innerHTML = "";
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
