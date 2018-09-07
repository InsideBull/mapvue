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
                        <v-text-field solo label="Search" ></v-text-field>
                      </v-flex> 
                   </v-container>  
                </v-card>
                </v-expansion-panel-content>
                <v-expansion-panel-content>
                <div slot="header" class="item">Style</div>
                <v-card>
                   <v-container grid-list-md>
                      <v-flex xs12>
                        <v-select
                          :items="states"
                          v-model="e1"
                          menu-props="auto"
                          label="Select"
                          hide-details
                          prepend-icon="map"
                          single-line
                        ></v-select>
                      </v-flex> 
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
                        <v-btn light color="primary" @click="setSize()">Apply</v-btn>
                      </v-flex> 
                   </v-container>  
                </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-flex xs10 style="margin: 0 auto; margin-top: 80px;">
              <v-slider 
                v-model="slider"
                label="Zoom"
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
      <v-btn color="#5ac4bb">
        <span class="hidden-sm-and-down">Sign in</span>
      </v-btn>
      <v-btn icon large>
        <v-icon>avatar</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height justify-center>
          <v-flex xs12 sm12>
            <v-card :height="hauteur" :width="longueur" style="margin: 0 auto">
                <v-responsive :aspect-ratio="16/9" :height="hauteur" :width="longueur">
                    <img src="" alt="">
                </v-responsive>
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
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data(){
      return {
        height: '400px',
        width: '800px',
        dialog: false,
        drawer: null,
        hauteur: '400px',
        longueur: '800px',
        slider: 14
      }
    },
    mounted(){
  
    },
    methods: {
        setHeight: function(){
           return this.hauteur = this.height
        },
        setWidth: function(){
           return this.longueur = this.width
        },
        setSize: function(){
          var h = this.setHeight();
          var w = this.setWidth()
          return {
            h, w
          }
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
</style>
