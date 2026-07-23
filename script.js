const SUPABASE_URL = "https://tfrsrsvhderijmrybzmj.supabase.co";
const SUPABASE_KEY = "sb_publishable_AxdZ0eVKp6Nu6K8vAXrhMA_fTItm2jI";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const CODE = "MARKUS50";


function anmelden() {
    const eingabe = document.getElementById("code").value;

    if (eingabe === CODE) {
        alert("Willkommen bei Markus 50er!");
        document.querySelector(".upload").style.display = "block";
    } else {
        alert("Falscher Einladungscode!");
    }
}


async function hochladen() {

    const dateien = document.querySelector('input[type="file"]').files;

    for (let datei of dateien) {

        const dateiname = Date.now() + "-" + datei.name;

        const { error } = await supabaseClient.storage
            .from("bilder")
            .upload(dateiname, datei);

        if (error) {
            alert("Fehler beim Hochladen: " + error.message);
            return;
        }
    }

    alert("Bilder erfolgreich hochgeladen! 🎉");
}


document
    .querySelector(".login button")
    .addEventListener("click", anmelden);


document
    .querySelector(".upload button")
    .addEventListener("click", hochladen);
async function bilderLaden() {

    const { data, error } = await supabaseClient.storage
        .from("bilder")
        .list();

    if (error) {
        console.log(error);
        return;
    }

    const galerie = document.getElementById("galerie");
    galerie.innerHTML = "";

    data.forEach(datei => {

        const url = SUPABASE_URL +
        "/storage/v1/object/public/bilder/" +
        datei.name;

        galerie.innerHTML += `
            <div>
                <img src="${url}" width="100%">
                <br>
                <a href="${url}" download>
                    Bild herunterladen
                </a>
            </div>
        `;
    });
}


bilderLaden();
document
    .querySelector(".login button")
    .addEventListener("click", anmelden);
