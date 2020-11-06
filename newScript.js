src = "https://code.jquery.com/jquery-3.5.1.js"
integrity = "sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc="
crossorigin = "anonymous"

function subForm() {
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