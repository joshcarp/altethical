export default function toggleDisplay(ID) {
    if (document.getElementById(ID)) {
        if (document.getElementById(ID).style.display === "block") {
            document.getElementById(ID).style.display = "none"
        }
        else { document.getElementById(ID).style.display = "block"; }
        //console.log("actually doing something");
    }
}