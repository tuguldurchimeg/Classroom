
fetch('https://data.num.edu.mn/dataset/83728e39-7e8a-4d16-b5d1-53420545305a/resource/71f4ae45-fe46-4dac-bce5-4b63cbe7cf7a/download/-2023-autumn.json'
).then(response => response.json())
.then(json => console.log(JSON.stringify(json)))