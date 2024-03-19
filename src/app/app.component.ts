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
  denominaciones = [100000, 50000, 20000, 10000];
  billetesEntregar: number[] = [0, 0, 0, 0];

  agregarNumero(numero: string): void {
    this.cantidadARetirar += numero;
  }


  borrarUltimo(): void {
    this.cantidadARetirar = this.cantidadARetirar.slice(0, -1);
  }

  cancelarOperacion(): void {
    this.cantidadARetirar = '';
    this.billetesEntregar = [0, 0, 0, 0];
    this.billetes = [];
  }

  continuarOperacion(): void {
    this.calcularBilletes(parseInt(this.cantidadARetirar, 10));
  }

  calcularBilletes(cantidad: number): void {
    let monto = cantidad;
    if (cantidad === 100000) {
      for (let i = 0; i < this.denominaciones.length; i++) {
        const billete = this.denominaciones[i];
        const cantidadBilletes = Math.floor(monto / billete);
        this.billetesEntregar[i] += cantidadBilletes;
        monto -= cantidadBilletes * billete;
      }
    } else {
      for (let i = 0; i < this.denominaciones.length; i++) {
        const billete = this.denominaciones[i];
        if (monto >= billete) {
          const cantidadBilletes = Math.floor(monto / billete);
          this.billetesEntregar[i] += cantidadBilletes;
          monto -= cantidadBilletes * billete;
        }
      }
    }

    if (monto > 0) {
      console.log('No se pueden entregar billetes para la cantidad solicitada');
    } else {
      console.log('Billetes a entregar:', this.billetesEntregar);


      this.billetes = [];
      for (let i = 0; i < this.billetesEntregar.length; i++) {
        if (this.billetesEntregar[i] > 0) {
          this.billetes.push({ valor: this.denominaciones[i], cantidad: this.billetesEntregar[i] });
        }
      }
    }
  }
}
