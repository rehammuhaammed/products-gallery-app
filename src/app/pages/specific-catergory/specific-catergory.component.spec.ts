import { SpecificCatergoryComponent } from './specific-catergory.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('SpecificCatergoryComponent', () => {
  let component: SpecificCatergoryComponent;
  let fixture: ComponentFixture<SpecificCatergoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecificCatergoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificCatergoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
