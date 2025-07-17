import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasComponent } from './bas.component';

describe('BasComponent', () => {
  let component: BasComponent;
  let fixture: ComponentFixture<BasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
