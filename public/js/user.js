let photoInput = document.querySelector('#photo')

let formdata = new FormData()

photoInput.addEventListener('change', async event => {
    formdata.append('photo', event.target.files[0])

    try {
        let response = await fetch('/user/photo', {
            method: "POST",
            body: formdata
        })
        response = await response.json()
        window.location.reload()
    } catch (e) {
        console.log(e);
    }

})