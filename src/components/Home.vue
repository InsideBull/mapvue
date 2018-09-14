<template>
  <v-app id="inspire">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
            <v-expansion-panel>
                <v-expansion-panel-content>
                <div slot="header" class="item">Location</div>
                <v-card>
                   <v-container grid-list-md>
                      <v-flex xs12 sm12>
                        <div id="geocoder" class="geocoder"></div>
                      </v-flex> 
                   </v-container>  
                </v-card>
                </v-expansion-panel-content>
                <v-expansion-panel-content>
                <div slot="header" class="item">Style</div>
                <v-card>
                   <v-container grid-list-md>
                      <v-layout>
                        
                        <v-flex xs6 sm6>
                          <v-tooltip top>
                            <v-avatar
                              :size="100"
                              color="grey lighten-4"
                              slot="activator"
                              @click="streetStyle()"
                            >
                              <img src="../assets/street.png" alt="street">
                            </v-avatar>
                            <span>Street</span>
                          </v-tooltip>
                        </v-flex>

                        <v-flex xs6 sm6>
                          <v-tooltip top>
                            <v-avatar
                              :size="100"
                              color="grey lighten-4"
                              slot="activator"
                              @click="lightStyle()"
                            >
                              <img src="../assets/light.png" alt="light">
                            </v-avatar>
                            <span>Light</span>
                          </v-tooltip>
                        </v-flex>
                      </v-layout>
                      <v-layout>
                        <v-flex xs6 sm6>
                          <v-tooltip top>
                            <v-avatar
                              :size="100"
                              color="grey lighten-4"
                              slot="activator"
                              @click="darkStyle()"
                            >
                              <img src="../assets/dark.png" alt="dark">
                            </v-avatar>
                            <span>Dark</span>
                          </v-tooltip>
                        </v-flex>

                        <v-flex xs6 sm6>
                          <v-tooltip top>
                            <v-avatar
                              :size="100"
                              color="grey lighten-4"
                              slot="activator"
                              @click="basicStyle()"
                            >
                              <img src="../assets/basic.png" alt="basic">
                            </v-avatar>
                            <span>Basic</span>
                          </v-tooltip>
                        </v-flex>
                      </v-layout>
                      <v-layout>
                        <v-flex xs6 sm6>
                          <v-tooltip top>
                            <v-avatar
                              :size="100"
                              color="grey lighten-4"
                              slot="activator"
                              @click="brightStyle()"
                            >
                              <img src="../assets/bright.png" alt="bright" id="bright">
                            </v-avatar>
                            <span>Bright</span>
                          </v-tooltip>
                        </v-flex>
                        <v-flex xs6 sm6>
                          <v-tooltip top>
                            <v-avatar
                              :size="100"
                              color="grey lighten-4"
                              slot="activator"
                              @click="satelliteStyle()"
                            >
                              <img src="../assets/satellite.png" alt="satellite">
                            </v-avatar>
                            <span>Satellite</span>
                          </v-tooltip>
                        </v-flex>
                      </v-layout>
                   </v-container>  
                </v-card>
                </v-expansion-panel-content>
                <v-expansion-panel-content>
                <div slot="header" class="item">Size</div>
                <v-card>
                   <v-container grid-list-md>
                      <v-flex xs12 sm12>
                        <v-text-field solo label="Size" v-model="height"></v-text-field>
                        <v-text-field solo label="Size" v-model="width"></v-text-field>
                        <v-btn light color="primary" @click="retour()">Apply</v-btn>
                      </v-flex> 
                   </v-container>  
                </v-card>
                </v-expansion-panel-content>
                <v-expansion-panel-content>
                  <div slot="header" class="item">Marker</div>
                  <v-card>
                    <v-container grid-list-md>
                        <v-flex xs12 sm12>
                          <v-text-field solo label="Popup" id="popupmsg"></v-text-field>
                        </v-flex> 
                    </v-container>
                    <v-container grid-list-md v-if="test == true">
                        <v-flex xs12 sm12>
                          <v-text-field solo label="Longitude" id="markerLong"></v-text-field>
                          <v-text-field solo label="Latitude" id="markerLat"></v-text-field>
                          <div id="markerGeocoder" class="markerGeocoder" style="display: none"></div> 
                          <v-btn light color="primary" @click="markerLongLat()">Apply</v-btn>
                        </v-flex> 
                    </v-container>
                    <v-container grid-list-md v-else>
                      <v-flex xs12 sm12> 
                         <div id="markerGeocoder" class="markerGeocoder"></div>                  
                      </v-flex> 
                    </v-container>
                    <v-container grid-list-md>
                      <span class="" v-if="test == true"><a href="#" @click="markerFormFalse()">A partir d'une recherche</a></span>
                      <span class="" v-else><a href="#" @click="markerFormTrue()">A partir des coordonnées</a></span>
                    </v-container>    
                  </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-flex xs10 style="margin: 0 auto; margin-top: 80px;">
              <v-slider 
                v-model="slider"
                label="Zoom"
                max="20"
                @change="slideZoom()"
              ></v-slider>
              <div class="text-xs-center">
                <v-chip label outline color="#5ac4bb">{{slider}}</v-chip>
              </div>
            </v-flex>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="#5ac4bb"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3 centered">
        <span class="hidden-sm-and-down">Application</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="#5ac4bb" @click="active()">
        <span class="hidden-sm-and-down">Sign in</span>
      </v-btn>
      <v-dialog v-model="dialog" width="500">
        <v-card class="sign" light>
          <v-card-title
            class="title"
          >
            Sign in
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="Email" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Password" type="password" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm12>
                  <v-select
                    :items="['0-17', '18-29', '30-54', '54+']"
                    label="Age"
                    required
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#5ac4bb" flat @click.native="dialog = false">Close</v-btn>
            <v-btn color="#5ac4bb" flat @click.native="dialog = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height justify-center>
          <v-flex xs12 sm12>
            <v-card :height="hauteur" :width="longueur" style="margin: 0 auto" id="map">
            </v-card>
            <v-flex row wrap class="text-xs-center d-flex align-center">
              <v-tooltip top>
                <v-btn  fab
                        slot="activator"
                        light
                        color=""
                        fixed
                        bottom
                        left
                        v-model="drawer"
                        @click.stop="drawer = !drawer"
                >
                  <v-icon v-if="drawer">fullscreen</v-icon>
                  <v-icon v-else>fullscreen_exit</v-icon>
                </v-btn>
                <span v-if="drawer">Fullscreen</span>
                <span v-else>Exit fullscreen</span>
              </v-tooltip>
              <v-tooltip top>
                <v-btn  fab
                        light
                        slot="activator"
                        color=""
                        fixed
                        bottom
                        left
                        style="margin-left: 80px"
                        v-model="drawer"
                >
                    <v-icon>create</v-icon>
                </v-btn>
                <span>New project</span>
              </v-tooltip>
              <v-tooltip top>
                <v-btn  fab
                        light
                        slot="activator"
                        color=""
                        fixed
                        bottom
                        left
                        style="margin-left: 160px"
                        v-model="drawer"
                >
                    <v-icon>print</v-icon>
                </v-btn>
                <span>Print</span>
              </v-tooltip>
            </v-flex>
          </v-flex>
      </v-container>
    </v-content>
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click="dialog = !dialog"
      style="margin-bottom: 50px"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-footer height="auto" light class="pa-3">
      <v-spacer></v-spacer>
      <div id="copy">&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data(){
      return {
        height: '400px',
        width: '800px',
        dialog: false,
        drawer: null,
        hauteur: '400px',
        longueur: '800px',
        slider: 14,
        map: null,
        test: false
      }
    },
    mounted(){
      this.initMap();
    },
    methods: {
        slideZoom: function(){
          this.map.setZoom(this.slider);
        },
        markerFormTrue: function(){
          return this.test = true;
        },
        markerFormFalse: function(){
          return this.test = false;
        },
        setHeight: function(){
           return this.hauteur = this.height;
        },
        setWidth: function(){
           return this.longueur = this.width;
        },
        setSize: function(){
          var h = this.setHeight();
          var w = this.setWidth();
          var redefinir = this.setResize(h, w);
          return {
            h, w, redefinir
          }
        },
        setResize: function(height,width){
            var mapCanvas = document.getElementsByClassName('mapboxgl-canvas')[0];
            var ht = mapCanvas.style.height = this.height;
            var lt = mapCanvas.style.width = this.width;
            return {
              ht, lt
            }
        },
        retour: function(){
          return new Promise((resolve, reject) => {
            if(this.setSize()){
              var maps = this.map;
              setTimeout(function(){
                resolve(maps.resize())
              }, 250)
            }
            else{
              reject('error')
            }
          })
        },
        initMap: function(){
          mapboxgl.accessToken = 'pk.eyJ1IjoiYXJhZGltaXNvbiIsImEiOiJjamwzY2F5bGExdTAyM3ZvZGw0YWM4MXMzIn0.x-OlbsTxKnwonoGNOlgMYw'
        
          var maps = this.map = new mapboxgl.Map({
             container: 'map',
             style: 'mapbox://styles/aradimison/cjl52hnyv651o2sp90p0j7174',
             center: [-74.27684020995312, 40.339997333210334],
             zoom: 14,
             pitch: 0,
             bearing: 360
          });
          
          this.map.addControl(new mapboxgl.FullscreenControl());

          const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken
          });
          document.getElementById('geocoder').appendChild(geocoder.onAdd(this.map))

          var markerGeocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken
          });
          document.getElementById('markerGeocoder').appendChild(markerGeocoder.onAdd(this.map))

          //var img = this.imageToBase64('../assets/pin.svg');

          markerGeocoder.on('result', function(ev) {
              const element = document.createElement('div');
              element.className = 'marker';
              element.id = 'marker';
              element.style.width = '40px';
              element.style.height = '40px';
              //element.style.background = 'url('+img+')';
              
              const popup = new mapboxgl.Popup({ offset: 25 })
                 .setHTML(document.getElementById('popupmsg').value);
              
              new mapboxgl.Marker(element)
                .setLngLat(ev.result.geometry.coordinates)
                .setPopup(popup)
                .addTo(maps); 
          });

          this.map.addControl(new mapboxgl.GeolocateControl({
              positionOptions: {
                  enableHighAccuracy: true
              },
              trackUserLocation: true
          }));

        },
        markerLongLat: function(){
          const element = document.createElement('div');
              element.className = 'marker';
              element.style.width = '40px';
              element.style.height = '40px';

              const popup = new mapboxgl.Popup({ offset: 25 })
                .setHTML(document.getElementById('popupmsg').value);
              
              new mapboxgl.Marker(element)
                .setLngLat([document.getElementById('markerLong').value, document.getElementById('markerLat').value])
                .setPopup(popup)
                .addTo(this.map); 

              this.map.flyTo({
                  center: [
                      document.getElementById('markerLong').value,
                      document.getElementById('markerLat').value
                    ]
              });
        },
        darkStyle: function(){
          this.map.setStyle('mapbox://styles/mapbox/dark-v9');
        },
        brightStyle: function(){
          this.map.setStyle('mapbox://styles/mapbox/bright-v9');
        },
        lightStyle: function(){
          this.map.setStyle('mapbox://styles/mapbox/light-v9');
        },
        basicStyle: function(){
          this.map.setStyle('mapbox://styles/mapbox/basic-v9');
        },
        streetStyle: function(){
          this.map.setStyle('mapbox://styles/mapbox/streets-v9');
        },
        satelliteStyle: function(){
          this.map.setStyle('mapbox://styles/mapbox/satellite-v9');
        },
        imageToBase64: function(data){     
          var a = btoa(data);
          console.log(a)
        },
        storeJson: function(){
          let myfic = {
            name: '',
            popup: '',
            icon: '',
            coordinates: ''
          }
          let mynewfic = JSON.stringify(myfic, null, '\t');
        },
        active: function(){
          return this.dialog = true
        }
     },
    props: {
      source: String
    }
  }
</script>

<style>
#inspire{
  overflow: hidden;
}
.item{
  font-size: 20px;
}
#copy{
  color: black;
}
.mapboxgl-map{
  width: 80%; 
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
.geocoder{
  z-index:1;
  width:100%;
  margin: 0 auto;
}
#markerGeocoder{
  z-index:1;
  width:100%;
  margin: 0 auto;
}
.mapboxgl-ctrl-geocoder { 
  min-width:100%; 
}
.marker{
     background-image: url('../assets/pin.svg');    
}
.title {
  background-color: #5ac4bb;
  color: white;
}
</style>
