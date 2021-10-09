const Confirmed = document.querySelector(`.Confirmed`),
    Deaths = document.querySelector(`.Deaths`),
    Recoverd = document.querySelector(`.Recoverd`),
    Critical = document.querySelector(`.Critical`),
    Asia = document.querySelector(`.Asia`),
    Europe = document.querySelector(`.Europe`),
    Africa = document.querySelector(`.Africa`),
    Americas = document.querySelector(`.Americas`),
    World = document.querySelector(`.World`),
    TotalCases = document.querySelector(".TotalCasesnum"),
    TotalDeathes = document.querySelector(".NewCasesnum"),
    NewDeathes = document.querySelector(".TotalDeathesnum"),
    NewDeathesnum = document.querySelector(".NewDeathesnum"),
    totalRecoverednum = document.querySelector(".totalRecoverednum"),
    criticalnum = document.querySelector(".criticalnum"),
    country = document.querySelector("#selectcountry");

let selectedland = "Asia";

async function getCountry() {
    let statsCountry = await (
        await fetch("https://corona-api.com/countries")
    ).json();
    countryArray = statsCountry.data.map((item) => {
        return {
            NameCon: item.name,
            confirmed: item.latest_data.confirmed,
            deaths: item.latest_data.deaths,
            recovered: item.latest_data.recovered,
            critical: item.latest_data.critical,
            today_confirmed: item.today.confirmed,
            today_deaths: item.today.deaths,
        };
    });
    window.localStorage.setItem("countries", JSON.stringify(countryArray));
}

// getCountry()
let getCount = JSON.parse(window.localStorage.getItem("countries"));
console.log(getCount)
async function getRegion() {
    let Region = await (
        await fetch(
            "https://api.allorigins.win/raw?url=https://restcountries.herokuapp.com/api/v1"
        )
    ).json();
    regionArray = Region.filter((val) => val.region.length > 0).map((item) => {
        return {
            Name: item.name.common,
            region: item.region,
        };
    });
    window.localStorage.setItem("regions", JSON.stringify(regionArray));
}


// getRegion();
let getReg = JSON.parse(window.localStorage.getItem("regions"));
console.log(getReg);
let myChart;
function charpaint(countriesname, datacase) {
    console.log(myChart);
    if (myChart) {
        console.log(`destroy`);
        myChart.destroy();
    }
    var ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: countriesname,
            datasets: [{
                label: '# of Votes',
                data: datacase,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            maintainAspectRatio: false
        },
    });
}

function getland(land) {
    return getReg.filter((itay) => itay.region === land).map((itay) => itay.Name);
}

function getdata (land, casses) {
    let obj = {};
    getland(land).map((evgeni) => {getCount.map((wajde) => {if(wajde.NameCon==evgeni) {
        return obj[evgeni]=wajde[casses];
    }; 
    }) 
})
 console.log(obj ,`65656516565165654`,casses);
return obj;
}

charpaint(getland(selectedland),Object.values(getdata(selectedland,`deaths`))); 


selectcountry.addEventListener("change",()=>{
    let selected=document.querySelector("select").value
     console.log(selected)
     for(let i=0;i<getCount.length;i++){
         if(selected=="Any"){
             TotalCases.innerHTML=TotalDeathes.innerHTML=NewDeathes.innerHTML=NewDeathesnum.innerHTML=totalRecoverednum.innerHTML=criticalnum.innerHTML=""
         }
         if(selected==getCount[i].NameCon){
             console.log(getCount[i])
             TotalCases.innerHTML=getCount[i].confirmed
             TotalDeathes.innerHTML=getCount[i].today_confirmed
             NewDeathes.innerHTML=getCount[i].deaths
             NewDeathesnum.innerHTML=getCount[i].today_deaths
             totalRecoverednum.innerHTML=getCount[i].recovered
             criticalnum.innerHTML=getCount[i].critical
         }
     }
 });

 function interCountries(region){
    country.innerHTML=`<option value="Any">Any</option>`;
    let countryName=Object.keys(getdata(region, "confirmed"))
    for(let i=0;i<countryName.length;i++){
    country.innerHTML+=`<option value="${countryName[i]}">${countryName[i]}</option>`
    }
    } 
 
 function chartByRegion(region){
     console.log(111);
    charpaint( 
    Object.keys(getdata(region, "confirmed")),
    Object.values(getdata(region, "confirmed")),
    Object.values(getdata(region, "deaths")),
    Object.values(getdata(region, "recovered")),
    Object.values(getdata(region, "critical"))
  );
}

Confirmed.addEventListener("click", () => {
    charpaint(getland(selectedland),Object.values(getdata(selectedland,`confirmed`))); 
    
});
Deaths.addEventListener("click", () => {
    charpaint(getland(selectedland),Object.values(getdata(selectedland,`deaths`))); 
    
});
Recoverd.addEventListener("click", () => {
    charpaint(getland(selectedland),Object.values(getdata(selectedland,`recovered`))); 
     
});
Critical.addEventListener("click", () => {
    charpaint(getland(selectedland),Object.values(getdata(selectedland,`critical`))); 
     
});


Asia.addEventListener("click", () => {
    TotalCases.innerHTML=TotalDeathes.innerHTML=NewDeathes.innerHTML=NewDeathesnum.innerHTML=totalRecoverednum.innerHTML=criticalnum.innerHTML=""
    chartByRegion("Asia")
    interCountries("Asia") 
    selectedland = `Asia`;
});
Europe.addEventListener("click", () => {
    TotalCases.innerHTML=TotalDeathes.innerHTML=NewDeathes.innerHTML=NewDeathesnum.innerHTML=totalRecoverednum.innerHTML=criticalnum.innerHTML=""
    chartByRegion("Europe")
    interCountries("Europe")
    selectedland = `Europe`;
});
World.addEventListener("click", () => {
    TotalCases.innerHTML=TotalDeathes.innerHTML=NewDeathes.innerHTML=NewDeathesnum.innerHTML=totalRecoverednum.innerHTML=criticalnum.innerHTML=""
    chartByRegion("Oceania")
    interCountries("Oceania")
    selectedland = `Oceania`;
});
Africa.addEventListener("click", () => {
    TotalCases.innerHTML=TotalDeathes.innerHTML=NewDeathes.innerHTML=NewDeathesnum.innerHTML=totalRecoverednum.innerHTML=criticalnum.innerHTML=""
    chartByRegion("Africa")
    interCountries("Africa")
    selectedland = `Africa`;
});
Americas.addEventListener("click", () => {
    TotalCases.innerHTML=TotalDeathes.innerHTML=NewDeathes.innerHTML=NewDeathesnum.innerHTML=totalRecoverednum.innerHTML=criticalnum.innerHTML=""
    chartByRegion("Americas")
    interCountries("Americas")
    selectedland = `Americas`;
});



