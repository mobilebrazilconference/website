/*
  Jquery Validation using jqBootstrapValidation
   example is taken from jqBootstrapValidation docs 
  */

$(function() {

  $(".formcontact").find("input,textarea,select").jqBootstrapValidation(
    {
      preventSubmit: true,
      submitError: function($form, event, errors) {
      // something to have when submit produces an error ?
      // Not decided if I need it yet
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      ga('send', {
        'hitType': 'event',          // Required.
        'eventCategory': 'button',   // Required.
        'eventAction': 'click',      // Required.
        'eventLabel': 'contact'
      });
      var name = $("input#name").val();  
      var email = $("input#email").val(); 
      var city = $("input#city").val(); 
      var phone = $("input#phone").val(); 
      selectedPlans = "";
      $('input[name="checkboxes"]:checked').each( function() {
        selectedPlans += $(this).val() + "\r\n";
      });
      if (selectedPlans != "") {
        plans = selectedPlans;
      } else {
        plans = "No item has been selected.";
      }
      var message = $("textarea#message").val();
      var firstName = name; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }        
      $.ajax({
        url: "contact.php",
        type: "POST",
        data: {name: name, email: email, message: message, city: city, phone: phone, plans: plans},
        cache: false,
        success: function() {  
          // Success message
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
          .append( "</button>");
          $('#success > .alert-success').append("<strong>Mensagem enviada. Aguarde que logo entraremos em contato.</strong>");
          $('#success > .alert-success').append('</div>');
 					//clear all fields
          $('.formcontact').trigger("reset");
 	      },
 	      error: function() {		
       		// Fail message
       		$('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
          .append( "</button>");
          $('#success > .alert-danger')
          .append("<strong>Desculpe "+firstName+". Ocorreu algum problema com este formulário...</strong> Poderia entrar em contato diretamente pelo e-mail <a href='mailto:contato@siworks.com.br?Subject=Siworks'>contato@siworks.com.br</a> ? Desculpe pela inconveniencia!");
       	  $('#success > .alert-danger').append('</div>');
          //clear all fields
          $('.formcontact').trigger("reset");
 	      },
      })
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });
  $(".formnews").find("input,textarea,select").jqBootstrapValidation(
      {
        preventSubmit: true,
        submitError: function($form, event, errors) {
        // something to have when submit produces an error ?
        // Not decided if I need it yet
      },
      submitSuccess: function($form, event) {
        event.preventDefault(); // prevent default submit behaviour
        // get values from FORM
        var email = $("input#emailnews").val();      
        $.ajax({
          url: "formnews.php",
          type: "POST",
          data: {email: email},
          cache: false,
          success: function() {  
            ga('send', {
              'hitType': 'event',          // Required.
              'eventCategory': 'button',   // Required.
              'eventAction': 'click',      // Required.
              'eventLabel': 'contactnews'
            });
            // Success message
            $('#success-news').html("<div class='alert alert-success'>");
            $('#success-news > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append( "</button>");
            $('#success-news > .alert-success').append("<strong>E-mail cadastrado</strong>");
            $('#success-news > .alert-success').append('</div>');
            //clear all fields
            $('#contactForm').trigger("reset");
          },
          error: function() {   
            // Fail message
            $('#success-news').html("<div class='alert alert-danger'>");
            $('#success-news > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append( "</button>");
            $('#success-news > .alert-danger')
            .append("<strong>Desculpe "+firstName+". Ocorreu algum problema com este formulário...</strong> Poderia entrar em contato diretamente pelo e-mail <a href='mailto:contato@siworks.com.br?Subject=Siworks'>contato@siworks.com.br</a> ? Desculpe pela inconveniencia!");
            $('#success-news > .alert-danger').append('</div>');
            //clear all fields
            $('.formcontact').trigger("reset");
          },
        })
      },
      filter: function() {
        return $(this).is(":visible");
      },
    });
  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});
/*When clicking on Full hide fail/success boxes */ 
$('#name').focus(function() {
     $('#success').html('');
  })