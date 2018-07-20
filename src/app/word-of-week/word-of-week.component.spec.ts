import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordOfWeekComponent } from './word-of-week.component';

describe('WordOfWeekComponent', () => {
  let component: WordOfWeekComponent;
  let fixture: ComponentFixture<WordOfWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordOfWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordOfWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
