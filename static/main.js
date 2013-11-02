var _csrf = $('meta[name="_csrf"]').attr('content');

$('.login').on('click', function(e) {
  e.preventDefault();
  navigator.id.request();
});

$('.logout').on('click', function(e) {
  e.preventDefault();
  navigator.id.logout();
});

navigator.id.watch({
  loggedInUser: $('meta[name="email"]').attr('content'),
  onlogin: function(assertion) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/persona/verify", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-CSRF-Token", _csrf);
    xhr.addEventListener("loadend", function(e) {
      var data = JSON.parse(this.responseText);
      if (data && data.status === "okay") {
        $('.logout').removeClass('hidden');
        $('.login').addClass('hidden');
        $('.email').val(data.email).text(data.email);
        console.log("You have been logged in as: " + data.email);
      }
    }, false);

    xhr.send(JSON.stringify({
      assertion: assertion
    }));
  },
  onlogout: function() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/persona/logout", true);
    xhr.setRequestHeader("X-CSRF-Token", _csrf);
    xhr.addEventListener("loadend", function(e) {
      $('.logout').addClass('hidden');
      $('.login').removeClass('hidden');
      $('.email').val('').text('');
      console.log("You have been logged out");
    });
    xhr.send();
  }
});

$('[data-text]').on('click', function() {
  var top = this.offsetTop;
  var paragraphId = +this.getAttribute('data-paragraph-id');

  $('.add-annotation').css({
    'display': 'block',
    'top': top + 'px'
  });
  $('.add-annotation input[name="paragraph_id"]').val(paragraphId);
  $('[data-text].active').removeClass('active');
  $(this).addClass('active');
});
