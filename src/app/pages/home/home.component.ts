import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import AOS from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  private isBrowser: boolean;

  periods = [
    {
      era: 'Classical Era',
      years: '800 BC - 476 AD',
      description: 'Ancient Greece and Rome laid the foundations of Western art, philosophy, and culture.',
      color: 'from-gold/20 to-transparent',
      icon: '🏛️'
    },
    {
      era: 'Middle Ages',
      years: '500 - 1400',
      description: 'Christianity shaped art with iconic religious paintings and Gothic architecture.',
      color: 'from-renaissance-red/20 to-transparent',
      icon: '⛪'
    },
    {
      era: 'Renaissance & Baroque',
      years: '1400 - 1750',
      description: 'Artists rediscovered classical ideals. Perspective, light, and human anatomy transformed painting.',
      color: 'from-gold/20 to-transparent',
      icon: '🎨'
    },
    {
      era: '19th Century',
      years: '1800 - 1899',
      description: 'Romanticism, Impressionism, and Realism. Artists became individuals, free from royal commissions.',
      color: 'from-olive/30 to-transparent',
      icon: '🌅'
    },
    {
      era: '20th Century',
      years: '1900 - 1999',
      description: 'Photography freed painters. Expressionism, Cubism, Surrealism, and the question: what is art?',
      color: 'from-renaissance-red/20 to-transparent',
      icon: '📷'
    },
    {
      era: 'The Future',
      years: '2000 — Today',
      description: 'AI-generated images, NFTs, video games, and virtual worlds. Art continues to evolve with technology.',
      color: 'from-gold/20 to-transparent',
      icon: '🤖'
    }
  ];

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      AOS.init({
        duration: 800,
        once: true,
        offset: 100
      });
    }
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    // Hero title animation
    gsap.fromTo('.hero-title', {
      y: 60,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.3
    });

    gsap.fromTo('.hero-subtitle', {
      y: 40,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      delay: 0.7
    });

    gsap.fromTo('.hero-cta', {
      y: 30,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      delay: 1.1
    });

    gsap.fromTo('.hero-divider', {
      width: 0
    }, {
      width: 80,
      duration: 1,
      ease: 'power2.out',
      delay: 0.9
    });

    gsap.fromTo('.scroll-indicator', {
      opacity: 0
    }, {
      opacity: 1,
      duration: 0.8,
      delay: 1.5
    });
  }
}
