

/* Global Variables */
const apiKey = '&appid=92ad8be999a1c3fbb3df2efff1f03966&units=metric';
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';

const generateBtn = document.querySelector('#generate');
const zipBox = document.querySelector('#zip');
const feelingBox = document.querySelector('#feelings');

const date = document.querySelector('#date');
const temp = document.querySelector('#temp');
const content = document.querySelector('#content');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

generateBtn.addEventListener('click',buttonPressed);

function buttonPressed(){
    let zip = zipBox.value;
    fetchData(baseUrl,zip,apiKey)
    .then(data => {
    const postedData = {
        date : newDate,
        feels_like : data.main.temp + "°C",
        feelings : feelingBox.value
        
    };
    
    postData('/data',postedData)
    .then(()=>{
        getData('/data')
        .then((allData) =>{
            updateUI(allData);
            
        })
    })
    
})
}

const fetchData = async (baseUrl,zip,apiKey)=>{
    const res = await fetch(baseUrl+zip+apiKey)
    try{
        const data = await res.json();
        console.log(data);
        return data;
    }
    catch(error){
        console.log("error",error);
    }
}

const getData = async (localUrl) =>{
    const res = await fetch(localUrl)
    
    try{
        const data = await res.json();
        console.log(data);
        return data;
    }
    catch(error){
        console.log("error",error);
    }
}

const postData = async (localUrl ='' , data = {}) => {
    console.log(localUrl);
    const res = await fetch(localUrl, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'content-type': 'application/json',},
        body: JSON.stringify(data),
    });
    console.log("success");
    try{
        const newData = await res.text();
        console.log(newData);
        return newData;
    }
    catch(error){
        console.log("error",error);
    }
}

function updateUI(data){
    date.innerHTML = data.date;
    temp.innerHTML = data.feels_like;
    content.innerHTML = data.feelings || "do u feel nothing? :(";
}

