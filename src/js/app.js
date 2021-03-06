"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

(function () {
    var upload = document.querySelector("input[type='file']");
    var canvas = document.querySelector("#canvas-preview");

    var createImageSlice = function createImageSlice(id) {
        var newCanvas = canvas.parentElement.querySelector(id);
        if (newCanvas === null) {
            newCanvas = document.createElement("canvas");
            canvas.parentElement.appendChild(newCanvas);
        }
        newCanvas.id = id;
        newCanvas.height = canvas.height;
        newCanvas.width = canvas.width;
        return newCanvas;
    };

    var rgb2hex = function rgb2hex(rgb) {
        var _rgb = _slicedToArray(rgb, 3);

        var r = _rgb[0];
        var g = _rgb[1];
        var b = _rgb[2];

        if (r > 255 || g > 255 || b > 255) {
            throw "Invalid colour!";
        }
        return (r << 16 | g << 8 | b).toString(16);
    };

    var image2matrix = function image2matrix(image) {
        var rows = image.data.length;
        var matrix = [];
        for (var j = 0; j < rows; j += 4) {
            matrix.push(image.data.subarray(j, j + 3));
        }
        return matrix;
    };

    var sliceCanvasColour = function sliceCanvasColour(c, colour) {
        var ctx = c.getContext("2d");
        var hex = undefined,
            x = undefined,
            y = undefined;
        var matrix = image2matrix(canvas.getContext("2d").getImageData(0, 0, c.width, c.height));
        matrix.forEach(function (triplet, i) {
            switch (colour) {
                case "red":
                    hex = "#" + ("000000" + (function (redComponent) {
                        return rgb2hex([redComponent, 0, 0]);
                    })(triplet[0])).slice(-6);
                    break;
                case "green":
                    hex = "#" + ("000000" + (function (greenComponent) {
                        return rgb2hex([0, greenComponent, 0]);
                    })(triplet[1])).slice(-6);
                    break;
                case "blue":
                    hex = "#" + ("000000" + (function (blueComponent) {
                        return rgb2hex([0, 0, blueComponent]);
                    })(triplet[2])).slice(-6);
                    break;
            }
            ctx.fillStyle = hex;
            x = i % canvas.width;
            y = Math.floor(i / canvas.width);
            ctx.fillRect(x, y, 1, 1);
        });
    };

    var sliceCanvas = function sliceCanvas(img) {
        var red = createImageSlice("red");
        sliceCanvasColour(red, "red");
        var green = createImageSlice("green");
        sliceCanvasColour(green, "green");
        var blue = createImageSlice("blue");
        sliceCanvasColour(blue, "blue");
    };

    var previewImage = function previewImage() {
        var file = upload.files[0];
        var ctx = canvas.getContext("2d");
        var reader = new FileReader();

        reader.onloadend = function () {
            var img = new Image();
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                sliceCanvas(img);
            };
            img.src = reader.result;
            return;
        };

        reader.readAsDataURL(file);
    };

    // Taken from https://stackoverflow.com/a/6736135
    var findPos = function findPos(element) {
        var currentLeft = 0;
        var currentTop = 0;
        if (element.offsetParent) {
            do {
                currentLeft += element.offsetLeft;
                currentTop += element.offsetTop;
            } while (element = element.parentOffset);
            return {
                x: currentLeft,
                y: currentTop
            };
        }
        return undefined;
    };

    var extractPixel = function extractPixel(event) {
        var canvas = event.target;
        var pos = findPos(canvas);
        var x = event.pageX - pos.x;
        var y = event.pageY - pos.y;
        var coord = "x=" + x + ", y=" + y;
        var ctx = canvas.getContext("2d");
        var pixel = ctx.getImageData(x, y, 1, 1).data;
        var hex = "#" + ("000000" + rgb2hex(pixel)).slice(-6);
        var paintArea = document.querySelector("#colour-value");
        paintArea.style.backgroundColor = hex;
        console.log(pos, event, coord, hex, paintArea);
    };

    upload.addEventListener("change", previewImage);
    // canvas.addEventListener("mousemove", extractPixel)
})();
//# sourceMappingURL=app.js.map
