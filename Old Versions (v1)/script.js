function handlePhoto(event) {
    var imageUpload = URL.createObjectURL(event.target.files[0]);
    var hideUpload = document.getElementById("hide-photo");
    hideUpload.src = imageUpload;
}

function handleSubmit() {
    var image = document.getElementById("hide-photo");
    var c = document.getElementById("your-endorsement");
    var ctx = c.getContext("2d");
    var resizeHeight = image.height * .25;
    var resizeWidth = image.width * .25;
    ctx.drawImage(image, 10, 10, resizeHeight, resizeWidth);
}

function subForm() {
    $.ajax({
        url:'https://api.apispreadsheets.com/data/2459/',
        type:'post',
        data:$("#info").serializeArray(),
        success: function() {
            alert("Thank you for submitting the form!")
        },
        error: function() {
            alert("Error: One of the fields that you have entered are incorrect.")
        }
    });
}

window.onload = function (event) {
    alert("Onload is working!");
}


