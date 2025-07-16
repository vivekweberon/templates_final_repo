let template = Handlebars.compile(document.getElementById('__next').innerHTML);

// Function to get query parameters
function getQueryParams() {
var params = {};
try {
    var url = new URL(window.location.href);
    var search = url.search;
    search.substr(1).split('&').forEach(function(pair) {
    var keyValues = pair.split('=');
    params[keyValues[0]] = decodeURIComponent(keyValues[1]);
    });
} catch (e) {
    console.log(e);
}
return params;
}

// Function to update text before buyer names if buyer_names is present
const updateTextBeforeBuyerNames = (buyerNames) => {
return buyerNames.includes('and') ? "Buyers' Names are" : "Buyer's Name is";
};

let data = getQueryParams();

// Check if buyer_names exists in the query parameters
if (data.buyer_names) {
data.text_before_buyer_names = updateTextBeforeBuyerNames(data.buyer_names);
}

let content = template(data);
document.getElementById('__next').innerHTML = content;

const updateQRContent = (qrElement, qrCodeContent) => {
    if (qrElement == null || QRious == null || qrCodeContent == null) return false;
    qrElement.innerHTML = "";
    console.log('qrElement', qrElement);
    new QRious({
      element: qrElement,
      value: qrCodeContent,
      size: 166
    });
    return true;
  }

  const updateQRCodes = () => {
    const search = Object.fromEntries(new URLSearchParams(window.location.search).entries());
    const qrCodeContent = search.qrCodeContent;
    if (qrCodeContent == null) return;
    const qrCodeElements = document.querySelectorAll('[component-type="qrCodeContent"]');
    console.log('qrCodeElements.length', qrCodeElements.length);
    for (const qrElement of qrCodeElements) {
      const result = updateQRContent(qrElement, qrCodeContent);
      console.log('[QR Code Update]', {
        qrCodeContent,
        result
      });
    }
  }
  updateQRCodes();