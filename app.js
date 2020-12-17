var qrcode = new QRCode('outputbox');

function makeCode() {
    var input = document.getElementById('data');

    qrcode.makeCode(input.value);
}

$('#data').on('blur', function () {
    makeCode();
}).on('keydown', function (e) {
    if (e.keyCode == 13) {
        makeCode();
    }
});

$('#btn2').click(function () {
    $('#main').animate({
        'left': '-100%'
    });
    $('#btn1').removeClass('active');
    $('#btn2').addClass('active');
});

$('#stopbtn').click(function () {
    $('#startbtn img').show();
    $('#stopbtn').hide();
    var videoEl = document.getElementById('preview');
    stream = videoEl.srcObject;
    tracks = stream.getTracks();
    tracks.forEach(function (track) {
        track.stop();
    });
    videoEl.srcObject = null;
});

$('#startbtn').click(function () {
    $('#startbtn img').hide();
    $('#stopbtn').show();
    var scanner = new Instascan.Scanner({
        video: document.getElementById('preview'),
        scanPeriod: 5,
        mirror: false
    });

    scanner.addListener('scan', function (content) {
        $('#msg2').text(content);
    });
    
    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            scanner.start(cameras[0]);
            $('[name="options"]').on('change', function () {
                if ($(this).val() == 1) {
                    if (cameras[0] != "") {
                        scanner.start(cameras[0]);
                    } else {
                        alert('No Front Camera Found');
                    }
                } else if ($(this).val() == 2) {
                    if (cameras[1] != "") {
                        scanner.start(cameras[1]);
                    } else {
                        alert('No Back Camera Found');
                    }
                }
            });
        } else {
            alert('No Camera Found');
        }
    }).catch(function (e) {
        alert(e);
    });
});
