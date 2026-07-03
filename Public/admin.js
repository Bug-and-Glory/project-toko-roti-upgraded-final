document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.querySelector(".sidebar");
    const toggleBtn = document.querySelector(".sidebar-toggle");

    let overlay = document.createElement("div");
    overlay.classList.add("sidebar-overlay");

    document.body.appendChild(overlay);

    if (toggleBtn) {

        toggleBtn.addEventListener("click", () => {

            sidebar.classList.toggle("show");
            overlay.classList.toggle("show");

        });

    }

    overlay.addEventListener("click", () => {

        sidebar.classList.remove("show");
        overlay.classList.remove("show");

    });

});

const imageInput = document.querySelector('input[type="file"]');

if (imageInput) {

    imageInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            let preview = document.getElementById("previewImage");

            if (preview) {

                preview.src = e.target.result;

            }

        };

        reader.readAsDataURL(file);

    });

}