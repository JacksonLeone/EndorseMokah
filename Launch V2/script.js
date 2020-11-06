function handlePhoto(event) {
    const imageUpload = URL.createObjectURL(event.target.files[0]);
    imageInput = document.getElementById("hide-photo");
    imageInput.src = imageUpload;
}

function subForm() {
    console.log("Generating image");
    if (!generateInit()) {
        console.log("Conditions not met. Ending generation.");
        return;
    }
    $.ajax({
        url:'https://api.apispreadsheets.com/data/2459/',
        type:'post',
        data:$("#myForm").serializeArray(),
        success: function() {
            alert("Thank you for submitting the form!")
        },
        error: function() {
            alert("Error: One of the fields that you have entered are incorrect.")
        }
    });
}

let fbBlank, myForm, imageInput, canvas, ctx;

function generateFBImage(firstName, lastName, message, jobTitle, img) {
    canvas.height = fbBlank.height;
    canvas.width = fbBlank.width;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(fbBlank, 0, 0);

    let nameFontSize = "32";
    ctx.fillStyle = "black";
    ctx.lineWidth = 500;
    ctx.textAlign = "right";
    ctx.textBaseline = 'top';

    // Makes title with first name.
    const titleDefault = " Endorses Mokah Johnson for HD 117";
    wrapText(firstName + titleDefault, 520, 36, 500, nameFontSize, "Hanley Sans");

    let messageFontSize = "40";
    if (message.length > 46) {
        messageFontSize = (263 * (message.length ** (-0.469))).toString();
    }
    console.log("Chars: " + message.length + ", Font Size: " + messageFontSize);
    ctx.textAlign = "center";
    wrapText('"' + message + '"' , 385, 135, 290, messageFontSize, "Hanley Sans");

    ctx.textAlign = "left";
    ctx.font = "15px Hanley Sans"
    ctx.fillText(firstName + " " + lastName, 230, 455, 300);

    ctx.font = "12px Hanley Sans"
    ctx.fillText(jobTitle, 230, 482, 300);

    if (img !== "") {
        ctx.drawImage(img,28,142,195, 240);
    }
}

function generateCheck() {
    if (myForm.get("first-name") === "") {
        alert("First name not inputted.")
        return false;
    }
    if (myForm.get("last-name") === "") {
        alert("Last name not inputted.")
        return false;
    }
    if (myForm.get("email") === "") {
        alert("Email not inputted.")
        return false;
    }
    if (myForm.get("first-name") === "") {
        alert("First name not inputted.")
        return false;
    }
    if (myForm.get("age") === null) {
        alert("Age not inputted.")
        return false;
    }
    if (myForm.get("job-title") === "") {
        alert("Job Title not inputted.")
        return false;
    }
    if (myForm.get("organization") === "Choose an organization (select one)") {
        alert("Organization not inputted.")
        return false;
    }
    if (myForm.get("message") === "") {
        alert("Endorsement message not inputted.")
        return false;
    }
    if (myForm.get("message").length < 30) {
        alert("Endorsement message must exceed 30 characters.")
        return false;
    }
    console.log(imageInput);
    if (imageInput === undefined) {
        alert("Image not inputted.")
        return false;
    }
    return true;
}

function generateInit() {
    myForm = new FormData(document.getElementById("myForm"));
    if (!generateCheck()) {
        return false;
    }

    generateFBImage(myForm.get("first-name"), myForm.get("last-name"), myForm.get("message"), myForm.get("job-title"), imageInput);
    downloadsInit();

    return true;

}

function downloadsInit() {
    const fbDownload = document.getElementById("download");
    const fbdlbtn = document.getElementById("dl-btn");
    fbdlbtn.style.display = "block";
    fbDownload.href = canvas.toDataURL("image/png");
}

function wrapText(text, x, y, maxWidth, fontSize, fontFace){
    var words = text.split(' ');
    var line = '';
    var lineHeight=fontSize*1.286; // a good approx for 10-18px sizes

    ctx.font=fontSize+"px "+fontFace;
    ctx.textBaseline='top';

    for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;
        if(testWidth > maxWidth) {
            ctx.fillText(line, x, y);
            if(n<words.length-1){
                line = words[n] + ' ';
                y += lineHeight;
            }
        }
        else {
            line = testLine;
        }
    }
    ctx.fillText(line, x, y);
}

window.addEventListener("load", function () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    fbBlank = document.getElementById("facebook-social-blank");
    canvas.height = fbBlank.height;
    canvas.width = fbBlank.width;

    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(fbBlank, 0, 0);
    const defaultMSG = "Explain why you support Mokah Johnson for House District 117. " +
        "What policies or positions resonate with you (i.e. healthcare, women's rights, campaign finance reform, etc.)? " +
        "Make your points compelling so other voters want to support Mokah as well!"
    generateFBImage("[insert name]", "[insert last name]", defaultMSG, "[insert job title]", "");
});




