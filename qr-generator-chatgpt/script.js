const initQRCode = () => {

    let data = "";
    const createQRBtn = document.getElementById("create-btn");

    // Create a new QRCode object
    const qrcode = new QRCode(document.getElementById("qrcode"), {
        text: data,
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
    });

    createQRBtn.addEventListener("click", function () {
        // Get the data
        data = document.getElementById("qr-code-data").value;
        // Display the QR code
        qrcode.makeCode(data);
    })
}

document.addEventListener("DOMContentLoaded", initQRCode)