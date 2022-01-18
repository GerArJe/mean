import { getTestBed, TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

import { ApiService } from "./api.service";
import { environment } from "src/environments/environment";
import { HttpHeaders } from "@angular/common/http";

fdescribe("ApiService", () => {
  let service: ApiService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [ApiService],
      imports: [HttpClientTestingModule],
    })
  );

  beforeEach(() => {
    injector = getTestBed();
    service = TestBed.get(ApiService);
    httpMock = injector.get(HttpTestingController);
  });

  afterAll(() => {
    injector = null;
    service = null;
    httpMock = null;
  });

  it("should be created", () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });

  describe("GET", () => {
    it("should execute GET", () => {
      const result = "testing";

      service.get("/test").subscribe((response) => {
        expect(response).toBe(result);
      });

      const req = httpMock.expectOne(environment.apiEndpoint + "/test");
      expect(req.request.method).toBe("GET");
      req.flush(result);
    });

    it("should execute GET with headers", () => {
      const result = "testing";
      const headers = new HttpHeaders().set("platzi-headers", "cristian-rules");

      service.get("/test", headers).subscribe((response) => {
        expect(response).toBe(result);
      });

      const req = httpMock.expectOne(environment.apiEndpoint + "/test");
      expect(req.request.headers.get("platzi-headers")).toBe("cristian-rules");
      expect(req.request.method).toBe("GET");
      req.flush(result);
    });
  });

  describe("POST", () => {
    it("should execute POST", () => {
      const result = "testing";

      service.post("/test", {}).subscribe((response) => {
        expect(response).toBe(result);
      });

      const req = httpMock.expectOne(environment.apiEndpoint + "/test");
      expect(req.request.method).toBe("POST");
      req.flush(result);
    });
  });

  describe("PUT", () => {
    it("should execute PUT", () => {
      const result = "testing";

      service.put("/test", {}).subscribe((response) => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(environment.apiEndpoint + "/test");
      expect(req.request.method).toBe("PUT");
      req.flush(result);
    });
  });

  describe("DELETE", () => {
    it("should execute DELETE", () => {
      const result = "testing";

      service.delete("/test").subscribe((response) => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(environment.apiEndpoint + "/test");
      expect(req.request.method).toBe("DELETE");
      req.flush(result);
    });
  });
});
