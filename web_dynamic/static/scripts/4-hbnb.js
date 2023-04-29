$(document).ready(function () {
  const nameAmenity = {};
  $('input:checkbox').click(function () {
    if ($(this).is(":checked")) {
      nameAmenity[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete nameAmenity[$(this).attr('data-id')];
    }
    $('.amenities h4').text(Object.values(nameAmenity).join(', '));
  });

  $.get("http://localhost:5001/api/v1/status/", data => {
    if (data.status == "OK") {
      $('DIV#api_status').addClass("available");
    } else {
      $('DIV#api_status').removeClass("available");
    }
  });

  const search = (filters = {}) => {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:5001/api/v1/places_search',
      data: JSON.stringify(filters),
      //dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        $('SECTION.places').empty();
        $('SECTION.places').append(data.map(place => {
          return `<article>
                    <div class="title_box">
                      <h2>${place.name}</h2>
                      <div class="price_by_night">${place.price_by_night}</div>
                    </div>
                    <div class="information">
                      <div class="max_guest">${place.max_guest} Guests</div>
                      <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                      <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                    </div>
                    <div class="description">
                      ${place.description}
                    </div>
                  </article>`
        }));
      }
    });
  };

  $('#search').click(function () {
    const filters = {amenities: Object.keys(nameAmenity)};
    search(filters);
  });

  search();
});
