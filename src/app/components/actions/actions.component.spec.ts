import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatBottomSheetRef } from "@angular/material";
import { By } from "@angular/platform-browser";
import { Subject } from "rxjs";
import { PinsService } from "../pins/pins.service";

import { ActionsComponent } from "./actions.component";

class MatBottomSheetRefStub {
  dismiss() {}
}

class PinsServiceStub {
  resolveActionObserver() {}
}

fdescribe("ActionsComponent", () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionsComponent],
      providers: [
        {
          provide: MatBottomSheetRef,
          useClass: MatBottomSheetRefStub,
        },
        {
          provide: PinsService,
          useClass: PinsServiceStub,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("openLink", () => {
    const openLink = spyOn(<any>component, "openLink");
    let a = fixture.debugElement.query(By.css("a"));
    a.triggerEventHandler("click", "create");
    expect(openLink).toHaveBeenCalled();
  });
});
