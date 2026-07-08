import { db } from "./firebase-config.js";
import { ref, push } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

window.publishNews = async function () {

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const image = document.getElementById("image").value;
    const category = document.getElementById("category").value;

    if (!title || !description) {
        alert("Title और Description भरें");
        return;
    }

    try {

        await push(ref(db, "news"), {
            title,
            description,
            image: image || "https://picsum.photos/600/400",
            category,
            date: new Date().toISOString()
        });

        alert("✅ News Published Successfully");

        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("image").value = "";

    } catch (error) {
        alert(error.message);
    }

}
