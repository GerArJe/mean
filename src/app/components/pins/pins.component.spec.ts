import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { of, Subject } from "rxjs";

import { MatSnackBar } from "@angular/material";

import { PinsService } from "./pins.service";
import { RepositoryService } from "src/app/services/repository.service";
import { PinsComponent } from "./pins.component";
import { PINS } from "src/app/services/mocks/pins";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

class RepositoryServiceStub {
  oberver = new Subject();

  getPins() {
    return this.oberver;
  }

  resolvePins() {
    this.oberver.next(JSON.parse(JSON.stringify(PINS)));
  }

  updatePin() {
    return of(true);
  }
}

class MatSnackBarStub {
  open() {}
}

class PinsServiceStub {
  oberver = new Subject();
  $actionObserver = this.oberver.asObservable();

  public resolve(action) {
    return this.oberver.next(action);
  }
}

fdescribe("PinsComponent", () => {
  let component: PinsComponent;
  let fixture: ComponentFixture<PinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PinsComponent],
      providers: [
        {
          provide: RepositoryService,
          useClass: RepositoryServiceStub,
        },
        {
          provide: MatSnackBar,
          useClass: MatSnackBarStub,
        },
        {
          provide: PinsService,
          useClass: PinsServiceStub,
        },
      ],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("When new page is open", () => {
    const open = spyOn(window, "open");

    component.openUrl("https://platzi.com");

    expect(open).toHaveBeenCalledWith("https://platzi.com", "_blank");
  });

  it("When update progress", () => {
    component.pins = PINS;
    const pin = PINS[0];
    const updatePin = spyOn(
      (<any>component).repository,
      "updatePin"
    ).and.returnValue(of(true));
    const open = spyOn((<any>component).snackBar, "open");
    const pinService = TestBed.get(PinsService);
    const repository = TestBed.get(RepositoryService);
    repository.updatePin(pin._id, pin);
    pinService.resolve("save");
    expect(open).toHaveBeenCalledWith("Progress updated!", "OK", {
      duration: 2000,
    });
    expect(updatePin).toHaveBeenCalledWith(pin._id, pin);
  });
});
