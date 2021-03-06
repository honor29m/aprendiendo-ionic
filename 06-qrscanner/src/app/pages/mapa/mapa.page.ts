import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var mapboxsearch: any;
declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit, AfterViewInit {

  latitud: number;
  longitud: number;

  constructor(
    private router: ActivatedRoute 
  ) { }

  ngOnInit() {

    let geo:any = this.router.snapshot.paramMap.get('geo');

    geo = geo.substring(4);
    geo = geo.split(',');

    this.latitud = Number(geo[0]);
    this.longitud = Number(geo[1]);
  }

  ngAfterViewInit() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaG9ub3IyOW0iLCJhIjoiY2w0aXRjNnRhMDFtaTNicTJoaHdzb3VreiJ9.keKE-3AXDWnKvzLah_-g4w';
    const map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v10',
      center: [this.longitud, this.latitud],
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      container: 'map',
      antialias: true
    });

    map.on('load', () => {

      map.resize();

      new mapboxgl.Marker()
      .setLngLat([this.longitud,this.latitud])
      .addTo(map);

      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
      ).id;

      // The 'building' layer in the Mapbox Streets
      // vector tileset contains building height data
      // from OpenStreetMap.
      map.addLayer(
        {
          'id': 'add-3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
            'fill-extrusion-color': '#aaa',

            // Use an 'interpolate' expression to
            // add a smooth transition effect to
            // the buildings as the user zooms in.
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        },
        labelLayerId
      );
    });

    // Add the control to the map.
    // map.addControl(
    //   new MapboxGeocoder({
    //     accessToken: mapboxgl.accessToken,
    //     mapboxgl: mapboxgl
    //   })
    // );
  }

}
