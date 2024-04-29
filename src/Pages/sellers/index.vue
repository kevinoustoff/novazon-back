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
               class="form-control form-control-solid w-250px ps-15"
               placeholder="Rechercher un vendeur"
             />
           </div>
           <!--end::Search-->
         </div>
         <!--begin::Card title-->
         <!--begin::Card toolbar-->
         <div class="card-toolbar">
          <div class="d-flex justify-content-end" data-kt-customer-table-toolbar="base">
            <!--begin::Filter-->
            
            
          </div>
          <!--end::Toolbar-->
          <!--begin::Group actions-->
          <div class="d-flex justify-content-end align-items-center d-none" data-kt-customer-table-toolbar="selected">
            <div class="fw-bolder me-5">
            <span class="me-2" data-kt-customer-table-select="selected_count"></span>Selected</div>
            <button type="button" class="btn btn-danger" data-kt-customer-table-select="delete_selected">Delete Selected</button>
          </div>
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
             :key="componentKey"
             v-else
             :table-data="sellers"

             :table-header="tableHeader"
             :enable-items-per-page-dropdown="true"
           >
             <template v-slot:cell-checkbox="{ row: seller }">
               <div
                 class="form-check form-check-sm form-check-custom form-check-solid"
               >
                 <input
                   class="form-check-input"
                   type="checkbox"
                   :value="seller.id"
                   v-model="checkedCustomers"
                 />
               </div>
             </template>
             <template v-slot:cell-nom="{ row: seller }">
               {{ seller.nom }}
             </template>
             <template v-slot:cell-prenom="{ row: seller }">
               {{ seller.prenom }}
             </template>
             
             <template v-slot:cell-phoneNumber="{ row: seller }">
               {{ seller.phoneNumber }}
             </template>
             <template v-slot:cell-username="{ row: seller }">
               {{ seller.username }}
             </template>
             <template v-slot:cell-sellerType="{ row: seller }">
              <!-- <span v-if="command.statue==='CommandStatus.pending'" class="badge badge-warning">En attente</span>
              <span v-else-if="command.statue==='CommandStatus.Commande_recue'" class="badge badge-info">Commande reçue</span>
              <span v-else-if="command.statue==='CommandStatus.livre_au_client'" class="badge badge-success">Livré au client</span>
              <span v-else-if="command.statue==='CommandStatus.livre_en_relais'" class="badge badge-info">Livré en relais</span>
              <span v-else-if="command.statue==='CommandStatus.expedie_par_le_vendeur'" class="badge badge-primary">Expédié par le vendeur</span>
              <span v-else-if="command.statue==='CommandStatus.en_entrepot'" class="badge badge-primary">En entrepot</span>
              <span v-else-if="command.statue==='CommandStatus.En_cours_de_preparation'" class="badge badge-warning">En cours de préparation</span>
              <span v-else class="badge badge-success">Livré</span> -->
              {{ seller.sellertype }}
             </template>
            
             <template v-slot:cell-actions="{ row: seller }">
              <a href="#" :id="seller.id" class="btn btn-icon btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                </svg>
              </a>
              &nbsp;&nbsp;

              <a href="#" :id="seller.id" class="btn btn-icon btn-danger">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
                  <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
                </svg>
              </a>
              &nbsp;&nbsp;
              <a href="#" :id="seller.id" class="btn btn-icon btn-success" >
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" fill="currentColor" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <path d="M448 192V77.25c0-8.49-3.37-16.62-9.37-22.63L393.37 9.37c-6-6-14.14-9.37-22.63-9.37H96C78.33 0 64 14.33 64 32v160c-35.35 0-64 28.65-64 64v112c0 8.84 7.16 16 16 16h48v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h48c8.84 0 16-7.16 16-16V256c0-35.35-28.65-64-64-64zm-64 256H128v-96h256v96zm0-224H128V64h192v48c0 8.84 7.16 16 16 16h48v96zm48 72c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"/>
                </svg>
              </a>

               <!--begin::Menu-->
               
               <!--end::Menu-->
             </template>
           </Datatable>
       </div>
     </div>
</template>
<script>
    import Datatable from "@/components/kt-datatable/Datatable.vue";
    import { doc, getDoc, collection , getDocs,query,where} from 'firebase/firestore'
    import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
    import db from '../../firebase';
    import { MenuComponent } from "@/assets/ts/components";
    import { defineComponent, ref, onMounted, computed } from "vue";
    export default defineComponent({
     props: ['coordinates'],
     name: "sellers-listing",
     components: {
       Datatable
     },
     setup() {
       const sellers = ref([])
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
           name: "Prenom",
           key: "prenom",
           sortable: true,
         },
         {
           name: "Numéro de téléphone",
           key: "phoneNumber",
           sortable: true,
         },
         {
           name: "E-mail",
           key: "username",
           sortable: true,
         },
         {
           name: "Type de vendeur",
           key: "sellerType",
           sortable: true,
         },
         {
           name: "Actions",
           key: "actions",
         },
       ]);
       const componentKeyPdf = ref(0);
       let commands = ref([]);
         
       let commandCom = computed(() => {
        return commands.value
      })
       
       let loading = ref(true);
       
       onMounted(() => {
         MenuComponent.reinitialization();
         setCurrentPageBreadcrumbs("Vendeurs ", ["Apps", "Vendeurs"]);
         getSellers(db);
         
       });
   
       
       const divToPrint = ref();
       const componentKey = ref(0)
       const commandeToPr = ref(null);
       const checkedCustomers = ref([]);
       
       
       const print = async (command) =>{
        componentKeyPdf.value++;
        commandeToPr.value= command        
       }
       
       const getSellers = async (db) =>{
         
         const collectionRef = await collection(db,'Sellers');
         getDocs(collectionRef)
         .then((querySnapshot) => {
           querySnapshot.forEach((doc) => {    
             let item = doc.data();
             item.id = doc.id;
             sellers.value.push(item);
             
           });
           loading.value = false;
         })
         .catch((error) => {
           loading.value = false;
           console.error('Error getting documents from collection:', error);
         });
        
       };
   
       return {
         
         sellers,
         tableHeader,
         loading,
         getSellers,
         checkedCustomers,
         componentKeyPdf,
         componentKey,
         checkedCustomers
         
       };
     },
   });
</script>

<style>

</style>