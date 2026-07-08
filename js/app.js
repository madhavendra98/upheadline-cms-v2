import { db } from "./firebase-config.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const newsContainer = document.getElementById("newsContainer");

const newsRef = ref(db, "news");

onValue(newsRef, (snapshot) => {

    newsContainer.innerHTML = "";

    if (!snapshot.exists()) {
        newsContainer.innerHTML = `
            <h2 style="text-align:center;">
                अभी कोई समाचार उपलब्ध नहीं है।
            </h2>
        `;
        return;
    }

    const data = snapshot.val();

    Object.keys(data).reverse().forEach((key) => {

        const news = data[key];

        newsContainer.innerHTML += `
            <div class="news-card">
                <img src="${news.image || "https://picsum.photos/400/250"}" alt="News Image">
                <h3>${news.title}</h3>
                <p>${news.description}</p>
                <small>${news.category}</small>
            </div>
        `;
    });

});
