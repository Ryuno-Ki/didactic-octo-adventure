"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

(function () {
    var upload = document.querySelector("input[type='file']");
    var canvas = document.querySelector("#canvas-preview");

    var previewImage = function previewImage() {
        var file = upload.files[0];
        var preview = document.querySelector("#image-preview");
        var ctx = canvas.getContext("2d");
        var reader = new FileReader();

        console.log("Upload", upload, "File", file, "Preview", preview);

        reader.onloadend = function () {
            var img = new Image();
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
            };
            img.src = reader.result;
            preview.src = reader.result;
            return;
        };

        if (preview) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }
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

    var extractPixel = function extractPixel(event) {
        var canvas = event.target;
        var pos = findPos(canvas);
        var x = event.pageX - pos.x;
        var y = event.pageY - pos.y;
        var coord = "x=" + x + ", y=" + y;
        var ctx = canvas.getContext("2d");
        var pixel = ctx.getImageData(x, y, 1, 1).data;
        var hex = "#" + ("000000" + rgb2hex(pixel)).slice(-6);
        console.log(pos, event, coord, hex);
    };

    upload.addEventListener("change", previewImage);
    canvas.addEventListener("mousemove", extractPixel);
})();
//# sourceMappingURL=app.js.map
