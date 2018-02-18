var http = require('http');
var request = require('request');

var options = {
    url: 'https://api.playground.klarna.com/checkout/v3/orders',
    method: 'POST',
    headers: {
        'Authorization': 'Basic ' + new Buffer('K500956:ieNg9shai:ti9rei').toString('base64'),
        'Content-Type': 'application/json',
    },
    form: {
        "purchase_country": "se",
        "purchase_currency": "sek",
        "locale": "en-GB",
        "billing_address": {
          "given_name": "Testperson-se",
          "family_name": "Approved",
          "email": "youremail@email.com",
          "street_address": "Stårgatan 1",
          "postal_code": "12345",
          "city": "Ankeborg",
          "phone": "+46765260000",
          "country": "se"
        },
        "order_amount": 503341,
        "order_tax_amount": 100668,
        "order_lines": [
          {
            "type": "physical",
            "reference": "19-402-SWE",
            "name": "Camera Travel Set",
            "quantity": 1,
            "quantity_unit": "pcs",
            "unit_price": 603341,
            "tax_rate": 2500,
            "total_amount": 503341,
            "total_discount_amount": 100000,
            "total_tax_amount": 100668,
            "image_url": "http://merchant.com/logo.png"
          }
        ],
        "merchant_urls": {
          "terms": "http://merchant.com/tac.php",
          "checkout": "http://merchant.com/checkout.php?sid={checkout.order.id}",
          "confirmation": "http://merchant.com/thankyou.php?sid={checkout.order.id}",
          "push": "http://localhost/kco/push.php?checkout_uri={checkout.order.id}"
        },
        "shipping_options": [
          {
            "id": "free_shipping",
            "name": "Free Shipping",
            "description": "Delivers in 5-7 days",
            "price": 0,
            "tax_amount": 0,
            "tax_rate": 0,
            "preselected": true,
            "shipping_method": "Home"
          },
          {
            "id": "pick_up_store",
            "name": "Pick up at closest store",
            "price": 399,
            "tax_amount": 0,
            "tax_rate": 0,
            "preselected": false,
            "shipping_method": "PickUpStore"
          }
        ]
       }
}
var test = '';
function getIframe() {
    request(options, function (error, response, body) {
        test = body;
    });
}
getIframe();
http.createServer(function (request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin' : '*'
    });
    response.write( test );
    response.end();
}).listen(8080);