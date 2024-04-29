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
               @keyup="recherche()"
               class="form-control form-control-solid w-250px ps-15"
               placeholder="Rechercher une commande"
             />
           </div>
           <!--end::Search-->
         </div>
         <!--begin::Card title-->
         <!--begin::Card toolbar-->
         <div class="card-toolbar">
          <div class="d-flex justify-content-end" data-kt-customer-table-toolbar="base">
            <!--begin::Filter-->
            <button type="button" class="btn btn-light-primary me-3" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
            <!--begin::Svg Icon | path: icons/duotune/general/gen031.svg-->
            <span class="svg-icon svg-icon-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z" fill="black" />
              </svg>
            </span>
            <!--end::Svg Icon-->Filtrer</button>
            <json-excel 
              class="btn btn-light-primary me-3 exporter"
              :data="colisALivrerData"
              name="data.xls" 
              :fields="jsonFields"
            >
            <i class="fa-solid fa-file-export"></i>
              Exporter  
            </json-excel>
            <!--begin::Menu 1-->
            <div class="menu menu-sub menu-sub-dropdown w-300px w-md-325px" data-kt-menu="true" id="kt-toolbar-filter">
              <!--begin::Header-->
              <div class="px-7 py-5">
                <div class="fs-4 text-dark fw-bolder">Options</div>
              </div>
              <!--end::Header-->
              <!--begin::Separator-->
              <div class="separator border-gray-200"></div>
              <!--end::Separator-->
              <!--begin::Content-->
              <div class="px-7 py-5">
                <!--begin::Input group-->
                <div class="mb-10">

                  <!--begin::Label-->
                  <label class="form-label fs-5 fw-bold mb-3">Champs textuels:</label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <select v-model="champ" class="form-select form-select-solid fw-bolder" data-kt-select2="true" data-placeholder="Select option" data-allow-clear="true" data-kt-customer-table-filter="month" data-dropdown-parent="#kt-toolbar-filter">
                    <option></option>
                    <option value="commandRef">Référence de commande</option>
                    <option value="customerfirstname">Nom du client</option>
                    <option value="customerlastname">Prénom du client</option>
                  </select>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
                <!--begin::Input group-->
                <div class="mb-10">
                  <!--begin::Label-->
                  <label class="form-label fs-5 fw-bold mb-3">Etats commandes:</label>
                  <!--end::Label-->
                  <!--begin::Options-->
                  <div class="d-flex flex-column flex-wrap fw-bold" data-kt-customer-table-filter="payment_type">
                    <!--begin::Option-->
                    <!--begin::Option-->
                    <label v-for="(item, index) in cmdStatus" :key="index" class="form-check form-check-sm form-check-custom form-check-solid">
                      <input class="form-check-input" v-model="selectedCmdStatus" type="checkbox" name="payment_type" :value=" item.code" />
                      <span class="form-check-label text-gray-600">{{ item.label }}</span>
                      <br/><br/>
                    </label>
                    
                    <!--end::Option-->
                  </div>
                  <div class="mb-10">
                  <!--begin::Label-->
                  <label class="form-label fs-5 fw-bold mb-3">Montant </label>
                  <!--end::Label-->
                  <!--begin::Options-->
                  <div class="d-flex flex-row flex-wrap fw-bold" data-kt-customer-table-filter="payment_type">
                    <!--begin::Option-->
                    <!--begin::Option-->
                    <div class="col-lg-6">
                      <label class="fs-6 fw-bold mb-2">Min</label>
                      <input type="number" v-model="filterMinAmount" class="form-control w-100px">
                    </div>
                    <div class="col-lg-6">
                      <label class="fs-6 fw-bold mb-2">Max</label>
                      <input type="number" v-model="filterMaxAmount" class="form-control w-100px">
                    </div>
                      
           </div>
                    <!--end::Option-->
                  </div>

                  <div class="mb-10">
                  <!--begin::Label-->
                  <label class="form-label fs-5 fw-bold mb-3">Date de commande </label>
                  <!--end::Label-->
                  <!--begin::Options-->
                  <div class="d-flex flex-row flex-wrap fw-bold" data-kt-customer-table-filter="payment_type">
                    <!--begin::Option-->
                    <!--begin::Option-->
                    <div class="col-lg-6">
                      <label class="fs-6 fw-bold mb-2">Min</label>
                      <input type="date" v-model="dateMinFilter" class="form-control w-150px">
                    </div>
                    <div class="col-lg-6">
                      <label class="fs-6 fw-bold mb-2">Max</label>
                      <input type="date" v-model="dateMaxFilter" class="form-control w-150px">
                    </div>
                      
                </div>
                    <!--end::Option-->
                  </div>
                  <!--end::Options-->
                </div>
                <!--end::Input group-->
                <!--begin::Actions-->
                <div class="d-flex justify-content-end">
                  <button type="reset" class="btn btn-light btn-active-light-primary me-2" data-kt-menu-dismiss="true" data-kt-customer-table-filter="reset" @click="cancelFilter()">Reset</button>
                  <button type="submit" class="btn btn-primary" data-kt-menu-dismiss="true" data-kt-customer-table-filter="filter" @click="filterCommands()">Apply</button>
                </div>
                <!--end::Actions-->
              </div>
              <!--end::Content-->
            </div>
            <!--end::Menu 1-->
            <!--end::Filter-->
            
            <!--end::Export-->
            
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
              <span v-else-if="command.statue==='CommandStatus.Commande_recue'" class="badge badge-info">Commande reçue</span>
              <span v-else-if="command.statue==='CommandStatus.livre_au_client'" class="badge badge-success">Livré au client</span>
              <span v-else-if="command.statue==='CommandStatus.livre_en_relais'" class="badge badge-info">Livré en relais</span>
              <span v-else-if="command.statue==='CommandStatus.expedie_par_le_vendeur'" class="badge badge-primary">Expédié par le vendeur</span>
              <span v-else-if="command.statue==='CommandStatus.en_entrepot'" class="badge badge-primary">En entrepot</span>
              <span v-else-if="command.statue==='CommandStatus.En_cours_de_preparation'" class="badge badge-warning">En cours de préparation</span>


              <span v-else class="badge badge-success">Livré</span>
              
             </template>
             <template v-slot:cell-dateofCommand="{ row: command }">
               {{ `${new Date(command.dateofCommand).getDate()}-${new Date(command.dateofCommand).getMonth()+1}-${new Date(command.dateofCommand).getFullYear()}` }}
             </template>
             <template v-slot:cell-actions="{ row: command }">
              <a :href="`/commandes/details/${command.id}`" :id="command.id" class="btn btn-icon btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                </svg>
              </a>
              &nbsp;

              <a href="#" :id="command.id" class="btn btn-icon btn-danger">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
                  <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
                </svg>
              </a>
              &nbsp;
              <a href="#" :id="command.id" class="btn btn-icon btn-success" @click="print(command)">
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
    <pdfBon :commandeToPrint="commandeToPr" :key="componentKey"/>
     <!-- <button class="btn btn-primary" @click="print()">Export To PDF</button> -->
        
   </template>
   
   <script lang="ts">
   import { defineComponent, ref, onMounted, computed } from "vue";
   import Datatable from "@/components/kt-datatable/Datatable.vue";
   import Vue3Html2pdf from 'vue3-html2pdf'
   import { MenuComponent } from "@/assets/ts/components";
   import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
   import { doc, getDoc, collection , getDocs,query,where,orderBy} from 'firebase/firestore'
   import pdfBon from "./pdfBon.vue"
   import db from '../../firebase';
   import htmlToPdfmake from 'html-to-pdfmake';
   import pdfMake from 'pdfmake';
   import * as pdfFonts from 'pdfmake/build/vfs_fonts';
   import JsonExcel from "vue-json-excel3";

   export default defineComponent({
     props: ['coordinates'],
     name: "commandes-listing",
     components: {
       Datatable,
       pdfBon,
       JsonExcel
     },
     setup() {
       const jsonFields = ref({
        "Numero de commande": "commandRef",
        "Nom de relais": "relay_name",
        "Produits": "produits",
        "Prénom du client": "customerfirstname",
        "Nom du client": "customerlastname",
       })
       const colisALivrerData = ref([{commandRef: 12345,relay_name:"1234",customerfirstname: "1234",customerlastname: "1234"}])
       const relais  = ref([]);
       const commandALivrerID = ref([])
       const selectedCmdStatus = ref([]);
       let champ = ref("commandRef")
       const cmdStatus = ref([]);
       const filterMinAmount = ref(null);
       const filterMaxAmount = ref(null);
       const dateMinFilter = ref(null)
       const dateMaxFilter = ref(null)
       
       const commandeToPrint = ref(null);
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
       const componentKeyPdf = ref(0);
       let commands = ref([]);
         
       let commandCom = computed(() => {
        return commands.value
      })
       
       let loading = ref(true);
       const filterCommands = async() =>{
          
          const oldCommands = commands.value
          commands.value = [];
          
          oldCommands.forEach(element =>{
            let criteriaOne = true;
            let criteriaTwo = true;
            let criteriaThree = true;
            if(filterMinAmount.value != null && filterMaxAmount.value != null){
                if(parseInt(element.value)>filterMinAmount.value 
                && parseInt(element.value)<filterMaxAmount.value
                &&filterMaxAmount.value!= null && filterMaxAmount.value!=''
                &&filterMinAmount.value!= null && filterMinAmount.value!=''
              ){
                criteriaOne = true
              } else {
                criteriaOne = false;
              }
            } 

            if(dateMaxFilter.value !=null && dateMinFilter.value !=null && dateMinFilter.value!='' && dateMaxFilter.value!=''){
              let dmax = new Date(dateMaxFilter.value)
              let dmin = new Date(dateMinFilter.value)
              let dateString = new Date(element.dateofCommand)
              if(dmax.getTime()>=dateString.getTime() && dmin.getTime()<=dateString.getTime()){
                criteriaTwo = true
                
              } else{
                criteriaTwo = false
              }
            }

            if(selectedCmdStatus.value.length >0){
              
                criteriaThree = (selectedCmdStatus.value.includes(element.statue))
              
            }

            if(criteriaOne == true && criteriaTwo == true && criteriaThree){
              commands.value.push(element)
            }
          })
          componentKey.value++
          
        }
       onMounted(async () => {
         MenuComponent.reinitialization();
         getCmdStatus()
         await getArticlesALivrer(db)
         setCurrentPageBreadcrumbs("Relais ", ["Apps", "Relais"]);
         getCommands(db);
         console.log(colisALivrerData.value)
         
       });
   
       
   
       
   
       const search = ref<string>("");
       const divToPrint = ref();
       const componentKey = ref(0)
       const commandeToPr = ref(null);
       const recherche = async () =>{
        
        commands.value = []
        // alert(search.value)
        const collectionRef =  query(collection(db,'Commandes'),
          where(champ.value,'>=',search.value),
          where(champ.value,'<=',search.value + '\uf8ff'),
        );

        const querySnapshot = await getDocs(collectionRef)
        querySnapshot.forEach((doc) => {
          console.log(doc.data())
          let item = doc.data()
          item.id = doc.id
          // item.data = doc.data()
          commands.value= [...commands.value, item]
          //commands.value.push(item)
          // doc.data() is never undefined for query doc snapshots
         
        });
        //alert(commands.value.length)
        componentKey.value++;
       }
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
       const print = async (command) =>{
        componentKeyPdf.value++;
        commandeToPr.value= command
        
        // await new Promise(resolve => setTimeout(resolve, 2000));
        // commandeToPrint.value = command
        // const pdfTable = divToPrint.value;
        //   //html to pdf format
        //   var html = htmlToPdfmake(pdfTable.innerHTML);
        //   const documentDefinition = { content: html };
        //   pdfMake.vfs = (pdfFonts.pdfMake && pdfFonts.pdfMake.vfs )?pdfFonts.pdfMake.vfs: null;
        //   const pedeef = pdfMake.createPdf(documentDefinition).download();
       }
       const getColisALivrerData = async (commandsId,db) =>{
         ;
        const colRef = query(collection(db,'Commandes'), where('commandRef', 'in', commandsId));
        const querySnapshot = await getDocs(colRef)
        querySnapshot.forEach((doc) => {
          // console.log(doc.data())
          let item = doc.data()
          item.id = doc.id
          // item.data = doc.data()
          console.log(item)
          colisALivrerData.value= [...colisALivrerData.value, {
            relay_name : item.destination,
            customerfirstname: item.customerfirstname,
            customerlastname: item.customerlastname,
            commandRef: item.commandRef
          }]
          //commands.value.push(item)
          // doc.data() is never undefined for query doc snapshots
         
        });

         console.log(colisALivrerData.value)
       }
       const getArticlesALivrer = async (db)=>{
          const collectionRef = await collection(db,'RelayCorrespondanceTable');
          getDocs(collectionRef)
            .then(async (querySnapshot)  => {
              querySnapshot.forEach((doci) => {
                //  doc.data() contains the data of each document
                let item = doci.data();
                item.id = doci.id;
                // console.log(item.colisALivrer)
                if(item.colisALivrer != undefined){
                  item.colisALivrer.forEach((col)=>{
                    // console.log(col.commandRef)
                    commandALivrerID.value.push(col.commandRef)
                  })
                }
                //  const docRef = doc(db, "Commandes");
                //  cmdStatus.value.push(item);
                // commandesALivrer
              });
              loading.value = false;
              console.log(commandALivrerID.value)
              await getColisALivrerData(commandALivrerID.value,db)
              console.log(colisALivrerData.value)
            })
            .catch((error) => {
              loading.value = false;
              console.error('Error getting documents from collection:', error);
            });

         
      };
       const getCmdStatus = async () =>{
         const col = await collection(db,'commandstatus')
        
         getDocs(col)
         .then((querySnapshot) => {
           querySnapshot.forEach((doc) => {
             // doc.data() contains the data of each document
             

             let item = doc.data();
             item.id = doc.id;
             cmdStatus.value.push(item);
             
           });
           loading.value = false;
         })
         .catch((error) => {
           loading.value = false;
           console.error('Error getting documents from collection:', error);
         });
       }
       const cancelFilter = () =>{
        getCommands(db)
       }
       const getCommands = async (db) =>{
         
         const collectionRef = await collection(db,'Commandes');
         getDocs(collectionRef)
         .then((querySnapshot) => {
           querySnapshot.forEach((doc) => {
             // doc.data() contains the data of each document
             

             let item = doc.data();
             item.id = doc.id;
             commands.value.push(item);
             
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
         commands,
         tableHeader,
         loading,
         getCommands,
         print,
         recherche,
         search,
         commandeToPrint,
         checkedCustomers,
         commandCom,
         componentKey,
         champ,
         cmdStatus,
         filterMinAmount,
         filterMaxAmount,
         filterCommands,
         dateMaxFilter,
         cancelFilter,
         dateMinFilter,
         selectedCmdStatus,
         componentKeyPdf,
         divToPrint,
         commandeToPr,
         commandALivrerID,
         colisALivrerData,
         jsonFields
       };
     },
   });
   </script>
   