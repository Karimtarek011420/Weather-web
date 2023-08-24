var todayLocation=document.getElementById('todayLocation');
var todayTemp=document.getElementById('todayTemp');
var todayConditionImg=document.getElementById('todayConditionImg');
var todayConditionText=document.getElementById('todayConditionText');
var humidity=document.getElementById('humidity');
var windSpeed=document.getElementById('windSpeed');
var windDirection=document.getElementById('windDirection');
var nextConditioniImg=document.getElementsByClassName('nextConditioniImg');
var nextmaxtemp=document.getElementsByClassName('nextmaxtemp');
var nextmintemp=document.getElementsByClassName('nextmintemp');
var nexttext=document.getElementsByClassName('nexttext');
var todayDateName=document.getElementById('todayDateName');
var todayDateNumber=document.getElementById('todayDateNumber');
var todayDateMonth=document.getElementById('todayDateMonth');
var Find=document.getElementById('Find')
async function weatherData(coumtrycity){
     var weatherApi=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=71dbd040c45b418aa92175158231802&q=${coumtrycity}&days=3`)
      var waetherresponse =await weatherApi.json();
      return waetherresponse;
}
function displayTodayData(data){
    var today= new Date();
    todayDateName.innerHTML=today.toLocaleDateString('en-us',{weekday:'long'})
    todayDateMonth.innerHTML=today.toLocaleDateString('en-us',{month:'long'})
    todayDateNumber.innerHTML=today.getDate();
    todayLocation.innerHTML=data.location.name;
    todayTemp.innerHTML=data.current.temp_c;
    todayConditionImg.setAttribute("src",data.current.condition.icon)
    todayConditionText.innerHTML=data.current.condition.text;
    humidity.innerHTML=data.current.humidity+"%";
    windSpeed.innerHTML=data.current.wind_kph;
    windDirection.innerHTML=data.current.wind_dir;
}
function displayNextData(data){
    var alldata= data.forecast.forecastday;
    for(var i=0;i<2;i++){
        nextConditioniImg[i].setAttribute("src",alldata[i+1].day.condition.icon);
        nextmaxtemp[i].innerHTML=alldata[i+1].day.maxtemp_c;
        nextmintemp[i].innerHTML=alldata[i+1].day.mintemp_c;
        nexttext[i].innerHTML=alldata[i+1].day.condition.text
    }
}
async function allweather(trem="londan"){
  var weatDataApi= await weatherData(trem);
  if(!weatDataApi.error){
    displayTodayData(weatDataApi);
    displayNextData(weatDataApi);
  }
  
}
allweather();
Find.addEventListener("input",function(){
    allweather(Find.value)
})
