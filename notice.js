const feedUrl = 'https://rss2json.com/api.json?rss_url=https://feeds.feedburner.com/ndtvnews-india-news';


async function loadNews() {
  try {
    const res = await fetch(feedUrl);
    const data = await res.json();
    const articles = data.items;

    if (articles[0]) {
      document.querySelector('#news1 img').src = articles[0].enclosure?.link || 'https://via.placeholder.com/400x200';
      document.querySelector('#news1 h3').textContent = articles[0].title;
      document.querySelector('#news1 p').textContent = articles[0].description.slice(0, 150) + '...';
      document.querySelector('#news1 button').onclick = () => {
        window.open(articles[0].link, '_blank');
      };
    }

    if (articles[1]) {
      document.querySelector('#news2 img').src = articles[1].enclosure?.link || 'https://via.placeholder.com/400x200';
      document.querySelector('#news2 h3').textContent = articles[1].title;
      document.querySelector('#news2 p').textContent = articles[1].description.slice(0, 150) + '...';
      document.querySelector('#news2 button').onclick = () => {
        window.open(articles[1].link, '_blank');
      };
    }
  } catch (err) {
    console.error("Failed to load news:", err);
  }
}

loadNews();
setInterval(loadNews, 1 * 60 * 1000);



     async function getWeather() {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

        const res = await fetch(apiURL);
        const data = await res.json();

        const weather = data.current_weather;
        document.getElementById("location").textContent = `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`;
        document.getElementById("temp").textContent = weather.temperature;
        document.getElementById("condition").textContent = weather.weathercode === 0 ? "Clear" : "Check weather app";
      }, () => {
        document.getElementById("location").textContent = "Location access denied.";
      });
    } catch (error) {
      console.error("Weather load error:", error);
    }
  }

  getWeather();


const noticeBoard = document.getElementById('noticeBoard');
  const notices = JSON.parse(localStorage.getItem('notices')) || [];

  if (notices.length === 0) {
    noticeBoard.innerHTML = "<p>No notices posted yet.</p>";
  } else {
    notices.forEach(notice => {
      const div = document.createElement('div');
      div.innerHTML = `<h3>${notice.title}</h3><p>${notice.content}</p><hr>`;
      noticeBoard.appendChild(div);
    });
  } function clearNotices() {
    localStorage.removeItem('notices');
    location.reload(); 
  }



