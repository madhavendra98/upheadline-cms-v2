import { db } from "./firebase-config.js";
import { ref, push } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

window.publishNews = async function () {

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const image = document.getElementById("image").value.trim();
    const category = document.getElementById("category").value;

    if (!title || !description) {
        alert("Title और Description भरें");
        return;
    }

    // यदि image खाली है तो default image
    const imageUrl = image !== "" ? image : "https://via.placeholder.com/600x350?text=UPHeadline";

    try {

        await push(ref(db, "news"), {
            title: title,
            description: description,
            image: imageUrl,
            category: category,
            date: Date.now()
        });

        alert("✅ News Published Successfully");

        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("image").value = "";
        document.getElementById("category").selectedIndex = 0;

    } catch (err) {
        console.error(err);
        alert("Error : " + err.message);
    }

};
