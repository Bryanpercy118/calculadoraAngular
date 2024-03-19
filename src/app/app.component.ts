import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cajeroAngular';
  cantidadARetirar: string = '';
  billetes: any[] = [];
  denominaciones = [100000, 50000, 20000, 10000, 5000];

  agregarNumero(numero: string): void {
    this.cantidadARetirar += numero;
  }

  borrarUltimo(): void {
    this.cantidadARetirar = this.cantidadARetirar.slice(0, -1);
  }

  cancelarOperacion(): void {
    this.cantidadARetirar = '';
    this.billetes = [];
  }

  continuarOperacion(): void {
    this.dispensarDinero(parseInt(this.cantidadARetirar, 10));
  }

  dispensarDinero(cantidad: number): void {
    let monto = cantidad;
    this.billetes = [0, 0, 0, 0, 0]; 

    let contador = 0;

    while (monto > 0) {
      let entra = 0;

      for (let i = contador; i < this.denominaciones.length; i++) {
        if (monto >= this.denominaciones[i]) {
          this.billetes[i]++;
          monto -= this.denominaciones[i];
          entra = 1;
        }
      }

      if (entra === 0 && contador === this.denominaciones.length) {
        contador = 0;
      } else {
        contador++;
      }
    }

    console.log('Billetes a entregar:');
    for (let i = 0; i < this.billetes.length; i++) {
      if (this.billetes[i] > 0) {
        console.log(`${this.billetes[i]} billetes de ${this.denominaciones[i]}`);
      }
    }
  }
}
