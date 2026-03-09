import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import AOS from 'aos';

@Component({
  selector: 'app-romanesque',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './romanesque.component.html',
  styleUrl: './romanesque.component.scss'
})
export class RomanesqueComponent implements OnInit {
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
