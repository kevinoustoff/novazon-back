<template>
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
                Details du client
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
                <!--begin::Badge-->
                <!--begin::Details item-->
                <div class="fw-bolder mt-5">Identifiant client</div>
                <div class="text-gray-600">{{(customer)? customer.id:"" }}</div>
                <!--begin::Details item-->
                <!--begin::Details item-->
                <div class="fw-bolder mt-5">Prenom</div>
                <div class="text-gray-600">
                  {{(customer)? customer.prenom:"" }}
                </div>
                <!--begin::Details item-->
                <!--begin::Details item-->
                <div class="fw-bolder mt-5">Nom</div>
                <div class="text-gray-600">
                  {{(customer)? customer.nom:"" }}
                </div>
                <!--begin::Details item-->
                <!--begin::Details item-->
                <div class="fw-bolder mt-5">Numero de téléphone</div>
                <div class="text-gray-600">{{(customer)? customer.numero_tel:"" }}</div>
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
           <!--Payments-->
           
           <CustomerCommands cardClasses="mb-6 mb-xl-9"  ></CustomerCommands>
           <!--mettre les dernières commandes-->
          </div>
          <!--end:::Tab pane-->
  
          <!--begin:::Tab pane-->
          <div
            class="tab-pane fade"
            id="kt_customer_view_overview_events_and_logs_tab"
            role="tabpanel"
          >
            <!-- products -->
            <!-- <Products :articles="(fullCurrentCommand)?(fullCurrentCommand.articles):[]"></Products> -->
          </div>
          <!--end:::Tab pane-->
  
          <!--begin:::Tab pane-->
          <div
            class="tab-pane fade"
            id="kt_customer_view_overview_statements"
            role="tabpanel"
          >
            <!-- suivis -->
            <!-- <Suivis></Suivis> -->
          </div>
          <!--end:::Tab pane-->
        </div>
        <!--end:::Tab content-->
      </div>
      <!--end::Content-->
    </div>
</template>
<script lang="ts">
    import { defineComponent, ref, onMounted,computed, onBeforeMount} from "vue";
    import db from '../../../firebase';
    import { doc, getDoc, collection , getDocs} from 'firebase/firestore'
    import { useRouter, RouterView, createRouter } from 'vue-router';
    import CustomerCommands from'./CustomerCommands/index.vue'
    export default defineComponent({
        name:'customers-details',
        components:{
            CustomerCommands
        },
        setup(){
            let customer = ref()
            let customerKey = ref()
            const router = useRouter();
           
            router.beforeEach(async (to, from) => {
              

            
            // ...
            // explicitly return false to cancel the navigation
            
          })
            
            
            onBeforeMount(async()=>{
              
            })

            onMounted(async()=>{
              customerKey.value = router.currentRoute.value.params.id;
              
              await getCustomer(db);
              
            })

            const getCustomer = (db) =>{
              const docRef = doc(db, "Customers", customerKey.value);

              getDoc(docRef)
                  .then((doc) => {
                      console.log(doc.data())
                      customer.value = doc.data()
                      customer.value.id = doc.id
                      
                  })
                  .catch((error) => {
                      //console.error("Error getting document:", error);
                  });
            }
            
            return {
                customer,
                getCustomer,
                customerKey,
                
            }
        }
    })

</script>

