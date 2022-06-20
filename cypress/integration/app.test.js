const baseURL = 'http://localhost:3000'
import intercept from "../support/intercept";
import films from "../fixtures/films.json"
import locations from '../fixtures/locations.json'


describe("Has a Home Page", () => {
  it("can visit the home page", () => {
    cy.visit(baseURL);
    cy.contains('Welcome to Ghibli')
  });
})


describe("Uses React Router DOM navigation", () => {
  it("can visit the home page", () => {
    cy.visit(baseURL);
  });

  it("has a welcome message", () => {
    cy.get("body").should("contain.text", "Welcome to GhibliApp");
  });

  it("can visit the movies page", () => {
    cy.visit(`${baseURL}/movies`);
  });


  it("can visit the people page", () => {
    cy.visit(`${baseURL}/people`);
  });

  it("can visit the people page", () => {
    cy.visit(`${baseURL}/locations`);
  });

  it("has a navigation that makes use of the `nav` element", () => {
    cy.hasNavBar();
  });

  it("has a link in the nav bar that navigates to the home page", ()=> {
    cy.get('nav a').eq(0).click()
    cy.url().should('eq', `${baseURL}/`)
  })

  it("has a link in the nav bar that navigates to the movies page", ()=> {
    cy.get('nav').within(()=> {
      cy.contains('Movies').click()
      cy.url().should('eq', `${baseURL}/movies`)
    })
  })

  it("has a link in the nav bar that navigates to the people page", ()=> {
    cy.get('nav').within(()=> {
      cy.contains('People').click()
      cy.url().should('eq', `${baseURL}/people`)
    })
  })

  it("has a link in the nav bar that navigates to the locations page", ()=> {
    cy.get('nav').within(()=> {
      cy.contains('Locations').click()
      cy.url().should('eq', `${baseURL}/locations`)
    })
      // make less fast flashing screens
  cy.wait(500)
  })

});

describe("Has a functioning Movies page that populates options menu from an API call", () => {
  before(() => {
    intercept();
    cy.visit(`${baseURL}/movies`);
    cy.wait("@request");
  });

  it("includes an element with a class of `.movies`", () => {
    cy.get(".movies").should("exist");
  });

  it("includes options elements that are populated with movie titles`", () => {
    films.forEach(film => cy.get('select')
      .within(() => cy.contains(film.title)))
  });

});

describe("Has a functioning Movies page that populates a description when a movies title is chosen", () => {
  before(() => {
    intercept();
    cy.visit(`${baseURL}/movies`);
    cy.wait("@request");
  });

  it("selects a movie and displays title and summary", () => {
    cy.get("select").select("Ponyo");

    cy.findAllByRole("heading").contains("Ponyo");
    cy.contains(
      "The son of a sailor, 5-year old Sosuke lives a quiet life on an oceanside cliff with his mother Lisa. One fateful day, he finds a beautiful goldfish trapped in a bottle on the beach and upon rescuing her, names her Ponyo. But she is no ordinary goldfish. The daughter of a masterful wizard and a sea goddess, Ponyo uses her father's magic to transform herself into a young girl and quickly falls in love with Sosuke, but the use of such powerful sorcery causes a dangerous imbalance in the world. As the moon steadily draws nearer to the earth and Ponyo's father sends the ocean's mighty waves to find his daughter, the two children embark on an adventure of a lifetime to save the world and fulfill Ponyo's dreams of becoming human."
    );
  });

  it("selects the blank option and displays nothing", () => {
    cy.get("select").select("");
    cy.findAllByRole("heading").contains("Ponyo").should("not.exist");
    cy.contains(
      "The son of a sailor, 5-year old Sosuke lives a quiet life on an oceanside cliff with his mother Lisa. One fateful day, he finds a beautiful goldfish trapped in a bottle on the beach and upon rescuing her, names her Ponyo. But she is no ordinary goldfish. The daughter of a masterful wizard and a sea goddess, Ponyo uses her father's magic to transform herself into a young girl and quickly falls in love with Sosuke, but the use of such powerful sorcery causes a dangerous imbalance in the world. As the moon steadily draws nearer to the earth and Ponyo's father sends the ocean's mighty waves to find his daughter, the two children embark on an adventure of a lifetime to save the world and fulfill Ponyo's dreams of becoming human."
    ).should("not.exist");
  });
});

describe("Has a functioning People page", () => {
  before(() => {
    intercept();
    cy.visit(`${baseURL}/people`);
    cy.wait("@request");
  });

  it("can visit the people page", () => {
    cy.contains("Search for a Person");
    cy.get("input[type='text']").should("exist");
  });

  it("includes an element with a class of `.people`", () => {
    cy.get(".people").should("exist");
  });

  it("can type in a persons name, search for the person, and show the results", () => {
    cy.get(".people input").type("San");
    cy.get(".people button").click();

    cy.contains("San");
    cy.contains("17");
    cy.contains("Female");
  });

  it("can type in an invalid name and return Not Found", () => {
    cy.get(".people input").type("Wrong Name");
    cy.get(".people button").click();

    cy.contains("Not Found");
  });
});



describe("has a functioning Locations page", () => {
  before(() => {
    intercept();
    cy.visit(`${baseURL}/locations`);
    cy.wait("@request");
  });

  it("includes an element with a class of `.locations`", () => {
    cy.get(".locations").should("exist");
  });


  it("shows all locations and additional information when the Show Locations button is clicked", () => {
    cy.get("button").first().contains("Show Locations").click();

    cy.get(".locations > ul > li").should("have.length", 24);
    cy.get(".locations ul ul li").contains("Irontown");
    cy.get(".locations ul ul li").contains("The Marsh House");
    cy.get(".locations ul ul li").contains("Pazu's Mines");
    cy.get(".locations ul ul li").contains("Forest");
    cy.get(".locations ul ul li").contains("Ingary");
  });

  it("changes the button to Hide Locations", () => {
    cy.get("button").first().contains("Hide Locations").click();
    cy.get("button").first().contains("Show Locations");
  });

  it("hides all locations when Hide Locations is clicked", () => {
    cy.get("button").first().contains("Show Locations").click();
    cy.get("button").first().contains("Hide Locations").click();
    cy.get(".locations li:visible").should("have.length", 0);
  });

  it("changes the button to Show Locations", () => {
    cy.get("button").contains("Show Locations").click();
    cy.get("button").contains("Hide Locations").click();
    cy.get("button").contains("Show Locations");
  });
});

describe("Has 3 buttons that allow sorting by location Name, Climate or Terrain", ()=> {

  it("does not show the `Sort by` buttons when locations are hidden", ()=> {
    cy.get("button").contains("Show Locations").click();
    cy.get("button").contains("Hide Locations").click();
    cy.contains('Sort by Name').should('not.exist')
    cy.contains('Sort by Climate').should('not.exist')
    cy.contains('Sort by Terrain').should('not.exist')
  })
  it("only shows the `Sort by` buttons when locations are showing", ()=> {
    cy.get("button").contains("Show Locations").click();
    cy.contains('Sort by Name')
    cy.contains('Sort by Climate')
    cy.contains('Sort by Terrain')
  })


  it("sorts by location name, when `Sort by Name` button is pressed", () => {
    locations.sort((a, b)=> {
      if (a.name > b.name) {
        return 1
      } else if (a.name < b.name){
        return -1
      } else {
        return 0
      }
    })
    
    cy.contains('Sort by Name').click()
    locations.forEach((location, index) => {
      cy.get('.locations ul ul').eq(index).within(()=> {
        cy.get('span').eq(1).should('have.text', locations[index].name)
      })
    })
  })

  it("sorts by location climate, when `Sort by Climate` button is pressed", () => {
    locations.sort((a, b)=> {
      if (a.climate > b.climate) {
        return 1
      } else if (a.climate < b.climate){
        return -1
      } else {
        return 0
      }
    })
    
    cy.contains('Sort by Climate').click()
    locations.forEach((location, index) => {
      cy.get('.locations ul ul').eq(index).within(()=> {
        cy.get('li').eq(1).within(()=> {
          cy.get('span').eq(1).should('have.text', locations[index].climate)
        })
      })
    })
  })
})