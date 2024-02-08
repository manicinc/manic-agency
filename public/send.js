if (typeof window !== "undefined") {
    var form = document.getElementById("contact-form");
    form.addEventListener('submit', handleForm);
    console.log("ELEMENT: ", document.getElementById('contact-form'));

    // document.getElementById('contact-form').addEventListener('submit', function(event) {
    //     alert("ADDED SUBMIT: ", submit);
    //         event.preventDefault();
    //         // these IDs from the previous steps
    //         emailjs.sendForm('contact_service', 'contact_form', this)
    //             .then(() => {
    //                 alert("SEND!");
    //                 console.log('SUCCESS!');
    //             }, (error) => {
    //                 alert("FAILED!");
    //                 console.log('FAILED...', error);
    //             });
    //     });
}

const delay = ms => new Promise(res => setTimeout(res, ms));

function handleForm(event) { 
    event.preventDefault(); 
    const successMessage = document.getElementsByClassName("messageSuccess")[0];
    emailjs.sendForm('service_y7gw3np', "template_2sf7pzc", this)
    .then(async () => {
        successMessage.classList.add("visible");
        successMessage.classList.remove("hidden");
        console.log('SUCCESS!');
        event.target.reset();
        
        await delay(5000);
        successMessage.classList.add("hidden");
        successMessage.classList.remove("visible");
    }, (error) => {
        alert("Error sending proposal! " + error);
        console.log('FAILED...', error);
    });
} 
