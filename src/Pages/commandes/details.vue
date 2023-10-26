<template>
    <!--begin::Layout-->
    <div class="d-flex flex-column flex-xl-row">
      <!--begin::Sidebar-->
      <div class="flex-column flex-lg-row-auto w-100 w-xl-350px mb-10">
        <!--begin::Card-->
        <div class="card mb-5 mb-xl-8">
          <!--begin::Card body-->
          <div class="card-body pt-5">
  
            <!--begin::Details toggle-->
            <div class="d-flex flex-stack fs-4 py-3">
              <div
                class="fw-bolder rotate collapsible"
                data-bs-toggle="collapse"
                href="#kt_customer_view_details"
                role="button"
                aria-expanded="false"
                aria-controls="kt_customer_view_details"
              >
                Details de la commande
                <span class="ms-2 rotate-180">
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="/media/icons/duotune/arrows/arr072.svg" />
                  </span>
                </span>
              </div>
  
              <span
                data-bs-toggle="tooltip"
                data-bs-trigger="hover"
                title="Edit customer details"
              >
                <a
                  href="#"
                  class="btn btn-sm btn-light-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#kt_modal_update_customer"
                >
                  Edit
                </a>
              </span>
            </div>
            <!--end::Details toggle-->
  
            <div class="separator separator-dashed my-3"></div>
  
            <!--begin::Details content-->
            <div id="kt_customer_view_details" class="collapse show">
              <div class="py-5 fs-6">
                <!--begin::Badge-->
                <div class="badge badge-light-info d-inline">En préparation</div>
                <!--begin::Badge-->
                <!--begin::Details item-->
                <div class="fw-bolder mt-5">ID de commande</div>
                <div class="text-gray-600">{{(fullCurrentCommand)?fullCurrentCommand.value:''}}</div>
                <!--begin::Details item-->
                <!--begin::Details item-->
                <div class="fw-bolder mt-5">Vendeur</div>
                <div class="text-gray-600">
                  <a href="#" class="text-gray-600 text-hover-primary"
                    > {{(fullCurrentCommand)?fullCurrentCommand.sellers[0]:''}}</a
                  >
                </div>
                <!--begin::Details item-->
                <!--begin::Details item-->
                <div class="fw-bolder mt-5">Relais</div>
                <div class="text-gray-600">
                  Relais 1<br/>Agoè Assiyéyé<br/>
                </div>
                <!--begin::Details item-->
                <!--begin::Details item-->
                <div class="fw-bolder mt-5">Montant de la commande</div>
                <div class="text-gray-600">{{(fullCurrentCommand)?fullCurrentCommand.value:''}}</div>
                <!--begin::Details item-->
                <!--begin::Details item-->
                <!--begin::Details item-->
              </div>
            </div>
            <!--end::Details content-->
          </div>
          <!--end::Card body-->
        </div>
        <!--end::Card-->
      </div>
      <!--end::Sidebar-->
  
      <!--begin::Content-->
      <div class="flex-lg-row-fluid ms-lg-15">
        <!--begin:::Tabs-->
        <ul
          class="
            nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x
            border-0
            fs-4
            fw-bold
            mb-8
          "
        >
          <!--begin:::Tab item-->
          <li class="nav-item">
            <a
              class="nav-link text-active-primary pb-4 active"
              data-bs-toggle="tab"
              href="#kt_customer_view_overview_tab"
              >Vue d'ensemble</a
            >
          </li>
          <!--end:::Tab item-->
  
          <!--begin:::Tab item-->
          <li class="nav-item">
            <a
              class="nav-link text-active-primary pb-4"
              data-bs-toggle="tab"
              href="#kt_customer_view_overview_events_and_logs_tab"
              >Produits</a
            >
          </li>
          <!--end:::Tab item-->
  
          <!--begin:::Tab item-->
          <li class="nav-item">
            <a
              class="nav-link text-active-primary pb-4"
              data-kt-countup-tabs="true"
              data-bs-toggle="tab"
              href="#kt_customer_view_overview_statements"
              >Suivis</a
            >
          </li>
          <!--end:::Tab item-->
  
          <!--begin:::Tab item-->
          <li class="nav-item ms-auto">
            <!--begin::Action menu-->
            <a
              href="#"
              class="btn btn-primary ps-7"
              data-kt-menu-trigger="click"
              data-kt-menu-attach="parent"
              data-kt-menu-placement="bottom-end"
            >
              Actions
              <span class="svg-icon svg-icon-2 me-0">
                <inline-svg src="/media/icons/duotune/arrows/arr072.svg" />
              </span>
            </a>
            <Dropdown3></Dropdown3>
            <!--end::Menu-->
          </li>
          <!--end:::Tab item-->
        </ul>
        <!--end:::Tabs-->
  
        <!--begin:::Tab content-->
        <div class="tab-content" id="myTabContent">
          <!--begin:::Tab pane-->
          <div
            class="tab-pane fade show active"
            id="kt_customer_view_overview_tab"
            role="tabpanel"
          >
            <CreditBalance card-classes="mb-6 mb-xl-9" :montant="(fullCurrentCommand)?fullCurrentCommand.value:''"></CreditBalance>
            <PaymentRecords card-classes="mb-6 mb-xl-9"></PaymentRecords>
            
          </div>
          <!--end:::Tab pane-->
  
          <!--begin:::Tab pane-->
          <div
            class="tab-pane fade"
            id="kt_customer_view_overview_events_and_logs_tab"
            role="tabpanel"
          >
            <Products></Products>
          </div>
          <!--end:::Tab pane-->
  
          <!--begin:::Tab pane-->
          <div
            class="tab-pane fade"
            id="kt_customer_view_overview_statements"
            role="tabpanel"
          >
            <Suivis></Suivis>
          </div>
          <!--end:::Tab pane-->
        </div>
        <!--end:::Tab content-->
      </div>
      <!--end::Content-->
    </div>
    <!--end::Layout-->
  
    <NewCardModal></NewCardModal>
  </template>
  
  <script lang="ts">
  import { defineComponent,ref ,onMounted } from "vue";
  import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
  import { MenuComponent } from "@/assets/ts/components";
  import Dropdown3 from "@/components/dropdown/Dropdown3.vue";
  import NewCardModal from "@/components/modals/forms/NewCardModal.vue";
  import PaymentRecords from "@/components/customers/cards/overview/PaymentRecords.vue";
  import PaymentMethods from "@/components/customers/cards/overview/PaymentMethods.vue";
  import CreditBalance from "@/components/customers/cards/overview/CreditBalance.vue";
  import Invoices from "@/components/customers/cards/overview/Invoices.vue";
  
  import Events from "@/components/customers/cards/events-and-logs/Events.vue";
  import Logs from "@/components/customers/cards/events-and-logs/Logs.vue";
  import { useRouter, RouterView } from 'vue-router';
  import Earnings from "@/components/customers/cards/statments/Earnings.vue";
  import Statement from "@/components/customers/cards/statments/Statement.vue";
  import Products from "@/components/customers/cards/events-and-logs/Products.vue"
  import Suivis from "@/components/customers/cards/statments/Suivis.vue"
  import db from '../../firebase';
  import { doc, getDoc, collection , getDocs} from 'firebase/firestore'

  export default defineComponent({
    name: "commandes-details",
    props: ['ID'],
    components: {
      PaymentRecords,
      PaymentMethods,
      CreditBalance,
      Invoices,
      Events,
      Logs,
      Earnings,
      Statement,
      Dropdown3,
      NewCardModal,
      Products,
      Suivis
    },
    setup() {
        const router = useRouter();
        let currentCommand = ref();
        let fullCurrentCommand = ref();
      onMounted(() => {

        currentCommand.value =  router.currentRoute.value.params.id;
        //MenuComponent.reinitialization();
        console.log(router.currentRoute.value.params.id) 
        setCurrentPageBreadcrumbs("Details de commandes", ["Apps", "Commandes"]);
        
        getCurrentCommand(db);
    
    });
      
     const getCurrentCommand = async (db) =>{
        const docRef = doc(db, "Commandes", currentCommand.value);

        getDoc(docRef)
            .then((doc) => {
                console.log(doc.data())

                fullCurrentCommand.value = doc.data()
                fullCurrentCommand.value.id = doc.id
            })
            .catch((error) => {
                console.error("Error getting document:", error);
            });


      };

      return {
        router,
        currentCommand,
        fullCurrentCommand
      };
    },
  });
  </script>
  