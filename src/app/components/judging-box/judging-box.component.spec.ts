import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgingBoxComponent } from './judging-box.component';

describe('JudgingBoxComponent', () => {
  let component: JudgingBoxComponent;
  let fixture: ComponentFixture<JudgingBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JudgingBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JudgingBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
