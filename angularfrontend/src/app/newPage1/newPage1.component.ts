import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-newpage1',
  templateUrl: './newPage1.component.html',
  styleUrls: ['./newPage1.component.scss']
})
export class NewPage1Component  implements OnInit{ currentUser: string;
  constructor() { }

  ngOnInit() {
    this.currentUser = this.readLocalStorageValue('currentUser');
  }

  readLocalStorageValue(key: string): string {
    return localStorage.getItem(key);
  }
  }

  // Metoda do zapisywania Studenta. Jeśli pola spełniaja warunki walidacji zostanie wywołana metoda z studentService zapisująca studenta.
  // Komponent Toastr jest odpowiedzialny za wyświetlenie aletru informującego o przebiegu zleconej operacji
  // https://www.npmjs.com/package/ngx-toastr


