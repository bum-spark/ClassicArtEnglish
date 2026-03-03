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
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Judgement_of_Paris%2C_Antikensammlung_Berlin.jpg/800px-Judgement_of_Paris%2C_Antikensammlung_Berlin.jpg',
      description: 'One of the oldest depictions, around 2,500 years old. Painted on clay vessels with simple figures in red and black. The story was already an essential myth for the Greeks, connected to the origin of the Trojan War.',
      aspect: 'aspect-square'
    },
    {
      artist: 'Pompeii Fresco',
      year: 'c. 50 AD',
      era: 'Roman Empire',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Judgement_of_Paris_-_Pompeii.jpg/800px-Judgement_of_Paris_-_Pompeii.jpg',
      description: 'Found on the walls of a house buried by Vesuvius. The Roman version shows a more realistic style with vivid colors preserved under volcanic ash for nearly two thousand years.',
      aspect: 'aspect-[4/3]'
    },
    {
      artist: 'Workshop of Botticelli',
      year: 'c. 1485',
      era: 'Renaissance',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Nymphs_and_Paris.jpg/800px-Nymphs_and_Paris.jpg',
      description: 'The Renaissance brought the myth back to life with Botticelli\u2019s signature elegance. Graceful figures, flowing drapery, and idealized beauty. The goddesses are presented with the same softness as his famous Venus.',
      aspect: 'aspect-[4/3]'
    },
    {
      artist: 'Peter Paul Rubens',
      year: 'c. 1632\u20131635',
      era: 'Baroque',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Peter_Paul_Rubens_115.jpg/1024px-Peter_Paul_Rubens_115.jpg',
      description: 'Rubens paints the scene with dramatic light, fleshy bodies, and a sense of movement. The goddesses are voluptuous and powerful. This is the Baroque at its most theatrical and sensual.',
      aspect: 'aspect-[4/3]',
      featured: true
    },
    {
      artist: '20th Century Interpretations',
      year: 'c. 1900s',
      era: 'Modern Era',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Enrique_Simonet_-_El_juicio_de_Paris_-_1904.jpg/1024px-Enrique_Simonet_-_El_juicio_de_Paris_-_1904.jpg',
      description: 'Modern and avant-garde artists reimagined the scene with abstraction, cubism, or irony. The myth becomes a vehicle for exploring new artistic ideas \u2014 the story is the same, but the visual language is completely different.',
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
