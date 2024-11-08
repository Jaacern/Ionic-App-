import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as mapboxgl from 'mapbox-gl';
import { Geolocation } from '@capacitor/geolocation';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-role-selection',
  templateUrl: './role-selection.page.html',
  styleUrls: ['./role-selection.page.scss'],
})
export class RoleSelectionPage implements OnInit {
  userEmail: string | null = null;
  isAdmin: boolean = false; // Variable para saber si el usuario es admin
  map!: mapboxgl.Map;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore // Firestore para acceder a los datos del usuario
  ) {}

  ngOnInit() {
    // Obtiene el estado de autenticación del usuario
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userEmail = user.email;

        // Llama a la función que verifica el rol del usuario
        this.checkUserRole(user.uid);
      } else {
        this.userEmail = 'Usuario';
      }
    });

    this.checkPermissionsAndLoadMap();
  }

  // Verifica el rol del usuario en Firestore
  checkUserRole(uid: string) {
    this.afs.doc(`users/${uid}`).valueChanges().subscribe((userData: any) => {
      if (userData) {
        this.isAdmin = userData.role === 'admin'; // Establece true si el rol es admin
      }
    });
  }

  async checkPermissionsAndLoadMap() {
    if (this.isRunningOnMobile()) {
      const hasPermission = await this.checkLocationPermission();

      if (hasPermission) {
        this.loadMapWithCapacitor();
      } else {
        console.warn('Permission denied or not granted');
      }
    } else {
      this.loadMapWithBrowserGeolocation();
    }
  }

  isRunningOnMobile(): boolean {
    return !!navigator.userAgent.match(/Android|iPhone|iPad|iPod/i);
  }

  async checkLocationPermission(): Promise<boolean> {
    const permission = await Geolocation.requestPermissions();
    return permission.location === 'granted';
  }

  async loadMapWithCapacitor() {
    (mapboxgl as any).accessToken = environment.accessToken;

    try {
      const position = await Geolocation.getCurrentPosition();
      const coords = [position.coords.longitude, position.coords.latitude] as [number, number];

      this.initializeMap(coords);
    } catch (error) {
      console.error('Error loading map or getting location:', error);
    }
  }

  loadMapWithBrowserGeolocation() {
    (mapboxgl as any).accessToken = environment.accessToken;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = [position.coords.longitude, position.coords.latitude] as [number, number];
        this.initializeMap(coords);
      },
      (error) => {
        console.error('Error getting browser location:', error);
      }
    );
  }

  initializeMap(coords: [number, number]) {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: coords,
      zoom: 14,
    });

    new mapboxgl.Marker().setLngLat(coords).addTo(this.map);
  }

  selectConductor() {
    this.router.navigate(['/conductor']);
  }

  selectPasajero() {
    this.router.navigate(['/pasajero']);
  }

  selectAdmin() {
    // Solo permite acceder a esta ruta si el usuario es admin
    if (this.isAdmin) {
      this.router.navigate(['/admin']);
    } else {
      alert('No tienes permisos para acceder a esta sección');
    }
  }

  goToProfile() {
    this.router.navigate(['/perfil']);
  }
}
