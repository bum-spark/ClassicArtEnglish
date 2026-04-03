import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import AOS from 'aos';

@Component({
  selector: 'app-expressionism',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './expressionism.component.html',
  styleUrl: './expressionism.component.scss'
})
export class ExpressionismComponent implements OnInit {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      AOS.init({ duration: 800, once: true, offset: 80 });
      window.scrollTo(0, 0);
    }
  }
}
