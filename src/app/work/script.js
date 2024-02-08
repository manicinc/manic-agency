
if (typeof window !== 'undefined') {
    alert("ADD")
    document.querySelectorAll(".gallery ul li a").click(function() {
        let itemID = this.attr('href');
        document.querySelectorAll(".gallery ul").classList.add("item_open");
        itemID.classList.add("item_open");
        return false;
    });
    document.getElementByClassName("close").click(function() {
        $('.port, .gallery ul').classList.remove("item_open");
        return false;
    });
    
    document.querySelectorAll(".gallery ul li a").click(function() {
        $('html, body').animate({
            scrollTop: parseInt(document.getElementById("top").offset().top)
        }, 400);
    });
}

