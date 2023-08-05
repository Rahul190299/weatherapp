let weatherArray=[];
let set=new Set([]);
async function getData(city){
    console.log(city);
   
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=95471263596409d3569d7aa27e52d4e8&units=metric`);
        if(!response.ok){
            alert("could not find city");
            return;
        } 
        
        const data= await response.json();

    if(set.has(data.name)){
        alert("city alredy exists");
        return;
    }
    set.add(data.name);
    console.log(data);
    weatherArray.push(data);
    setData(weatherArray);
}

function setData(weatherArray){
    let div=document.getElementById("container");
    let innerHtml=getInnerHtml(weatherArray);
    div.innerHTML=innerHtml;
}

function getInnerHtml(weatherArray){
    let imgurl='Rectangle%201.png';
    weatherArray=weatherArray.sort(function(a,b) { return a.main.feels_like-b.main.feels_like});
    let innerHtml=weatherArray.map((item) => {
      let weatherImg=getImage(item);  
      return   `<div class=" h-60" style="background-image: url(${imgurl}); background-repeat: no-repeat; width:380px;  background-position: center;">
        <div class=" flex justify-between">
          <div class="my-auto">
            <h1 class="text-5xl font-semibold text-white dark:text-gray-100 mt-16 ml-8">${item.main.feels_like}°</h1>

            
          </div>
          <img  src=${weatherImg} alt="Card Image" class="w-2/5 h-36 ">
        </div>  
        <div>
          <p class=" text-gray-300 dark:text-gray-400 ml-8">H:${item.coord.lat}° L:${item.coord.lon}°</p>
        </div>  
        
          <div class="flex ml-8  justify-between ">
            <p class="text-white text-xl w-3/4">${item.name}</p>
            <p class="text-white text-start mr-2 w-1/4">${item.weather[0].main}</p>
          </div>
         
            
      </div>`
    })
    return innerHtml.join("");
}

function getImage(item){
    if(item.weather[0].main=="Clouds"){
        return "Moon%20cloud%20mid%20rain.png";
    }
    else if(item.weather[0].main=="Haze"){
        return "Moon%20cloud%20fast%20wind.png";
    }
    else if(item.weather[0].main=="Rain"){
        return "Sun%20cloud%20angled%20rain@3x.png";
    }
    else{
        return "Tornado.png";
    }
}
let button=document.querySelector('button');
button.addEventListener('click',function(){
    let input=document.querySelector('input');
    let inputText=input.value;
    getData(inputText);
    
})



