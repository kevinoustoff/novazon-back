<template>
    <div
      class="modal fade"
      id="kt_modal_add_customer"
      ref="addRelaisModalRef"
      tabindex="-1"
      aria-hidden="true"
    >
      <!--begin::Modal dialog-->
      <div class="modal-dialog modal-dialog-centered mw-650px">
        <!--begin::Modal content-->
        <div class="modal-content">
          <!--begin::Modal header-->
        
          <!--end::Modal header-->
          <!--begin::Form-->
          <form class="form" action="#" id="kt_modal_add_customer_form" data-kt-redirect="../../demo1/dist/apps/customers/list.html">
                <!--begin::Modal header-->
                <div class="modal-header" id="kt_modal_add_customer_header">
                    <!--begin::Modal title-->
                    <h2 class="fw-bolder">Ajouter un relais</h2>
                    <!--end::Modal title-->
                    <!--begin::Close-->
                    <div id="kt_modal_add_customer_close" class="btn btn-icon btn-sm btn-active-icon-primary" data-bs-dismiss="modal">
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
                <!--begin::Modal body-->
                <div class="modal-body py-10 px-lg-17">
                    <!--begin::Scroll-->
                    <div class="scroll-y me-n7 pe-7" id="kt_modal_add_customer_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_customer_header" data-kt-scroll-wrappers="#kt_modal_add_customer_scroll" data-kt-scroll-offset="300px">
                        <!--begin::Input group-->
                        <div class="fv-row mb-7">
                            <!--begin::Label-->
                            <label class="required fs-6 fw-bold mb-2">Nom du gérant</label>
                            <!--end::Label-->
                            <!--begin::Input-->
                            <input type="text" class="form-control form-control-solid" placeholder="" name="name" v-model="formData.last_name" />
                            <!--end::Input-->
                        </div>
                        <!--end::Input group-->
                        <!--begin::Input group-->
                        <div class="fv-row mb-7">
                            <!--begin::Label-->
                            <label class="fs-6 fw-bold mb-2">
                                <span class="required">Prénoms du gérant</span>
                                <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Email address must be active"></i>
                            </label>
                            <!--end::Label-->
                            <!--begin::Input-->
                            <input type="text" v-model="formData.first_name" class="form-control form-control-solid" placeholder="" name="email" />
                            <!--end::Input-->
                        </div>
                        <!--end::Input group-->
                        <!--begin::Input group-->
                        <div class="fv-row mb-7">
                            <!--begin::Label-->
                            <label class="fs-6 fw-bold mb-2">Nom du relais</label>
                            <!--end::Label-->
                            <!--begin::Input-->
                            <input type="text" v-model="formData.relay_name" class="form-control form-control-solid" placeholder="" name="description" />
                            <!--end::Input-->
                        </div>
                        <div class="fv-row mb-7">
                            <!--begin::Label-->
                            <label class="fs-6 fw-bold mb-2">Numéro de téléphone</label>
                            <!--end::Label-->
                            <!--begin::Input-->
                            <input type="text" v-model="formData.numero_telephone" class="form-control form-control-solid" placeholder="" name="description"/>
                            <!--end::Input-->
                        </div>

                        <div class="d-flex flex-column mb-7 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2">
                    <span class="required">Quartiers</span>

                    <i
                      class="fas fa-exclamation-circle ms-1 fs-7"
                      data-bs-toggle="tooltip"
                      title="Country of origination"
                    ></i>
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-select
                    single
                    placeholder="Select"
                    v-model="formData.quartier"
                  >
                    <el-option
                      v-for="item in quartiers"
                      :key="item.nom"
                      :label="item.nom"
                      :value="item.nom"
                    />
                  </el-select>
                  <!--end::Input-->
                </div>

                        <button type="button" class="btn btn-primary" @click="getLocation()" >Obtenir la localisation</button>

                        <div class="fv-row mb-7">
                            <!--begin::Label-->
                            <label class="fs-6 fw-bold mb-2">Latitude</label>
                            <!--end::Label-->
                            <!--begin::Input-->
                            <input type="text" v-model="formData.latitude" class="form-control form-control-solid"  placeholder="" disabled name="description"/>
                            <!--end::Input-->
                        </div>

                        <div class="fv-row mb-7">
                            <!--begin::Label-->
                            <label class="fs-6 fw-bold mb-2">Longitude</label>
                            <!--end::Label-->
                            <!--begin::Input-->
                            <input type="text" v-model="formData.longitude" class="form-control form-control-solid" disabled placeholder="" name="description"/>
                            <!--end::Input-->
                        </div>
                        <div
                          class="fw-bolder fs-3 rotate collapsible mb-7 h2"
                          data-bs-toggle="collapse"
                          href="#kt_modal_add_customer_billing_info"
                          role="button"
                          aria-expanded="false"
                          aria-controls="kt_customer_view_details"
                        >
                          Horaires
                          <span class="ms-2 rotate-180">
                            <span class="svg-icon svg-icon-3">
                              <inline-svg src="media/icons/duotune/arrows/arr072.svg" />
                            </span>
                          </span>
                        </div>
                        <div
                          id="kt_modal_add_customer_billing_info"
                          class="collapse show"
                        >
                          

                          

                          <div class="row mb-2" v-for="(day, index) in formData.scheduling">
                            <h2>{{ daysOfWeek[index] }}</h2>
                            <div  class="col-lg-6">
                              <!--begin::Label-->
                              <label class="fs-6 fw-bold mb-2">Heure d'ouverture</label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <VueTimepicker v-model="day.start_time"></VueTimepicker>
                            <!--end::Input-->
                            </div>
                            <!--begin::Input group-->
                            <div class="col-lg-6">
                              <!--begin::Label-->
                              <label class="fs-6 fw-bold mb-2">Heure de cloture</label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <VueTimepicker v-model="day.end_time"></VueTimepicker>
                              <!--end::Input-->
                            </div>
                          </div>
                          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button type="button" id="add_day" data-dismiss="modal" aria-label="Close" :disabled="isButtonDisabled" class="btn btn-primary btn pull-right me-3" @click="addDay()" ref="addDayss">
                              Ajouter un jour
                            </button>
                          </div>
                          

                          <!--end::Input group-->
                        </div>


                        <div class="fv-row mb-7"> 
                            <div class="form-check">
                                <input v-model="formData.gmanager_signature" class="form-check-input" type="checkbox" v id="flexCheckDefault" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    Signature du manager
                                </label>
                            </div>
                        </div>
                        <div class="fv-row mb-7"> 
                            <div class="form-check">
                                <input v-model="formData.confirm" class="form-check-input" type="checkbox" v id="flexCheckDefault" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    Confirmer l'inscription
                                </label>
                            </div>
                        </div>
                        
                    </div>
                    <!--end::Scroll-->
                </div>
                <!--end::Modal body-->
                <!--begin::Modal footer-->
                <div class="modal-footer flex-center">
                    <!--begin::Button-->
                    <button type="reset" id="kt_modal_add_customer_cancel" data-dismiss="modal" aria-label="Close" class="btn btn-light me-3">Annuler</button>
                    <!--end::Button-->
                    <!--begin::Button-->
                    <button type="button" id="kt_modal_add_customer_submit" @click="saveRelais()" class="btn btn-primary">
                        <span class="indicator-label">Soumettre</span>
                        <span class="indicator-progress">Please wait...
                        <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                    </button>
                    <!--end::Button-->
                </div>
                <!--end::Modal footer-->
            </form>
          <!--end::Form-->
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref,onMounted} from "vue";
  import db from "../../firebase"
  import { hideModal } from "@/core/helpers/dom";
  import Swal from "sweetalert2/dist/sweetalert2.js";
  import { doc, getDoc, collection , getDocs, setDoc,addDoc} from 'firebase/firestore'
  import $ from 'jquery'
  import jQuery from 'jquery'
  import 'sweetalert2/dist/sweetalert2.min.css';
  import VueTimepicker from 'vue3-timepicker/src/VueTimepicker.vue'
  
  
  export default defineComponent({
    name: "add-relais-modal",
    components: {
      VueTimepicker,
     
    },
    setup() {
      const formRef = ref<null | HTMLFormElement>(null);
      const mySelect = ref<null | HTMLFormElement>(null);
      const addRelaisModalRef = ref<null | HTMLElement>(null);
      const addDayss = ref<null | HTMLElement>(null);
      const quartiers = ref([]);
      const loading = ref<boolean>(false);
      const daysOfWeek = ref(["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]);
      const isButtonDisabled = ref<boolean>(false);
      const formData = ref({

        first_name: "",
        last_name: "",
        relay_name: "",
        numero_telephone: "",
        latitude: "",
        longitude: "",
        quartier: null,
        gmanager_signature: false,
        scheduling: [
            {start_time: {HH: '08', mm: '00'}, end_time: {HH: '09', mm: '00'}},
            {start_time: {HH: '08', mm: '00'}, end_time: {HH: '09', mm: '00'}},
        ],
        confirm: false   
      });
  
      const rules = ref({
        name: [
          {
            required: true,
            message: "Customer name is required",
            trigger: "change",
          },
        ],
        email: [
          {
            required: true,
            message: "Customer email is required",
            trigger: "change",
          },
        ],
        addressLine: [
          {
            required: true,
            message: "Address 1 is required",
            trigger: "change",
          },
        ],
        town: [
          {
            required: true,
            message: "Town is required",
            trigger: "change",
          },
        ],
        state: [
          {
            required: true,
            message: "State is required",
            trigger: "change",
          },
        ],
        postCode: [
          {
            required: true,
            message: "Post code is required",
            trigger: "change",
          },
        ],
      });
    
      onMounted(() => {
        getQuartiers();
    });
    const getLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
            // Retrieve latitude and longitude
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            // Display the location data
            formData.value.longitude = longitude;
            formData.value.latitude =  latitude;

            // You can use this data for various purposes, such as displaying it on a map or using it in your application.
        }, function (error) {
            // Handle errors, such as permission denied or unable to retrieve location
            console.error("Error getting location:", error.message);
            });
        }

        
    }

    const saveRelais = async () => {
        const collectionRef = await collection(db,'Relais');
        const button = document.getElementById('kt_modal_add_customer_submit');

        button.setAttribute("data-kt-indicator", "on");
        await addDoc(collectionRef, formData.value).then(
            () => {
                button.removeAttribute("data-kt-indicator");
                hideModal(addRelaisModalRef.value);
                $("#kt_modal_add_customer_cancel").click();
                Swal.fire({
                text: "Vous avez ajouté avec succès un nouveau relais!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, d'accord",
                position: 'top-end',
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then((result) => {
                hideModal(addRelaisModalRef.value);

                console.log(location.reload)
                if(result.isConfirmed) {
                   location.reload()
                }
              });
              
              
            }
        );
    }

    const getQuartiers = async () =>{
      
      
      const collectionRef = await collection(db,'Quartiers');
      getDocs(collectionRef)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() contains the data of each document
          console.log('Document ID:', doc.id);
          console.log('Document Data:', doc.data());
          quartiers.value.push(doc.data())
          // console.log(doc.data)
          
        });
        console.log(quartiers)
      })
      .catch((error) => {
        console.error('Error getting documents from collection:', error);
      })

    };
    
  
      const submit = () => {
        if (!formRef.value) {
          return;
        }
  
        formRef.value.validate((valid) => {
          if (valid) {
            loading.value = true;
  
            setTimeout(() => {
              loading.value = false;
  
              Swal.fire({
                text: "Form has been successfully submitted!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "D'accord!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then((result) => {
                hideModal(addRelaisModalRef.value);

                console.log(location.reload)
                if(result.isConfirmed) {
                   location.reload()
                }
              });
            }, 2000);
          } else {
            Swal.fire({
              text: "Oops veuillez réessayer quelque chose s'est mal passée.Veuillez réessayer.",
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "D'accord!",
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
            return false;
          }
        });
      };

      const addDay = () =>{
        formData.value.scheduling.push(
          {start_time: {HH: null, mm: null}, end_time: {HH: null, mm: null}},
        )

        if(formData.value.scheduling.length == 7){
          isButtonDisabled.value = true;
        }
      };
  
      return {
        daysOfWeek,
        formData,
        rules,
        submit,
        formRef,
        loading,
        addRelaisModalRef,
        quartiers,
        getQuartiers,
        getLocation,
        saveRelais,
        addDay,
        addDayss,
        isButtonDisabled
      };
    },
  });
  </script>
  