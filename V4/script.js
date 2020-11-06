function handlePhoto(event) {
    const imageUpload = URL.createObjectURL(event.target.files[0]);
    imageInput = document.getElementById("hide-photo");
    imageInput.src = imageUpload;
}

function subForm() {
    console.log("Generating image");
    if (!generateInit()) {
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

let fbBlank, twBlank, icoBlank, myForm, imageInput, fbCanvas,twCanvas, icoCanvas, fbCtx, twCtx, icoCtx;

function generateFBImage(firstName, lastName, message, jobTitle, img) {
    fbCanvas.height = fbBlank.height;
    fbCanvas.width = fbBlank.width;
    fbCtx.clearRect(0, 0, fbCanvas.width, fbCanvas.height);
    fbCtx.drawImage(fbBlank, 0, 0);

    let nameFontSize = "32";
    fbCtx.fillStyle = "black";
    fbCtx.lineWidth = 500;
    fbCtx.textAlign = "right";
    fbCtx.textBaseline = 'top';

    // Makes title with first name.
    const titleDefault = " Endorses Mokah Johnson for HD 117";
    wrapText(firstName + titleDefault, 520, 36, 500, nameFontSize, "Hanley Sans", fbCtx);

    let messageFontSize = "40";
    if (message.length > 46) {
        messageFontSize = (263 * (message.length ** (-0.469))).toString();
    }
    fbCtx.textAlign = "center";
    wrapText('"' + message + '"' , 385, 135, 290, messageFontSize, "Hanley Sans", fbCtx);

    fbCtx.textAlign = "left";
    fbCtx.font = "15px Hanley Sans"
    fbCtx.fillText(firstName + " " + lastName, 230, 455, 300);

    fbCtx.font = "12px Hanley Sans"
    fbCtx.fillText(jobTitle, 230, 482, 300);

    if (img !== undefined) {
        fbCtx.drawImage(img,28,162,195, 195);
    }
}

function generateTWImage(firstName, lastName, message, jobTitle, img) {
    twCanvas.height = twBlank.height;
    twCanvas.width = twBlank.width;
    twCtx.clearRect(0, 0, twCanvas.width, twCanvas.height);
    twCtx.drawImage(twBlank, 0, 0);

    let nameFontSize = "28";
    twCtx.fillStyle = "black";
    twCtx.lineWidth = 500;
    twCtx.textAlign = "right";
    twCtx.textBaseline = 'top';

    // Makes title with first name.
    const titleDefault = " Endorses Mokah Johnson for HD 117";
    wrapText(firstName + titleDefault, 870, 36, 1000, nameFontSize, "Hanley Sans", twCtx);

    let messageFontSize = "40";
    if (message.length > 46) {
        messageFontSize = (263 * (message.length ** (-0.469)) + 2).toString();
    }
    twCtx.textAlign = "center";
    wrapText('"' + message + '"' , 585, 115, 500, messageFontSize, "Hanley Sans", twCtx);

    twCtx.textAlign = "left";
    twCtx.font = "20px Hanley Sans"
    twCtx.fillText(firstName + " " + lastName, 320, 355, 700);

    twCtx.font = "15px Hanley Sans"
    twCtx.fillText(jobTitle, 320, 390, 300);

    if (img !== undefined) {
        twCtx.drawImage(img, 48, 95, 220, 220);
    }
}

function generateSocialIcon(img) {
    icoCanvas.height = icoBlank.height;
    icoCanvas.width = icoBlank.width;
    icoCtx.clearRect(0, 0, icoCanvas.width, icoCanvas.height);
    icoCtx.drawImage(icoBlank, 0, 0);

    if (img !== undefined) {
        icoCtx.drawImage(img, 0, 0, icoCanvas.width, icoCanvas.height);
        const banner = document.getElementById("social-icon-banner");
        icoCtx.drawImage(banner, 0, 640, icoCanvas.width, 320);

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
    generateTWImage(myForm.get("first-name"), myForm.get("last-name"), myForm.get("message"), myForm.get("job-title"), imageInput);
    generateSocialIcon(imageInput);
    downloadsInit();

    return true;

}

function downloadsInit() {
    const fbDownload = document.getElementById("fbDownload");
    const fbBtn = document.getElementById("fb-btn");
    fbBtn.style.display = "block";
    fbDownload.href = fbCanvas.toDataURL("image/png");

    const twDownload = document.getElementById("twDownload");
    const twBtn = document.getElementById("tw-btn");
    twBtn.style.display = "block";
    twDownload.href = twCanvas.toDataURL("image/png");

    const icoDownload = document.getElementById("icoDownload");
    const icoBtn = document.getElementById("ico-btn");
    icoBtn.style.display = "block";
    icoDownload.href = icoCanvas.toDataURL("image/png");
}

function wrapText(text, x, y, maxWidth, fontSize, fontFace, ctx){
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
    //Facebook Image
    fbCanvas = document.getElementById("fbCanvas");
    fbCtx = fbCanvas.getContext('2d');
    fbBlank = document.getElementById("facebook-social-blank");
    fbCanvas.height = fbBlank.height;
    fbCanvas.width = fbBlank.width;

    const fbExample = document.getElementById("facebook-social-example");
    fbCtx.clearRect(0,0,fbCanvas.width, fbCanvas.height);
    fbCtx.drawImage(fbExample, 0, 0);

    //Twitter Image
    twCanvas = document.getElementById("twCanvas");
    twCtx = twCanvas.getContext('2d');
    twBlank = document.getElementById("twitter-social-blank");
    twCanvas.height = twBlank.height;
    twCanvas.width = twBlank.width;

    const twExample = document.getElementById("twitter-social-example");
    twCtx.clearRect(0,0,twCanvas.width, twCanvas.height);
    twCtx.drawImage(twExample, 0, 0, twCanvas.width, twCanvas.height);

    //Social Icon
    icoCanvas = document.getElementById("icoCanvas");
    icoCtx = icoCanvas.getContext('2d');
    icoBlank = document.getElementById("social-icon-blank");
    icoCanvas.width = icoCanvas.height = icoBlank.width;

    const icoExample = document.getElementById("social-icon-example");
    icoCtx.clearRect(0,0,icoCanvas.width, icoCanvas.height);
    icoCtx.drawImage(icoExample, 0, 0, icoCanvas.width, icoCanvas.height);


});




