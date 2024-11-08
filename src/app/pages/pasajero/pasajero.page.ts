import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';  // Importar AlertController

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
})
export class PasajeroPage implements OnInit, OnDestroy {
  viajes: any[] = [];
  viajesSubscription: Subscription | undefined;
  map!: mapboxgl.Map;
  selectedViaje: any = null;
  userEmail: string | null = null;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private storage: Storage,
    private alertController: AlertController  // Inyectar el AlertController
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userEmail = user.email;
      }
    });

    // Escuchar todos los viajes desde Firebase
    this.viajesSubscription = this.db
      .list('viajes')
      .snapshotChanges()
      .subscribe((data) => {
        this.viajes = data
          .map((action) => ({ key: action.key, ...action.payload.val() as any }))
          .filter((viaje) => viaje.asientosDisponibles > 0 && viaje.estado !== 'cancelado' && viaje.estado !== 'en curso');
        console.log('Viajes actualizados:', this.viajes);
      });
  }

  ngOnDestroy() {
    if (this.viajesSubscription) {
      this.viajesSubscription.unsubscribe();
    }
  }

  seleccionarViaje(viaje: any) {
    this.selectedViaje = viaje;
    this.mostrarRutaEnMapa(this.selectedViaje.ruta);
  }

  async aceptarViaje(viaje: any) {
    if (this.userEmail) {
      const position = await Geolocation.getCurrentPosition();
      const ubicacionPasajero = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      const nuevosAsientos = viaje.asientosDisponibles - 1;

      const pasajerosRef = this.db.list(`viajes/${viaje.key}/pasajeros`);
      pasajerosRef.push({ email: this.userEmail, ubicacion: ubicacionPasajero });

      this.db.object(`viajes/${viaje.key}`).update({
        asientosDisponibles: nuevosAsientos,
      });

      if (nuevosAsientos === 0) {
        this.selectedViaje = null;
      }

      await this.guardarViajeEnStorage(viaje, ubicacionPasajero);

      // Mostrar alerta de confirmación
      this.mostrarAlertaConfirmacion(viaje);
    }
  }

  async mostrarAlertaConfirmacion(viaje: any) {
    const alert = await this.alertController.create({
      header: '¡Viaje Confirmado!',
      message: `Has aceptado el viaje hacia ${viaje.destino}. Tu asiento ha sido reservado. ¡Buen viaje!`,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async guardarViajeEnStorage(viaje: any, ubicacionPasajero: any) {
    const viajeData = {
      key: viaje.key,
      destino: viaje.destino,
      descripcion: viaje.descripcion,
      costo: viaje.costo,
      asientosDisponibles: viaje.asientosDisponibles - 1,
      ubicacionPasajero,
      email: this.userEmail,
    };
    await this.storage.set(`viaje_aceptado_${viaje.key}`, viajeData);
    console.log('Viaje guardado en storage:', viajeData);
  }

  mostrarRutaEnMapa(rutaCoordenadas: [number, number][]) {
    (mapboxgl as any).accessToken = environment.accessToken;

    this.map = new mapboxgl.Map({
      container: 'mapa-viaje',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.selectedViaje.ubicacionInicial,
      zoom: 12,
    });

    this.map.on('load', () => {
      this.map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: rutaCoordenadas,
          },
          properties: {},
        },
      });

      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#1DB954',
          'line-width': 4,
        },
      });
    });
  }
}
