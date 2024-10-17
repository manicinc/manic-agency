if (typeof window !== 'undefined') {
    alert("ADD");
    document.querySelectorAll(".gallery ul li a").forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            const itemID = (this as HTMLAnchorElement).getAttribute('href');
            document.querySelectorAll(".gallery ul").forEach(ul => ul.classList.add("item_open"));
            if (itemID) {
                document.querySelector(itemID)?.classList.add("item_open");
            }
        });
    });

    document.querySelectorAll(".close").forEach(closeButton => {
        closeButton.addEventListener('click', function(event) {
            event.preventDefault();
            document.querySelectorAll('.port, .gallery ul').forEach(el => el.classList.remove("item_open"));
        });
    });

    document.querySelectorAll(".gallery ul li a").forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            const topElement = document.getElementById("top");
            if (topElement) {
                window.scrollTo({
                    top: topElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

