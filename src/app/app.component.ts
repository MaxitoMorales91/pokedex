import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Pokedex';

  texts: any[] = [1,2,3,4,5,6];
  ngOnInit() {
    // let cantidad = 100;
    // for (let index = 0; index < cantidad; index++) {
    //   this.texts.push('Te adoro mi YAYA ' + index);
    // }



  }
}
