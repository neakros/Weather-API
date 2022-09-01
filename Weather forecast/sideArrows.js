const sideArrows = document.querySelectorAll(".side_arrow");

for (const sideArrow of sideArrows) {
    sideArrow.addEventListener("mouseover", () => {
        sideArrow.nextElementSibling.style.display = "block";
    });
    sideArrow.addEventListener("mouseout", () => {
        sideArrow.nextElementSibling.style.display = "none";
    });
}