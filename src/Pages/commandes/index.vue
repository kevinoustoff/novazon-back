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
               
               class="form-control form-control-solid w-250px ps-15"
               placeholder="Rechercher une commande"
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
             <!--end::Export-->
             <!--begin::Add customer-->
             
             
             <!--end::Add customer-->
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
             :table-data="commands"
             :table-header="tableHeader"
             :enable-items-per-page-dropdown="true"
           >
             <template v-slot:cell-checkbox="{ row: command }">
               <div
                 class="form-check form-check-sm form-check-custom form-check-solid"
               >
                 <input
                   class="form-check-input"
                   type="checkbox"
                   :value="command.id"
                   v-model="checkedCustomers"
                 />
               </div>
             </template>
             <template v-slot:cell-commandRef="{ row: command }">
               {{ command.commandRef }}
             </template>
             <template v-slot:cell-customerfirstname="{ row: command }">
               <a href="#" class="text-gray-600 text-hover-primary mb-1">
                 {{ command.customerfirstname }}
               </a>
             </template>
             <template v-slot:cell-customerlastname="{ row: command }">
               {{ command.customerlastname }}
             </template>
             <template v-slot:cell-value="{ row: command }">
               {{
                 command.value
               }}
             </template>
             <template v-slot:cell-statue="{ row: command }">
              <span v-if="command.statue==='CommandStatus.pending'" class="badge badge-warning">En attente</span>
              <span v-else class="badge badge-success">Livré</span>
              
             </template>
             <template v-slot:cell-dateofCommand="{ row: command }">
               {{ `${new Date(command.dateofCommand).getDate()}-${new Date(command.dateofCommand).getMonth()}-${new Date(command.dateofCommand).getFullYear()}` }}
             </template>
             <template v-slot:cell-actions="{ row: command }">
              <a :href="`/commandes/details/${command.id}`" :id="command.id" class="btn btn-icon btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                </svg>
              </a>
              &nbsp;&nbsp;

              <a href="#" :id="command.id" class="btn btn-icon btn-danger">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
                  <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
                </svg>
              </a>

               <!--begin::Menu-->
               
               <!--end::Menu-->
             </template>
           </Datatable>
       </div>
     </div>

   </template>
   
   <script lang="ts">
   import { defineComponent, ref, onMounted } from "vue";
   import Datatable from "@/components/kt-datatable/Datatable.vue";
   
   import { MenuComponent } from "@/assets/ts/components";
   import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
   import { doc, getDoc, collection , getDocs} from 'firebase/firestore'
   import db from '../../firebase';
   
   export default defineComponent({
     props: ['coordinates'],
     name: "commandes-listing",
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
           name: "Référence de la commande",
           key: "commandRef",
           sortable: true,
         },
         {
           name: "Nom du client",
           key: "customerfirstname",
           sortable: true,
         },
         {
           name: "Prénoms du client",
           key: "customerlastname",
           sortable: true,
         },

         {
           name: "Montant",
           key: "value",
           sortable: true,
         },
         {
           name: "Statut",
           key: "statue",
           sortable: true,
         },
         {
           name: "Date de commande",
           key: "dateofCommand",
           sortable: true,
         },
         {
           name: "Actions",
           key: "actions",
         },
       ]);
   
       let commands = ref<[]>([]);
   
       
       let loading = ref(true);
       
       onMounted(() => {
         MenuComponent.reinitialization();
        
   
         setCurrentPageBreadcrumbs("Relais ", ["Apps", "Relais"]);
         getCommands(db);
       });
   
       
   
       
   
       const search = ref<string>("");
       
   
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
   
       const getCommands = async (db) =>{
         
         const collectionRef = await collection(db,'Commandes');
   
         console.log(collectionRef);
   
         getDocs(collectionRef)
         .then((querySnapshot) => {
           querySnapshot.forEach((doc) => {
             // doc.data() contains the data of each document
             console.log('Document ID:', doc.id);
             console.log('Document Data:', doc.data());

             let item = doc.data();
             item.id = doc.id;
             commands.value.push(item);
             // console.log(doc.data)
             
           });
           loading.value = false;
         })
         .catch((error) => {
           loading.value = false;
           console.error('Error getting documents from collection:', error);
         });
   
       };
   
       return {
         relais,
         
         tableHeader,
         commands,
         loading,
         getCommands,
         
         search,
        
         checkedCustomers,
         
       };
     },
   });
   </script>
   