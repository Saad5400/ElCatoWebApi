let c = document.getElementById("binaryCanvas");

function initBackground() {
    var ctx = c.getContext("2d");

    let scaler = 2;

    c.height = window.innerHeight * scaler;
    c.width = window.innerWidth * scaler;

    var binary = "01";

    binary = binary.split("");

    let slowSpeed = 120 / scaler;
    let speed = 0;

    var font_size = 20;
    var columns = c.width / font_size;
    var drops = [];
    for (var x = 0; x < columns; x++) { 
        drops[x] = c.height / font_size;
    }
    // draw falling chars from top to bottm
    function draw() {
        ctx.fillStyle = "rgba(0,0,0,0.05)";
        ctx.fillRect(0, 0, c.width, c.height);

        // font color
        ctx.fillStyle = "#770786";

        ctx.font = font_size + "px arial";
        for (var i = 0; i < drops.length; i++) {

            var text = binary[Math.floor(Math.random() * binary.length)];

            ctx.fillText(text, i * font_size, drops[i] * font_size);

            if (drops[i] * font_size > c.height && Math.random() > 0.975) {

              speed = slowSpeed;

              drops[i] = 0;

            }
            
            drops[i]++;

        }
        setTimeout(draw, speed);
    }

    // draw rising chars from bottom to top
    function draw2() {
        ctx.fillStyle = "rgba(0,0,0,0.05)";
        ctx.fillRect(0, 0, c.width, c.height);
        // font color
        ctx.fillStyle = "#770786";

        ctx.font = font_size + "px arial";
        for (var i = 0; i < drops.length; i++) {
                
            var text = binary[Math.floor(Math.random() * binary.length)];

            ctx.fillText(text, i * font_size, drops[i] * font_size);

            if (drops[i] * font_size < 0 && Math.random() > 0.975) {

            speed = slowSpeed;

            drops[i] = c.height / font_size;

            }
            
            drops[i]--;
        }
        setTimeout(draw2, speed);
    }

    setTimeout(draw2, speed);
}

function toggleBinaryBackground() {
    if (c.hidden) {
        c.hidden = false;
    } else {
        c.hidden = true;
    }
}