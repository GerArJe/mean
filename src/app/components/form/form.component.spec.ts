import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormArray, ReactiveFormsModule } from "@angular/forms";

import { MatSnackBar } from "@angular/material";
import { of } from "rxjs";
import { NavigationService } from "src/app/services/navigation.service";
import { RepositoryService } from "src/app/services/repository.service";

import { FormComponent } from "./form.component";

class RepositoryServiceStub {
  savePins() {
    return of(true);
  }
}

class NavigationServiceStub {
  goToPins() {}
}

class MatSnackBarStub {
  open() {
    return {
      afterDismissed: () => {
        return of(true);
      },
    };
  }
}

fdescribe("FormComponent", () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormComponent],
      providers: [
        {
          provide: RepositoryService,
          useClass: RepositoryServiceStub,
        },
        {
          provide: NavigationService,
          useClass: NavigationServiceStub,
        },
        {
          provide: MatSnackBar,
          useClass: MatSnackBarStub,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("When component is initialized", () => {
    it("Should create the form", () => {
      expect(Object.keys(component.firstFormGroup.controls)).toEqual([
        "title",
        "author",
        "description",
      ]);
      expect(Object.keys(component.secondFormGroup.controls)).toEqual([
        "firstAsset",
        "assets",
      ]);
    });
  });

  describe("Whed addAsset is executed", () => {
    it("Should add new group", () => {
      const assets = <FormArray>component.secondFormGroup.get("assets");
      component.addAsset();
      component.addAsset();
      expect(Object.keys(assets.controls)).toEqual(["0", "1"]);
    });
  });

  describe("When deleteAsset", () => {
    it("Should remover the form control", () => {
      const assets = <FormArray>component.secondFormGroup.get("assets");
      component.addAsset();
      component.deleteAsset(0);
      expect(Object.keys(assets.controls)).toEqual([]);
    });
  });

  describe("When savePins is executed", () => {
    it("Should navigate to pins view", () => {
      const navigate = spyOn((<any>component).navigate, "goToPins");
      const open = spyOn((<any>component).snackBar, "open").and.callThrough();

      component.savePin();
      expect(navigate).toHaveBeenCalled();
      expect(open).toHaveBeenCalledWith(
        "Your pin is saved, Redirecting ...",
        "Cool!",
        {
          duration: 2000,
        }
      );
    });
  });
});
