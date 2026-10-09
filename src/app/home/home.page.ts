import {
  Component,
  computed,
  effect,
  signal,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonBadge
} from '@ionic/angular';

// Interfaz del producto
export interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonBadge
  ]
})
export class HomePage {

  public productos = signal<Producto[]>([
    {
      id: 1,
      nombre: 'Licencia IDE',
      precio: 89
    },
    {
      id: 2,
      nombre: 'Teclado Mecánico',
      precio: 120
    }
  ]);

  public precioTotal = computed(() => {
    return this.productos().reduce(
      (total, producto) => total + producto.precio,
      0
    );
  });

  constructor() {
    effect(() => {
      console.log(
        `[Persistencia] Estado actual del carrito. Items: ${this.productos().length}`
      );
    });
  }
public eliminarTodosLosProductos(): void {
  this.productos.set([]);
}
  public agregarProductoAleatorio(): void {

    const nuevoId = Math.max(
      0,
      ...this.productos().map(producto => producto.id)
    ) + 1;

    const nuevoProducto: Producto = {
      id: nuevoId,
      nombre: `Monitor ${nuevoId}`,
      precio: 250
    };

    this.productos.update(
      estadoAnterior => [
        ...estadoAnterior,
        nuevoProducto
      ]
    );
  }

  public eliminarProducto(id: number): void {

    this.productos.update(
      estadoAnterior =>
        estadoAnterior.filter(producto => producto.id !== id)
    );
  }
}