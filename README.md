
#  Earthquake data

- Visual analysis of earthquakes world wide using Javascript and HTML, updating daily using United States Geological Survey data

## Demo

[Click Here](https://gnimeth.github.io/Earthquake_data/) to view interactive map 

![App Screenshot](https://raw.githubusercontent.com/gnimeth/Earthquake_data/main/Output/Screenshot_20230212_063133.png)

## Roadmap

- Use the D3 library to read in samples.json from the [URL](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) 

- Using Leaflet, create a map that plots all the earthquakes from the dataset based on their longitude and latitude
    - Data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.
    - Include popups that provide additional information about the earthquake when its associated marker is clicked

![App Screenshot](https://raw.githubusercontent.com/gnimeth/Earthquake_data/main/Output/Screenshot_20230212_063056.png)

- Create a legend

- Deploy app to a free static page




## Acknowledgements
Dataset created by [the United States Geological Survey](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)  