import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbayOauthComponent } from './ebay-oauth.component';

describe('EbayOauthComponent', () => {
  let component: EbayOauthComponent;
  let fixture: ComponentFixture<EbayOauthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EbayOauthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EbayOauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
