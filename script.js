let cities = [
    {
        arabicName: "القاهره",
        name: "Al Qāhirah"
    },
    {
        arabicName: "المنوفيه",
        name: "Al Minūfīyah	"
    },
    {
        arabicName: "الاسكندريه",
        name: "Al Iskandarīyah	"
    },
    {
        arabicName: "بورسعيد",
        name: "Būr Sa‘īd	"
    },
    {
        arabicName: "الاقصر",
        name: "Al Uqşur	"
    }
]
for (city of cities) {
    const content = `
    <option >${city.arabicName}</option>
    `;
    document.getElementById('cities-select').innerHTML += content;
}

document.getElementById('cities-select').addEventListener('change', function () {
    document.getElementById('city-name').innerHTML = this.value;
  let cityName = "";
  for(let city of cities) {
    if (city.arabicName === this.value) {
        cityName = city.name;
    }
  }
  getPrayersTimingOfCity(cityName);
   
});

function getPrayersTimingOfCity(cityName) {

    let params = {
        country: "EG",
        city: cityName
    }

    axios.get('http://api.aladhan.com/v1/timingsByCity', {
        params: params
    })
        .then(function (response) {
            const timings = response.data.data.timings;
            fillTimeForPrayer('fajr-time', timings.Fajr);
            fillTimeForPrayer('sunrise-time', timings.Sunrise);
            fillTimeForPrayer('duhr-time', timings.Dhuhr);
            fillTimeForPrayer('asr-time', timings.Asr);
            fillTimeForPrayer('sunset-time', timings.Sunset);
            fillTimeForPrayer('isha-time', timings.Isha);

            const readableDate = response.data.data.date.readable;
            const weekDay = response.data.data.date.hijri.weekday.ar;
            const date = weekDay + " " + readableDate;
            document.getElementById('date').innerText = date;

            console.log(weekDay + " " + readableDate);
        })
        .catch(function (error) {
            console.log(error);
        })

}


getPrayersTimingOfCity('Al Qāhirah');
function fillTimeForPrayer(id, time) {
    document.getElementById(id).innerText = time;
}