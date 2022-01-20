import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiService } from "./api.service";
import { ApiServiceStub } from "./api.service.stub";
import { PINS } from "./mocks/pins";

import { RepositoryService } from "./repository.service";

fdescribe("RepositoryService", () => {
  let service: RepositoryService;
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ApiService,
          useClass: ApiServiceStub,
        },
        RepositoryService,
      ],
    })
  );

  beforeAll(() => {
    environment.mocks = true;
  });

  beforeEach(() => {
    service = TestBed.get(RepositoryService);
    environment.mocks = true;
  });

  it("should be created", () => {
    const service: RepositoryService = TestBed.get(RepositoryService);
    expect(service).toBeTruthy();
  });

  it("getPins mocks", () => {
    service.getPins().subscribe((response) => {
      expect(response).toBe(PINS);
    });
  });

  it("getPins no mocks", () => {
    environment.mocks = false;
    const get = spyOn((<any>service).api, "get").and.returnValue(of(true));
    service.getPins().subscribe((response) => {
      expect(get).toHaveBeenCalled();
    });
  });

  it("savePins mocks", () => {
    const obj = {
      test: true,
    };
    service.savePins(obj).subscribe((response) => {
      expect(response).toBe(obj);
    });
  });

  it("savePins no mocks", () => {
    environment.mocks = false;
    const obj = {
      test: true,
    };
    const post = spyOn((<any>service).api, "post").and.returnValue(of(true));
    service.savePins(obj).subscribe((response) => {
      expect(post).toHaveBeenCalled();
    });
  });

  it("updatePin mocks", () => {
    const obj = {
      id: 1,
      test: true,
    };
    service.updatePin(obj.id, obj).subscribe((response) => {
      expect(response).toBe(obj);
    });
  });

  it("updatePin no mocks", () => {
    environment.mocks = false;
    const obj = {
      id: 1,
      test: true,
    };
    const put = spyOn((<any>service).api, "put").and.returnValue(of(true));
    service.updatePin(obj.id, obj).subscribe((response) => {
      expect(put).toHaveBeenCalled();
    });
  });
});
