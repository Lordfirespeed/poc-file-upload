const avatar_endpoint = new URL("/api/avatar", document.location.origin);

let form;

async function on_form_submit(event) {
    event.preventDefault();

    const data = new FormData(form);
    data.append("another_field", "abc123");
    try {
        const response = await fetch(avatar_endpoint, {
            method: "POST",
            body: data
        });

        if (!response.ok) {
            alert("Response was not status 2xx...");
            console.log(response);
        }
    } catch (error) {
        alert("Unable to make request. Server may be unavailable.");
        console.log(error);
    }
}

// eslint-disable-next-line no-unused-vars
function on_DOM_loaded(event) {
    form = document.getElementById("avatar-form");

    form.addEventListener("submit", on_form_submit);
}

addEventListener("DOMContentLoaded", on_DOM_loaded);