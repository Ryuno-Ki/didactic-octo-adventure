(function() {
    let init = () => {
        console.log("Hi")
        return
    }
    init()
    
    let upload = document.querySelector("input[type='file']")

    let previewImage = () => {
        let file = upload.files[0]
        let preview = document.querySelector("#image-preview")
        let reader = new FileReader()

        console.log("Upload", upload, "File", file, "Preview", preview)

        reader.onloadend = () => {
            preview.src = reader.result
            return
        }

        if (preview) {
            reader.readAsDataURL(file)
        } else {
            preview.src = ""
        }
    }

    upload.addEventListener("change", previewImage)
})();
