declare module 'topojson-client' {
  import { Feature, FeatureCollection, Geometry } from 'geojson';

  export function feature(
    topology: any,
    object: any
  ): Feature<Geometry> | FeatureCollection<Geometry>;
} 