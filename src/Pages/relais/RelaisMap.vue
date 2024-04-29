<template>
    <div
      class="modal fade"
      id="kt_modal_relais_map"
      ref="addRelaisModalRef"
      tabindex="-1"
      aria-hidden="true"
    >
      <!--begin::Modal dialog-->
      <div class="modal-dialog modal-dialog-centered mw-850px">
        <!--begin::Modal content-->
        <div class="modal-content">
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_add_customer_header">
                    <!--begin::Modal title-->
                    <h2 class="fw-bolder">La carte des relais</h2>
                    <!--end::Modal title-->
                    <!--begin::Close-->
                    <div id="kt_modal_map_relais" class="btn btn-icon btn-sm btn-active-icon-primary" data-bs-dismiss="modal">
                        <!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->
                        <span class="svg-icon svg-icon-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black" />
                                <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black" />
                            </svg>
                        </span>
                        <!--end::Svg Icon-->
                    </div>
                    <!--end::Close-->
                </div>
        
          <!--end::Modal header-->
          <!--begin::Form-->
            <div class="modal-body py-10 px-lg-20">
                
                <!--begin::Scroll-->
                <div ref="mapRef" style="width: 100%; height: 80vh" />
                
                
                <!--end::Scroll-->
            </div>
          

          <!--end::Form-->
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref,onMounted,watch} from "vue";
  import GoogleMap from 'vue-google-maps-ui'
  import GoogleMapsLoader from 'google-maps-loader-helper';
  import db from "../../firebase"
  import { hideModal } from "@/core/helpers/dom";
  import Swal from "sweetalert2/dist/sweetalert2.js";
  import { doc, getDoc, collection , getDocs, setDoc,addDoc} from 'firebase/firestore'
  import $ from 'jquery'
  import jQuery from 'jquery'
  import 'sweetalert2/dist/sweetalert2.min.css';
  import VueTimepicker from 'vue3-timepicker/src/VueTimepicker.vue'
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";
  import { Loader } from '@googlemaps/js-api-loader'
  
  
  export default defineComponent({
    name: "relais-map",
    props: ['relais'],
    components: {
      VueTimepicker,
      GoogleMap
    },
    setup(props) {
      const zoom = ref(2);
      const hello = ref()
      const mapContainer = ref(null)
      const center = ref({ lat: 6.1319, lng: 1.2095 }) 
      const markers = ref<Array<Object>>([])
      const mapRef = ref(null)
      const loader = new Loader({ apiKey: 'AIzaSyBjvysdl6vVFc1Vlu5LHOBnuWIhqP_Gzpw' })
      
      let map = ref(null)

      const update = () =>{
        props.relais.forEach(rel => {

          if(rel.confirm === true){
            markers.value.push({position:{lat: rel.latitude, lng: rel.longitude},title:rel.relay_name})
          }
             
        });
      }
      
      watch(props.relais, (newValue, oldValue) => {
        const markerGroup = L.layerGroup();

        props.relais.forEach(rel => {
          if(rel.confirm === true){
            let marker =  new google.maps.Marker({
                    position: { lat: rel.latitude, lng: rel.longitude }, // Marker 2 coordinates
                    map: map.value,
                    title: rel.relay_name,

                });
          }
         
        })
             
        });


   
      onMounted(async ()=>{
        await loader.load()
          map.value = new google.maps.Map(mapRef.value, {
          center: center.value,
          zoom: 13
        })
        try {
        

        
        // Add markers to the map
        
      } catch (error) {
        
      }
        
        
        })

        

      

      return{
        zoom,
        mapContainer,
        center,
        markers,
        update,
        hello,
        mapRef
      }
    }
  });
  </script>
  