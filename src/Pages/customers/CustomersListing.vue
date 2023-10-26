<template>
    <div class="card">
       <div class="card-header border-0 pt-6">
         <!--begin::Card title-->
         <div class="card-title">
           <!--begin::Search-->
           <div class="d-flex align-items-center position-relative my-1">
             <span class="svg-icon svg-icon-1 position-absolute ms-6">
               <inline-svg src="media/icons/duotune/general/gen021.svg" />
             </span>
             <input
               type="text"
               v-model="search"
               @input="searchItems()"
               class="form-control form-control-solid w-250px ps-15"
               placeholder="Rechercher un client"
             />
           </div>
           <!--end::Search-->
         </div>
         <!--begin::Card title-->
         <!--begin::Card toolbar-->
         <div class="card-toolbar">
           <!--begin::Toolbar-->
           <div
             v-if="checkedCustomers.length === 0"
             class="d-flex justify-content-end"
             data-kt-customer-table-toolbar="base"
           >
             <!--begin::Export-->
             <button
               type="button"
               class="btn btn-light-primary me-3"
               data-bs-toggle="modal"
               data-bs-target="#kt_customers_export_modal"
             >
               <span class="svg-icon svg-icon-2">
                 <inline-svg src="media/icons/duotune/arrows/arr078.svg" />
               </span>
               Export
             </button>
             <!--end::Export-->
           </div>
           <!--end::Toolbar-->
           <!--begin::Group actions-->
           <div
             v-else
             class="d-flex justify-content-end align-items-center"
             data-kt-customer-table-toolbar="selected"
           >
             <div class="fw-bolder me-5">
               <span class="me-2">{{ checkedCustomers.length }}</span
               >Selected
             </div>
             <button
               type="button"
               class="btn btn-danger"
               @click="deleteFewCustomers()"
             >
               Delete Selected
             </button>
           </div>
           <!--end::Group actions-->
           <!--begin::Group actions-->
           <div
             class="d-flex justify-content-end align-items-center d-none"
             data-kt-customer-table-toolbar="selected"
           >
             <div class="fw-bolder me-5">
               <span
                 class="me-2"
                 data-kt-customer-table-select="selected_count"
               ></span
               >Selected
             </div>
             <button
               type="button"
               class="btn btn-danger"
               data-kt-customer-table-select="delete_selected"
             >
               Delete Selected
             </button>
           </div>
           <!--end::Group actions-->
         </div>
         <!--end::Card toolbar-->
       </div>
       <div class="card-body pt-0">
           <div v-if="loading === true" class="text-center">
             <div class="spinner-border" role="status">
               <span class="visually-hidden">Loading...</span>
             </div>
           </div>
           <Datatable
             v-else
             :table-data="customers"
             :table-header="tableHeader"
             :enable-items-per-page-dropdown="true"
           >
             <template v-slot:cell-checkbox="{ row: customer }">
               <div
                 class="form-check form-check-sm form-check-custom form-check-solid"
               >
                 <input
                   class="form-check-input"
                   type="checkbox"
                   :value="customer.id"
                   v-model="checkedCustomers"
                 />
               </div>
             </template>
             <template v-slot:cell-id="{ row: customer }">
               {{ customer.id }}
             </template>
             <template v-slot:cell-nom="{ row: customer }">
               <a href="#" class="text-gray-600 text-hover-primary mb-1">
                 {{ customer.nom }}
               </a>
             </template>
             <template v-slot:cell-prenom="{ row: customer }">
               {{ customer.prenom }}
             </template>
             <template v-slot:cell-solde="{ row: customer }">
               {{
                 customer.solde
               }}
             </template>
             <template v-slot:cell-typeAbonnement="{ row: customer }">
               {{ getSubscriptionType(customer.typeAbonnement) }}
             </template>
             <template v-slot:cell-username="{ row: customer }">
               {{ customer.username}}
             </template>
             <template v-slot:cell-actions="{ row: customer }">
               <a
                 href="#"
                 class="btn btn-sm btn-light btn-active-light-primary"
                 data-kt-menu-trigger="click"
                 data-kt-menu-placement="bottom-end"
                 data-kt-menu-flip="top-end"
                 >Actions
                 <span class="svg-icon svg-icon-5 m-0">
                   <inline-svg src="media/icons/duotune/arrows/arr072.svg" />
                 </span>
               </a>
               <!--begin::Menu-->
               <div
                 class="
                   menu
                   menu-sub
                   menu-sub-dropdown
                   menu-column
                   menu-rounded
                   menu-gray-600
                   menu-state-bg-light-primary
                   fw-bold
                   fs-7
                   w-125px
                   py-4
                 "
                 data-kt-menu="true"
               >
                 <!--begin::Menu item-->
                 <div class="menu-item px-3">
                   <router-link
                     to="/apps/customers/customer-details"
                     class="menu-link px-3"
                     >View</router-link
                   >
                 </div>
                 <!--end::Menu item-->
                 <!--begin::Menu item-->
                 <div class="menu-item px-3">
                   <a @click="deleteCustomer(customer.id)" class="menu-link px-3"
                     >Delete</a
                   >
                 </div>
                 <!--end::Menu item-->
               </div>
               <!--end::Menu-->
             </template>
           </Datatable>
       </div>
     </div>
   
     
     <!-- <AddRelaisModal></AddRelaisModal> -->
   </template>
   
   <script lang="ts">
   import { defineComponent, ref, onMounted } from "vue";
   import Datatable from "@/components/kt-datatable/Datatable.vue";
   import { MenuComponent } from "@/assets/ts/components";
   import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
   import { doc, getDoc, collection , getDocs} from 'firebase/firestore'
   import db from '../../firebase';
   interface IRelais {
     id: number,
     key: number;
     first_name: string;
     last_name: string;
     relay_name: string;
     quartier: string;
     numero_telephone: string;
     latitude: string;
     longitude: string;
     gmanager_signature: boolean
   }
   
   export default defineComponent({
     name: "customers-listing",
     components: {
       Datatable,
       
     },
     setup() {
   
       const relais  = ref([]);
       const checkedCustomers = ref([]);
       
       const tableHeader = ref([
         {
           key: "checkbox",
         },
         {
           name: "Nom",
           key: "nom",
           sortable: true,
         },
         {
           name: "Prénom",
           key: "prenom",
           sortable: true,
         },
         {
           name: "solde",
           key: "solde",
           sortable: true,
         },
         {
           name: "E-mail",
           key: "username",
           sortable: true,
         },
         {
           name: "Type d'abonnement",
           key: "typeAbonnement",
           sortable: true,
         },
         {
           name: "Actions",
           key: "actions",
         },
       ]);
   
       let frelais = ref<[]>([]);
   
       const customers = ref<[]>([]);
       let loading = ref(true);
       const initCustomers = ref<Array<IRelais>>([]);
       onMounted(() => {
         MenuComponent.reinitialization();
         
        setCurrentPageBreadcrumbs("Liste des clients", ["Apps", "Clients"]);
         initCustomers.value.splice(0, customers.value.length, ...customers.value);
   
         setCurrentPageBreadcrumbs("Relais ", ["Apps", "Relais"]);
         getCustomers(db);
       });
   
       const deleteFewCustomers = () => {
         checkedCustomers.value.forEach((item) => {
           deleteCustomer(item);
         });
         checkedCustomers.value.length = 0;
       };
   
       const deleteCustomer = (id) => {
         for (let i = 0; i < customers.value.length; i++) {
           if (customers.value[i].id === id) {
             customers.value.splice(i, 1);
           }
         }
       };
   
       const search = ref<string>("");
       const searchItems = () => {
         customers.value.splice(0, customers.value.length, ...initCustomers.value);
         if (search.value !== "") {
           let results: Array<IRelais> = [];
           for (let j = 0; j < customers.value.length; j++) {
             if (searchingFunc(customers.value[j], search.value)) {
               results.push(customers.value[j]);
             }
           }
           customers.value.splice(0, customers.value.length, ...results);
         }
       };
   
       const searchingFunc = (obj, value): boolean => {
         for (let key in obj) {
           if (!Number.isInteger(obj[key]) && !(typeof obj[key] === "object")) {
             if (obj[key].indexOf(value) != -1) {
               return true;
             }
           }
         }
         return false;
       };

       const getSubscriptionType = (str) =>{
            switch(str){
                case "SubscriptionType.basic":
                    return "basique";
            }

       }
   
       const getCustomers = async (db) =>{
         
         const collectionRef = await collection(db,'Customers');
   
         console.log(collectionRef);
   
         getDocs(collectionRef)
         .then((querySnapshot) => {
           querySnapshot.forEach((doc) => {
             // doc.data() contains the data of each document
             console.log('Document ID:', doc.id);
             console.log('Document Data:', doc.data());
             customers.value.push(doc.data())
             // console.log(doc.data)
             loading.value = false;
           });
         })
         .catch((error) => {
           console.error('Error getting documents from collection:', error);
         });
         // collectionRef
         //   .get()
         //   .then((querySnapshot) => {
         //     querySnapshot.forEach((doc) => {
         //       // doc.data() is the data of each document
         //       console.log(doc.id, ' => ', doc.data());
         //     });
         //   })
         //   .catch((error) => {
         //     console.error('Error getting documents: ', error);
         //   });
   
       };
   
       return {
         relais,
         customers,
         tableHeader,
         frelais,
         loading,
         getCustomers,
         deleteCustomer,
         getSubscriptionType,
         search,
         searchItems,
         checkedCustomers,
         deleteFewCustomers,
       };
     },
   });
   </script>
   