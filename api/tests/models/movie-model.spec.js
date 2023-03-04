const { sequelize, Movie } = require("../../src/db");

describe("Movies Model", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: false });
  });

  describe("Validations", () => {
    it("should not create the movie if the title is not sent", async () => {
      expect.assertions(1);

      try {
        await Movie.create({
          image:
            "https://res.cloudinary.com/dtsc0hcla/image/upload/v1677717332/mfjrtrdorjv0awfaearr.webp",
          overview: "The movies is...",
          release_date: "03/03/2022",
          genres: "Action",
          popularity: 3000,
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  });

  it("should not create the movie if the image is not sent", async () => {
    expect.assertions(1);
    try {
      await Movie.create({
        title: "The Origin",
        overview: "The movies is...",
        release_date: "03/03/2022",
        genres: "Action",
        popularity: 3000,
      });
    } catch (error) {
      expect(error.message).toBeDefined();
    }
  });

  it("should not create the movie if the overview is not sent", async () => {
    expect.assertions(1);

    try {
      await Movie.create({
        title: "The Origin",
        image:
          "https://res.cloudinary.com/dtsc0hcla/image/upload/v1677717332/mfjrtrdorjv0awfaearr.webp",
        release_date: "03/03/2022",
        genres: "Action",
        popularity: 3000,
      });
    } catch (error) {
      expect(error.message).toBeDefined();
    }
  });

  it("should not create the movie if the release date is not sent", async () => {
    expect.assertions(1);

    try {
      await Movie.create({
        title: "The Origin",
        image:
          "https://res.cloudinary.com/dtsc0hcla/image/upload/v1677717332/mfjrtrdorjv0awfaearr.webp",
        overview: "The movies is...",
        genres: "Action",
        popularity: 3000,
      });
    } catch (error) {
      expect(error.message).toBeDefined();
    }
  });

  it("shouldn't create the movie if the genre isn't submitted", async () => {
    expect.assertions(1);

    try {
      await Movie.create({
        title: "The Origin",
        image:
          "https://res.cloudinary.com/dtsc0hcla/image/upload/v1677717332/mfjrtrdorjv0awfaearr.webp",
        overview: "The movies is...",
        release_date: "03/03/2022",
        popularity: 3000,
      });
    } catch (error) {
      expect(error.message).toBeDefined();
    }
  });

  it("shouldn't create the movie if the popularity isn't sent", async () => {
    expect.assertions(1);

    try {
      await Movie.create({
        title: "The Origin",
        image:
          "https://res.cloudinary.com/dtsc0hcla/image/upload/v1677717332/mfjrtrdorjv0awfaearr.webp",
        overview: "The movies is...",
        release_date: "03/03/2022",
        genres: "Action",
      });
    } catch (error) {
      expect(error.message).toBeDefined();
    }
  });

  afterAll(async () => {
    await sequelize.sync({ force: false });
    sequelize.close();
  });
});
