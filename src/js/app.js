"use strict";

(function () {
    var init = function init() {
        console.log("Hi");
        return;
    };
    init();

    var upload = document.querySelector("input[type='file']");

    var previewImage = function previewImage() {
        var file = upload.files[0];
        var preview = document.querySelector("#image-preview");
        var reader = new FileReader();

        console.log("Upload", upload, "File", file, "Preview", preview);

        reader.onloadend = function () {
            preview.src = reader.result;
            return;
        };

        if (preview) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }
    };

    upload.addEventListener("change", previewImage);
})();
//# sourceMappingURL=app.js.map
