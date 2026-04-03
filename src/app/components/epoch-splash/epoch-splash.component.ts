import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';

interface EpochSplashData {
  name: string;
  years: string;
  routes: string[];
  images: string[];
}

@Component({
  selector: 'app-epoch-splash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './epoch-splash.component.html',
  styleUrl: './epoch-splash.component.scss'
})
export class EpochSplashComponent implements OnInit, OnDestroy {
  private isBrowser: boolean;
  private routerSub!: Subscription;
  private seenEpochs = new Set<string>();

  isShowing = false;
  isLeaving = false;
  currentName = '';
  currentYears = '';
  currentImages: string[] = [];
  activeImageIndex = 0;
  private slideInterval: any;

  epochData: EpochSplashData[] = [
    {
      name: 'Classical Era',
      years: '800 BC — 476 AD',
      routes: ['/greece', '/hercules', '/rome'],
      images: [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/1280px-Colosseo_2020.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Pompeii_-_Casa_dei_Vettii_-_Pentheus.jpg/960px-Pompeii_-_Casa_dei_Vettii_-_Pentheus.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Peter_Paul_Rubens_-_The_Judgment_of_Paris_-_WGA20307.jpg/1280px-Peter_Paul_Rubens_-_The_Judgment_of_Paris_-_WGA20307.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Cleomene_di_Apollodoro%2C_venere_medici%2C_I_secolo_ac_ca.jpg/500px-Cleomene_di_Apollodoro%2C_venere_medici%2C_I_secolo_ac_ca.jpg',
      ]
    },
    {
      name: 'Middle Ages',
      years: '500 — 1400',
      routes: ['/medieval', '/romanesque', '/gothic'],
      images: [
        'https://www.art-theoria.com/wp-content/uploads/2015/03/Giotto-Lamentation.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg/1920px-%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg',
        'https://www.datocms-assets.com/103094/1688667266-5-2.jpg?auto=format,compress&cs=srgb&max-w=800',
      ]
    },
    {
      name: 'Renaissance & Baroque',
      years: '1400 — 1800',
      routes: ['/renaissance', '/baroque', '/neoclassicism'],
      images: [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1920px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg/1920px-The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg',
        'https://www.datocms-assets.com/103094/1688661508-1506165873655660-artemisia-giuditta-principale.jpg?auto=format%2Ccompress&cs=srgb&max-w=800',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/L%C3%A9onidas_aux_Thermopyles_-_Jacques-Louis_David_-_Mus%C3%A9e_du_Louvre_Peintures_INV_3690_%3B_L_3711.jpg/1280px-L%C3%A9onidas_aux_Thermopyles_-_Jacques-Louis_David_-_Mus%C3%A9e_du_Louvre_Peintures_INV_3690_%3B_L_3711.jpg',
      ]
    },
    {
      name: '19th Century',
      years: '1800 — 1899',
      routes: ['/romanticism', '/impressionism', '/postimpressionism'],
      images: [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Claude_Monet%2C_Impression%2C_soleil_levant.jpg/1280px-Claude_Monet%2C_Impression%2C_soleil_levant.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/The_Great_Wave_off_Kanagawa.jpg/1280px-The_Great_Wave_off_Kanagawa.jpg',
      ]
    },
    {
      name: '20th Century',
      years: '1900 — 1999',
      routes: ['/expressionism', '/surrealism', '/postmodernism'],
      images: [
        'https://www.edvardmunch.org/assets/img/paintings/the-scream.jpg',
        'https://cdn.culturagenial.com/es/imagenes/cuadro-guernica-de-pablo-picasso-og.jpg',
        'https://www.moma.org/media/W1siZiIsIjMxODI0MiJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA5MCAtcmVzaXplIDIwMDB4MTQ0MFx1MDAzZSJdXQ.jpg?sha=f1e923ce509ba9e6',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Marcel_Duchamp%2C_1917%2C_Fountain%2C_photograph_by_Alfred_Stieglitz.jpg/960px-Marcel_Duchamp%2C_1917%2C_Fountain%2C_photograph_by_Alfred_Stieglitz.jpg',
      ]
    },
    {
      name: 'The Future',
      years: '2000 — Today',
      routes: ['/ai-art', '/nfts', '/digital-art'],
      images: [
        'https://www.cnet.com/a/img/resize/e0a5ae097ce1143e9a9d7e017f685e079e46f8ba/hub/2022/09/28/905de384-f115-42ed-9e8a-07746675658b/dall-e-parachuting-elephant.jpg?auto=webp&fit=crop&height=900&width=1200',
        'https://queue-it.com/media/ss1dxknh/bored-apes.jpg',
        'https://community.wacom.com/en-us/wp-content/uploads/sites/40/2025/01/Killer-Rabbit-Solarpunk-pixel-art-feature-image.jpg',
      ]
    }
  ];

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.routerSub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const url = e.urlAfterRedirects || e.url;
        this.checkSplash(url);
      });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
    this.stopSlideshow();
  }

  private checkSplash(url: string): void {
    const epoch = this.epochData.find(ep => ep.routes.includes(url));
    if (!epoch) return;
    if (this.seenEpochs.has(epoch.name)) return;

    this.seenEpochs.add(epoch.name);

    this.currentName = epoch.name;
    this.currentYears = epoch.years;
    this.currentImages = epoch.images;
    this.activeImageIndex = 0;
    this.isLeaving = false;
    this.isShowing = true;
    document.body.style.overflow = 'hidden';

    this.startSlideshow();
  }

  private startSlideshow(): void {
    this.stopSlideshow();
    this.slideInterval = setInterval(() => {
      this.activeImageIndex = (this.activeImageIndex + 1) % this.currentImages.length;
    }, 3000);
  }

  private stopSlideshow(): void {
    clearInterval(this.slideInterval);
  }

  dismiss(): void {
    this.isLeaving = true;
    // Wait for fade-out animation before hiding
    setTimeout(() => {
      this.isShowing = false;
      this.isLeaving = false;
      document.body.style.overflow = '';
      this.stopSlideshow();
    }, 800);
  }
}
