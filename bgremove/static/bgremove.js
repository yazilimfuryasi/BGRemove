// temiz, ilk
// function handleFileSelect(event) {
//     if (window.File && window.FileList && window.FileReader) {
//         var files = event.target.files;
//         var output = document.getElementById("result");

//         if (!!files) {
//             if (typeof (output) != 'undefined' && output != null) {
//                 output.classList.remove('quote-imgs-thumbs--hidden');
//             }
//         }

//         if (typeof (output) != 'undefined' && output != null) {
//             for (var i = 0; i < files.length; i++) {
//                 var img = document.createElement('img');
//                 img.src = URL.createObjectURL(event.target.files[i]);
//                 img.classList.add('img-preview-thumb');
//                 // img.classList.add('remove');
//                 output.appendChild(img)
//             }
//         }
//     }
// }

function fileUpload(event) {
    if (window.File && window.FileList && window.FileReader) {
        var files = event.target.files;
        var csrf_token = document.getElementsByName("csrfmiddlewaretoken")[0].value;
        var output = document.getElementById("result");
        var image = event.target.files[0];
        var xhr = new XMLHttpRequest();
        var check = image.name.split(".")[image.name.split(".").length -1];
        var id = undefined;

        if (check == "jpg" || check == "png" || check == "jpeg") {
            if (!!files) {
                if (typeof (output) != 'undefined' && output != null) {
                    output.classList.remove('quote-imgs-thumbs--hidden');
                }
            }
            console.log(image);
            const img1 = document.getElementsByTagName("img");
            if (img1 && img1.length > 0 && typeof(image) != 'undefined')
                img1[0].remove();

            if (typeof (output) != 'undefined' && output != null && typeof(image) != 'undefined') {
                var img = document.createElement('img');

                var formData = new FormData();
                formData.append("image", image);

                xhr.open("POST", "/upload/");
                xhr.setRequestHeader("X-CSRFToken", csrf_token);
                xhr.onload = function() {
                    if (xhr.status === 204) {
                        console.log("Successfully uploaded image");
                    } else {
                        console.log("Error uploading image");
                    }
                    id = JSON.parse(xhr.response)["id"];
                    img.src = URL.createObjectURL(event.target.files[0]);
                    img.classList.add('img-preview-thumb');
                    img.setAttribute("id", id);
                    output.appendChild(img);
                };
                xhr.send(formData);
            }
        }
        else {
            alert("Desteklenmeyen Dosya Türü");
        }
    }
}

document.getElementById('files').addEventListener('change', fileUpload, false);



function removeBG() {
    // let id = document.getElementsByClassName("img-preview-thumb");
    let id = document.querySelector(".img-preview-thumb")
    console.log(id.id);
    let imgName;
    var csrf_token = document.getElementsByName("csrfmiddlewaretoken")[0].value;
    var xhr = new XMLHttpRequest();
    var img = document.createElement('img');
    var output = document.getElementById("result");
    img.classList.add('img-preview-thumb2');
    img.src = "http://127.0.0.1:8000/static/img/mona.gif";
    output.appendChild(img);
    console.log(img);
    var formData = new FormData();
    formData.append("id", id.id);

    xhr.open("POST", "/remove/");
    xhr.setRequestHeader("X-CSRFToken", csrf_token);
    xhr.onload = function() {
        imgName = JSON.parse(xhr.response)["name"];
        img.src = imgName;
        console.log(imgName);
    };
    xhr.send(formData);
}

document.getElementById('sil').addEventListener('click', removeBG);
