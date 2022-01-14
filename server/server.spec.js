const express = require("express");
const logger = require("morgan");
const http = require("http");
const PinsRouter = require("./routes/pins");
const Pins = require("./models/Pins");
const request = require("request");
const axios = require("axios");
const app = express();
var requestPromise = require("request-promise-native");

app.use(logger("dev"));
app.use(express.json());
app.use("/api", PinsRouter.router);
app.set("port", 3000);

describe("Testing Router", () => {
  let server;

  beforeAll(() => {
    server = http.createServer(app);
    server.listen(3000);
  });

  afterAll(() => {
    server.close();
  });

  describe("GET", () => {
    // GET
    it("200 and pin in", (done) => {
      const data = [{ id: 1 }];
      spyOn(Pins, "find").and.callFake((callback) => {
        callback(false, data);
      });
      request.get("http://localhost:3000/api", (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual([{ id: 1 }]);
        done();
      });
    });

    // GET 500
    it("500", (done) => {
      const data = [{ id: 1 }];
      spyOn(Pins, "find").and.callFake((callback) => {
        callback(true, data);
      });
      request.get("http://localhost:3000/api", (error, response, body) => {
        expect(response.statusCode).toBe(500);
        done();
      });
    });

    // GET
    it("200 single ping by id", (done) => {
      const data = { id: 1 };
      const id = 1;
      spyOn(Pins, "findById").and.callFake((id, callback) => {
        callback(false, data);
      });
      request.get(
        `http://localhost:3000/api/${id}`,
        (error, response, body) => {
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body)).toEqual({ id: 1 });
          done();
        }
      );
    });

    // GET 500
    it("500", (done) => {
      const data = { id: 1 };
      const id = 1;
      spyOn(Pins, "findById").and.callFake((id, callback) => {
        callback(true, data);
      });
      request.get(
        `http://localhost:3000/api/${id}`,
        (error, response, body) => {
          expect(response.statusCode).toBe(500);
          done();
        }
      );
    });
  });

  describe("POST", () => {
    // 200
    it("200", (done) => {
      spyOn(Pins, "create").and.callFake((pin, callback) => {
        callback(false, {});
      });

      spyOn(requestPromise, "get").and.returnValue(
        Promise.resolve(
          '<title>Platzi</title><meta name="description" content="Platzi rules">'
        )
      );

      const assets = [{ url: "http://platzi.com" }];

      axios
        .post("http://localhost:3000/api", {
          title: "title",
          author: "author",
          description: "description",
          assets,
        })
        .then((res) => {
          expect(res.status).toBe(200);
          done();
        });
    });

    // 500
    it("500", (done) => {
      spyOn(Pins, "create").and.callFake((pin, callback) => {
        callback(true, {});
      });

      spyOn(requestPromise, "get").and.returnValue();

      const assets = [{ url: "http://platzi.com" }];

      axios
        .post("http://localhost:3000/api", {
          title: "title",
          author: "author",
          description: "description",
          assets,
        })
        .catch((error) => {
          expect(error.response.status).toBe(500);
          done();
        });
    });

    // 200 PDF
    it("200 PDF", (done) => {
      spyOn(Pins, "create").and.callFake((pins, callback) => {
        callback(false, {});
      });

      const assets = [{ url: "http://platzi.pdf" }];

      axios
        .post("http://localhost:3000/api", {
          title: "title",
          author: "author",
          description: "description",
          assets,
        })
        .then((res) => {
          expect(res.status).toBe(200);
          done();
        });
    });

    // 500
    it("500 PDF", (done) => {
      spyOn(Pins, "create").and.callFake((pin, callback) => {
        callback(true, {});
      });

      spyOn(requestPromise, "get").and.returnValue();

      const assets = [{ url: "http://platzi.pdf" }];

      axios
        .post("http://localhost:3000/api", {
          title: "title",
          author: "author",
          description: "description",
          assets,
        })
        .catch((error) => {
          expect(error.response.status).toBe(500);
          done();
        });
    });
  });

  describe("PUT", () => {
    // 200
    it("200", (done) => {
      spyOn(Pins, "findByIdAndUpdate").and.callFake((id, body, callback) => {
        callback(false, {});
      });

      const assets = [{ url: "http://platzi.com" }];

      axios
        .put("http://localhost:3000/api/1", {
          title: "title",
          author: "author",
          description: "description",
          assets,
        })
        .then((res) => {
          expect(res.status).toBe(200);
          done();
        });
    });

    // 500
    it("500", (done) => {
      spyOn(Pins, "create").and.callFake((id, body, callback) => {
        callback(true, {});
      });

      const assets = [{ url: "http://platzi.com" }];

      axios
        .put("http://localhost:3000/api/1", {
          title: "title",
          author: "author",
          description: "description",
          assets,
        })
        .catch((error) => {
          expect(error.response.status).toBe(500);
          done();
        });
    });
  });
});
