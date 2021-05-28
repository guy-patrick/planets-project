const parse = require("csv-parse");
const fs = require("fs");

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

// Create the parser
const parser = parse({
  comment: "#",
  columns: true,
});

fs.createReadStream("kepler_data.csv")
  .pipe(parser)
  .on("data", (data) => {
    if (isHabitablePlanet(data)) {
      habitablePlanets.push(data);
    }
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("end", () => {
    console.log(habitablePlanets.map((planet) => planet["kepler_name"]));
    console.log(`${habitablePlanets.length} habitable planets found!`);
  });
