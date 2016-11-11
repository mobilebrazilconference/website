jQuery(document).ready(function($) {
    var menu = $('.navbar');
    var origOffsetY = menu.offset().top;

    function scroll() {
        if ($(window).scrollTop() > 400) {
            $('.navbar').addClass('navbar-fixed-top');
            $('.navbar').removeClass('navbar-top');
            //$('.content').addClass('menu-padding');
        } else {
            $('.navbar').removeClass('navbar-fixed-top');
            //$('.content').removeClass('menu-padding');
            $('.navbar').addClass('navbar-top');
        }
    }

    document.onscroll = scroll;
    //tooltip  
    //jQuery for page scrolling feature - requires jQuery Easing plugin
    $('#localmap').click(function () {
        $('#localmap iframe').css("pointer-events", "auto");
    });

    $( "#localmap" ).mouseleave(function() {
      $('#localmap iframe').css("pointer-events", "none"); 
    });

    //MAGNIFIC POPUP LOAD CONTENT VIA AJAX
    $('.talk-detail').magnificPopup({type: 'ajax'});

    /* Scroll to Anchor */
    $('a[href^="#"]').on('click', function (e) {

        e.preventDefault();
        var target = this.hash;
        var t = $(this.hash).offset().top - $('.navbar').height();
        console.log(t);
        $('html, body').animate({
        scrollTop: t,
        }, 800, function () {
            window.location.hash = target;
        });
    });
   
});


google.maps.event.addDomListener(window, 'load', init);
var map;
function init() {
    var mapOptions = {
        center: new google.maps.LatLng(-23.573,-46.623),
        zoom: 16,
        zoomControl: true,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        },
        scaleControl: true,
        scrollwheel: false,
        panControl: false,
        streetViewControl: true,
        draggable : true,
        overviewMapControl: true,
        overviewMapControlOptions: {
            opened: false,
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    var mapElement = document.getElementById('localmap');
    var map = new google.maps.Map(mapElement, mapOptions);
    var locations = [['Mobile Brazil Conference 2016', 'Av. Lins de Vasconcelos, 1264<br />São Paulo / SP', 'undefined', 'undefined', 'undefined', -23.5745563, -46.623159517, 'https://mapbuildr.com/assets/img/markers/default.png']
    ];
    for (i = 0; i < locations.length; i++) {
        if (locations[i][1] =='undefined'){ description ='';} else { description = locations[i][1];}
        if (locations[i][2] =='undefined'){ telephone ='';} else { telephone = locations[i][2];}
        if (locations[i][3] =='undefined'){ email ='';} else { email = locations[i][3];}
       if (locations[i][4] =='undefined'){ web ='';} else { web = locations[i][4];}
       if (locations[i][7] =='undefined'){ markericon ='';} else { markericon = locations[i][7];}
        marker = new google.maps.Marker({
            icon: markericon,
            position: new google.maps.LatLng(locations[i][5], locations[i][6]),
            map: map,
            title: locations[i][0],
            desc: description,
            tel: telephone,
            email: email,
            web: web
        });
        link = '';            
        bindInfoWindow(marker, map, locations[i][0], description, telephone, email, web, link);
 }
    function bindInfoWindow(marker, map, title, desc, telephone, email, web, link) {
        var html= "<div style='text-align: center; color:#06346b;background-color:#fff;padding:5px;'><h4>"+title+"</h4><p>"+desc+"<p></div>";
        var infowindow = new google.maps.InfoWindow({
            content: html,
            maxWidth: 330
        });
        infowindow.open(map, marker);
    }
};