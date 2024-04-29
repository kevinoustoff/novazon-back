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
            placeholder="Rechercher un relais"
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
            data-bs-target="#kt_modal_relais_map"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotune/arrows/arr078.svg" />
            </span>
            La carte des relais
          </button>
          <json-excel 
            class="btn btn-light-primary me-3 exporter"
            :data="frelais"
            name="data.xls" 
            :fields="jsonFields"
          >
          <i class="fa-solid fa-file-export"></i>
          Exporter
          </json-excel>
          <!--end::Export-->
          <!--begin::Add customer-->
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_add_customer"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotone/Navigation/Plus.svg" />
            </span>
            Ajouter un relais
          </button>
          
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
          :table-data="frelais"
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
          <template v-slot:cell-last_name="{ row: customer }">
            <a href="#" class="text-gray-600 text-hover-primary mb-1">
              {{ customer.last_name }}
            </a>
          </template>
          <template v-slot:cell-first_name="{ row: customer }">
            {{ customer.first_name }}
          </template>
          <template v-slot:cell-relay_name="{ row: customer }">
            {{
              customer.relay_name
            }}
          </template>
          <template v-slot:cell-quartier="{ row: customer }">
            {{ customer.quartier }}
          </template>
          <template v-slot:cell-numero_telephone="{ row: customer }">
            {{ customer.numero_telephone }}
          </template>
          <template v-slot:cell-latitude="{ row: customer }">
            {{ customer.latitude }}
          </template>
          <template v-slot:cell-longitude="{ row: customer }">
            {{ customer.longitude }}
          </template>
          <template v-slot:cell-createdAt="{ row: customer }">
            {{ customer.createdAt }}
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
                  >Delete</a>
              </div>
              <!--end::Menu item-->
            </div>
            <!--end::Menu-->
          </template>
        </Datatable>
    </div>
  </div>

  
  <AddRelaisModal></AddRelaisModal>
  <RelaisMap :relais="frelais"></RelaisMap>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Datatable from "@/components/kt-datatable/Datatable.vue";
import AddRelaisModal from "./RelaisAdd.vue";
import RelaisMap from "./RelaisMap.vue";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { doc, getDoc, collection , getDocs,updateDoc, orderBy, query} from 'firebase/firestore'
import db from '../../firebase';
import JsonExcel from "vue-json-excel3";


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
  props: ['coordinates'],
  name: "relais-listing",
  components: {
    Datatable,
    AddRelaisModal,
    RelaisMap,
    JsonExcel
  },
  setup() {
    const jsonFields = ref({
     "Prenom du gérant": "first_name",
     "Nom du gérant": "last_name",
      "Nom de relais": "relay_name",
      "Quartier" : "quartier",
      "Numero de téléphone": "numero_telephone",
      "Longitude": "longitude",
      "Latitude": "latitude",
      "Date de création": "createdAt"

    })

    const relais  = ref([]);
    const checkedCustomers = ref([]);
    const commandesALivrer = ref([]);
    const tableHeader = ref([
      {
        key: "checkbox",
      },
      {
        name: "Prénom du gérant",
        key: "first_name",
        sortable: true,
      },
      {
        name: "Nom du gérant",
        key: "last_name",
        sortable: true,
      },
      {
        name: "Nom de relais",
        key: "relay_name",
        sortable: true,
      },
      {
        name: "Quartier",
        key: "quartier",
        sortable: true,
      },
      {
        name: "Numero de telephone",
        key: "numero_telephone",
        sortable: true,
      },
      {
        name: "Latitude",
        key: "latitude",
        sortable: true,
      },
      {
        name: "Longitude",
        key: "longitude",
        sortable: true,
      },
      {
        name:"Date de création",
        key: "createdAt",
        sortable: true
      },
      {
        name: "Actions",
        key: "actions",
      },
    ]);

    let frelais = ref<[]>([]);

    const customers = ref<Array<IRelais>>([
          { 
            id: 4,
            key: 4,
            first_name: "Yao",
            last_name: "Koko",
            relay_name: "Nomrelais",
            quartier: "Kohé",
            numero_telephone: "90909090",
            latitude: "6.12830730000000000000",
            longitude: "1.21191320000000000000",
            gmanager_signature: true
          },
          {
            id: 5,
            key: 5,
            first_name: "florence",
            last_name: "tchoyou",
            relay_name: "cyber seime",
            quartier: "37",
            numero_telephone: "90278458",
            latitude: "6.24418250000000000000",
            longitude: "1.23083660000000000000",
            gmanager_signature: true
          },
      
    ]);
    let loading = ref(true);
    const initCustomers = ref<Array<IRelais>>([]);
    onMounted(() => {
      MenuComponent.reinitialization();
      initCustomers.value.splice(0, customers.value.length, ...customers.value);

      setCurrentPageBreadcrumbs("Relais ", ["Apps", "Relais"]);
      getRelais(db);
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
    const getArticlesALivrer = async (db)=>{
      const collectionRef = await collection(db,'RelayCorrespondanceTable');
      getDocs(collectionRef)
         .then((querySnapshot) => {
           querySnapshot.forEach((doci) => {
            //  doc.data() contains the data of each document
             let item = doci.data();
             item.id = doci.id;

             const docRef = doc(db, "Commandes");
             const q = query(collectionRef, orderBy('createdAt', 'asc'));
            //  cmdStatus.value.push(item);
            // commandesALivrer
           });
           loading.value = false;
         })
         .catch((error) => {
           loading.value = false;
           console.error('Error getting documents from collection:', error);
         });
    };
    const getRelais = async (db) =>{
      
      const collectionRef = await collection(db,'Relais');

     
      const q = query(collectionRef, orderBy('createdAt', 'asc'));

      getDocs(q)
      .then(async (querySnapshot) => {
        querySnapshot.forEach(async (doci) => {
          let timestamp = doci._document.createTime.timestamp 
          frelais.value.push(doci.data())
        });
        loading.value = false;
      })
      .catch((error) => {
        loading.value = false;
      });
      console.log(frelais)
      //frelais.value.sort((a,b)=>)

    };

    return {
      relais,
      customers,
      tableHeader,
      frelais,
      loading,
      getRelais,
      deleteCustomer,
      search,
      searchItems,
      checkedCustomers,
      deleteFewCustomers,
      jsonFields
    };
  },
});
</script>
<style lang="scss">
   // Main demo style scss
   @media only screen and (max-width: 767px) {
  /* Styles for mobile devices */
    .exporter{
      display: none !important;
    }
    /* Add more styles as needed */
  }
  /* Styles pour les tablettes */
  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    .exporter{
      display: none !important;
    }
    /* Ajoutez plus de styles si nécessaire */
  }
   
</style>
