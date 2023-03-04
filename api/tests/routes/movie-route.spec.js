const app = require("../../src/app");
const request = require("supertest");
const { sequelize } = require("../../src/db");

describe("Movies Routes", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: false });
  });

  describe("[GET] /movies and /movies?title=title", () => {
    it("return status 200", async () => {
      process.nextTick(() => {});
      const res = await request(app).get("/movies");
      expect(res.statusCode).toBe(200);
      expect(res.type).toEqual("application/json");
      expect(JSON.parse(res.text)).toEqual(res.body);
    });

    it("Returns the list of all movies that match the entered name filter", async () => {
      process.nextTick(() => {});
      const res = await request(app).get(
        "/movies?title= Black, Panther:, Wakanda, Forever"
      );
      expect(res.statusCode).toBe(200);
      expect(res.type).toEqual("application/json");
      expect(JSON.parse(res.text)).toEqual(res.body);
      expect(res.body).toEqual([
        expect.objectContaining({
          id: 505642,
          title: "Black Panther: Wakanda Forever",
          image:"https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
          overview: "Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death.  As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.",
          release_date: "2022-11-09",
          genres: "Action",
          popularity: 2678.485,
        }),
      ]);
    });
  })


  describe('[GET] /movies/:id', () => {
        
    it('Returns the correct movie from the id', async () => {
        process.nextTick(() => {});
        const res = await request(app).get("/movies/505642");
        expect(res.statusCode).toBe(200);
        expect(res.type).toEqual('application/json');
        expect(res.body).toEqual({
            id: 505642,
            title: "Black Panther: Wakanda Forever",
            image:"https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
            overview: "Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death.  As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.",
            release_date: "2022-11-09",
            genres: "Action",
            popularity: 2678.485,
        });
      })


      it("Returns status 404 and correct message if the movie ID is invalid", async () => {
        const res = await request(app).get('/movies/hello');
        expect(res.statusCode).toBe(404);
        expect(res.type).toEqual('application/json');
        expect(JSON.parse(res.text)).toEqual({error: "Movie not found"});
      })
    })


    describe('[POST] /movies', () => {
        it('Returns status 400 and corresponding text if any parameters are not sent', async () => {
          const res = await request(app).post('/movies');
          expect(res.statusCode).toBe(400);
          expect(res.type).toEqual('application/json');
          expect(JSON.parse(res.text)).toEqual({error: "Missing required fields!"});
        });
        });     
        

        afterAll(async () => {
            await conn.sync({ force: false });
            conn.close();
        })
})


