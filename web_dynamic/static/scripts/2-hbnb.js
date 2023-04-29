$(document).ready(function () {
  const nameAmenity = [];
  $('input:checkbox').click(function () {
    if ($(this).is(":checked")) {
      nameAmenity.push($(this).attr('data-name'));
    } else {
      const nameIndex = nameAmenity.indexOf($(this).attr('data-name'));
      nameAmenity.splice(nameIndex, 1);
    }
    $('.amenities h4').text(nameAmenity.join(', '));
  });
  $.get("http://0.0.0.0:5001/api/v1/status/", data => {
    if (data.status == "OK") {
      $('DIV#api_status').addClass("available");
    } else {
      $('DIV#api_status').removeClass("available");
    }
  });
});
