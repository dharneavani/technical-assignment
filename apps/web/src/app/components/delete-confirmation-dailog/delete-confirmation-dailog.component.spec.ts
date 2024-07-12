import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationDailogComponent } from './delete-confirmation-dailog.component';

describe('DeleteConfirmationDailogComponent', () => {
  let component: DeleteConfirmationDailogComponent;
  let fixture: ComponentFixture<DeleteConfirmationDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteConfirmationDailogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConfirmationDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
