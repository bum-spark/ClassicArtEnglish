import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import * as AOS from 'aos';

@Component({
  selector: 'app-paris',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './paris.component.html',
  styleUrl: './paris.component.scss'
})
export class ParisComponent implements OnInit {
  private isBrowser: boolean;

  paintings = [
    {
      artist: 'Greek Ceramic',
      year: 'c. 500 BC',
      era: 'Classical Era',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Judgement_of_Paris_Staatliche_Antikensammlungen_837.jpg/960px-Judgement_of_Paris_Staatliche_Antikensammlungen_837.jpg',
      description: 'One of the oldest depictions, around 2,500 years old. Painted on clay vessels with simple figures in red and black. The story was already an essential myth for the Greeks, connected to the origin of the Trojan War.',
      aspect: 'aspect-square'
    },
    {
      artist: 'Roman Fresco',
      year: 'c. 50 AD',
      era: 'Roman Empire',
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Fresco_-_Wall_Fragment_with_the_Judgment_of_Paris.jpg',
      description: 'A Roman wall painting showing the Judgment of Paris. The Roman version shows a more realistic style with vivid colors preserved for nearly two thousand years, reflecting how deeply Greek myths permeated Roman culture.',
      aspect: 'aspect-[4/3]'
    },
    {
      artist: 'Lucas Cranach the Elder',
      year: 'c. 1528',
      era: 'Renaissance',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Lucas_Cranach_the_Elder_-_The_Judgment_of_Paris_-_Google_Art_Project.jpg/960px-Lucas_Cranach_the_Elder_-_The_Judgment_of_Paris_-_Google_Art_Project.jpg',
      description: 'The Renaissance brought the myth back to life with idealized beauty. Cranach reimagines the scene with Germanic elegance \u2014 the three goddesses stand before Paris in a Northern European landscape, blending ancient mythology with contemporary aesthetics.',
      aspect: 'aspect-[4/3]'
    },
    {
      artist: 'Peter Paul Rubens',
      year: 'c. 1632\u20131635',
      era: 'Baroque',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Peter_Paul_Rubens_115.jpg/1920px-Peter_Paul_Rubens_115.jpg',
      description: 'Rubens paints the scene with dramatic light, fleshy bodies, and a sense of movement. The goddesses are voluptuous and powerful. This is the Baroque at its most theatrical and sensual.',
      aspect: 'aspect-[4/3]',
      featured: true
    },
    {
      artist: 'Enrique Simonet',
      year: '1904',
      era: 'Early 20th Century',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Enrique_Simonet_-_El_Juicio_de_Paris_-_1904.jpg/960px-Enrique_Simonet_-_El_Juicio_de_Paris_-_1904.jpg',
      description: 'A transitional work between academic realism and modern art. Simonet reimagines the scene with photographic precision while adding a romantic atmosphere \u2014 the myth serves as a vehicle for exploring the human form in the new century.',
      aspect: 'aspect-[4/3]'
    }
  ];

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
