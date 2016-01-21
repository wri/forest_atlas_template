const config = {
  map: {
    id: 'map',
    options: {
      basemap: 'national-geographic',
      navigationMode: 'css-transforms',
      force3DTransforms: true,
      showAttribution: false,
      center: [-51, 17],
      fadeOnZoom: true,
      // slider: false,
      logo: false,
      zoom: 3
    }
  }
};

export const mapConfig = config.map;
