(function() {
    let upload = document.querySelector("input[type='file']")
    let canvas = document.querySelector("#canvas-preview")

    let createImageSlice = (id) => {
        let newCanvas = canvas.parentElement.querySelector(id)
        if (newCanvas === null) {
            newCanvas = document.createElement("canvas")
            canvas.parentElement.appendChild(newCanvas)
        }
        newCanvas.id = id
        newCanvas.height = canvas.height
        newCanvas.width = canvas.width
        return newCanvas
    }

    let rgb2hex = (rgb) => {
        let [r, g, b] = rgb
        if (r > 255 || g > 255 || b > 255) {
            throw "Invalid colour!"
        }
        return ((r << 16) | (g << 8) | b).toString(16)
    }

    let image2matrix = (image) => {
        let rows = image.data.length
        let matrix = []
        for (let j = 0; j < rows; j += 4) {
            matrix.push(image.data.subarray(j, j+3))
        }
        return matrix
    }

    let sliceCanvasColour = (c, colour) => {
        let ctx = c.getContext("2d")
        let hex, x, y
        let matrix = image2matrix(canvas.getContext("2d").getImageData(0, 0, c.width, c.height))
        matrix.forEach((triplet, i) => {
            switch (colour) {
                case "red":
                    hex = "#" + ("000000" + ((redComponent) => {
                        return rgb2hex([redComponent, 0, 0])
                    })(triplet[0])).slice(-6)
                    break
                case "green":
                    hex = "#" + ("000000" + ((greenComponent) => {
                        return rgb2hex([0, greenComponent, 0])
                    })(triplet[1])).slice(-6)
                    break
                case "blue":
                    hex = "#" + ("000000" + ((blueComponent) => {
                        return rgb2hex([0, 0, blueComponent])
                    })(triplet[2])).slice(-6)
                    break
            }
            ctx.fillStyle = hex
            x = i % canvas.width
            y = Math.floor(i/canvas.width)
            ctx.fillRect(x, y, 1, 1)
        })
    }

    let sliceCanvas = (img) => {
        let red = createImageSlice("red")
        sliceCanvasColour(red, "red")
        let green = createImageSlice("green")
        sliceCanvasColour(green, "green")
        let blue = createImageSlice("blue")
        sliceCanvasColour(blue, "blue")
    }

    let previewImage = () => {
        let file = upload.files[0]
        let ctx = canvas.getContext("2d")
        let reader = new FileReader()

        reader.onloadend = () => {
            let img = new Image()
            img.onload = () => {
                canvas.width = img.width
                canvas.height = img.height
                ctx.drawImage(img, 0, 0)
                sliceCanvas(img)
            }
            img.src = reader.result
            return
        }

        reader.readAsDataURL(file)
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

    let extractPixel = (event) => {
        let canvas = event.target
        let pos = findPos(canvas)
        let x = event.pageX - pos.x
        let y = event.pageY - pos.y
        let coord = `x=${x}, y=${y}`
        let ctx = canvas.getContext("2d")
        let pixel = ctx.getImageData(x, y, 1, 1).data
        let hex = "#" + ("000000" + rgb2hex(pixel)).slice(-6)
        let paintArea = document.querySelector("#colour-value")
        paintArea.style.backgroundColor = hex
        console.log(pos, event, coord, hex, paintArea)
    }

    upload.addEventListener("change", previewImage)
    // canvas.addEventListener("mousemove", extractPixel)
})();
