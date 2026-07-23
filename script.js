const code = "MARKUS50";

function anmelden() {
    const eingabe = document.getElementById("code").value;

    if (eingabe === code) {
        alert("Willkommen bei Markus 50er!");
    } else {
        alert("Falscher Einladungscode!");
    }
}

document.querySelector(".login button").addEventListener("click", anmelden);
