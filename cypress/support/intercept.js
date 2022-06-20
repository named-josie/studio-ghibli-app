export default function () {
  return cy
    .intercept("GET", "https://ghibliapi.herokuapp.com/**", (req) => {
      if (req.url.includes("locations")) {
        return req.reply({
          statusCode: 200,
          fixture: "locations.json",
        });
      }
      if (req.url.includes("films")) {
        return req.reply({
          statusCode: 200,
          fixture: "films.json",
        });
      }
      if (req.url.includes("people")) {
        return req.reply({
          statusCode: 200,
          fixture: "people.json",
        });
      }
    })
    .as("request");
}
