(function() {
    let upload = document.querySelector("input[type='file']")
    let canvas = document.querySelector("#canvas-preview")

    let previewImage = () => {
        let file = upload.files[0]
        let preview = document.querySelector("#image-preview")
        let ctx = canvas.getContext("2d")
        let reader = new FileReader()

        console.log("Upload", upload, "File", file, "Preview", preview)

        reader.onloadend = () => {
            let img = new Image()
            img.onload = () => {
                canvas.width = img.width
                canvas.height = img.height
                ctx.drawImage(img, 0, 0)
            }
            img.src = reader.result
            preview.src = reader.result
            return
        }

        if (preview) {
            reader.readAsDataURL(file)
        } else {
            preview.src = ""
        }
    }

    // Taken from https://stackoverflow.com/a/6736135
    let findPos = (element) => {
        let currentLeft = 0
        let currentTop = 0
        if (element.offsetParent) {
            do {
                currentLeft += element.offsetLeft
                currentTop += element.offsetTop
            } while (element = element.parentOffset)
            return {
                x: currentLeft,
                y: currentTop
            }
        }
        return undefined
    }

    let rgb2hex = (rgb) => {
        let [r, g, b] = rgb
        if (r > 255 || g > 255 || b > 255) {
            throw "Invalid colour!"
        }
        return ((r << 16) | (g << 8) | b).toString(16)
    }

    let extractPixel = (event) => {
        let canvas = event.target
        let pos = findPos(canvas)
        let x = event.pageX - pos.x
        let y = event.pageY - pos.y
        let coord = `x=${x}, y=${y}`
        let ctx = canvas.getContext("2d")
        let pixel = ctx.getImageData(x, y, 1, 1).data
        let hex = "#" + ("000000" + rgb2hex(pixel)).slice(-6)
        console.log(pos, event, coord, hex)
    }

    upload.addEventListener("change", previewImage)
    canvas.addEventListener("mousemove", extractPixel)
})();
