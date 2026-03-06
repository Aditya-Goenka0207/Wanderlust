document.addEventListener("DOMContentLoaded", () => {
  const listing = JSON.parse(document.getElementById("listing-data").textContent);

  // Use the token passed from EJS
  mapboxgl.accessToken = mapToken;

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: listing.geometry ? listing.geometry.coordinates : [78.9629, 20.5937],
    zoom: 9,
  });

  if (listing.geometry) {
    new mapboxgl.Marker({ color: "red" })
      .setLngLat(listing.geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h5>${listing.title}</h5><p>Exact location will be provided after booking</p>`
        )
      )
      .addTo(map);
  }
});