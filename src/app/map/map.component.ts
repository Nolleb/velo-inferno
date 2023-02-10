import { Component, ElementRef, Input, OnInit, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  @Input() coords:number[][] | undefined
  @Input() coordsSegment:number[][] | undefined
  @Input() indexSegment!: number
  @Input() isHovered!: boolean

	options = {
		zoom: 5,
    maxZoom : 18,
		center: L.latLng([ 41.5, 12.5 ]),
    layers: [L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {})],
  }

  coordsLatLng: L.LatLngTuple[] = []
  coordsSegmentLatLng: L.LatLngTuple[] = []

  constructor(private elem: ElementRef) {
  }

  ngOnInit(): void {
    this.coordsLatLng = this.coords as L.LatLngTuple[]
    this.coordsSegmentLatLng = this.coordsSegment as L.LatLngTuple[]
  }

  ngOnChanges(changes: SimpleChanges) {
    let segments = this.elem.nativeElement.querySelectorAll('.segment');
    [...segments].map((segment: any, index) =>{
      if(this.isHovered && index === this.indexSegment) {
        segment.attributes['stroke-opacity'].value = .4
      } else {
        segment.attributes['stroke-opacity'].value = 0
      }
    })
  }

  onMapReady(map: L.Map) {
    this.coordsSegment?.map((it: any) => {
      let latLnTuple = it as L.LatLngTuple[]
      let vector = L.polyline(latLnTuple, {
        stroke: true,
        weight: 25,
        dashArray: '',
        opacity: 0,
        color: '#ff0000',
        className: 'segment'
      })
      vector.addTo(map)
    })

    const vector = L.polyline(this.coordsLatLng)
    vector.setStyle({
      color: '#ff0000',
      weight: 4
    })
    vector.addTo(map)

    const bounds = new L.LatLngBounds(this.coordsLatLng)
    map.fitBounds(bounds)
  }
}
