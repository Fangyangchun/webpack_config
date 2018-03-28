"use strict";

require('./index.css');

    document.write('<h1>Hello bundle1</h1>');

    var img = document.createElement('img');
    img.src = require('./imgtest.jpg');
    document.body.appendChild(img);

    console.log('this is an error');
    console.log($(document));