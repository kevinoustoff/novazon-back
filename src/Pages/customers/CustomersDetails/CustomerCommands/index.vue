<template>
<div :class="`card pt-4 ${cardClasses}`">
    <!--begin::Card header-->
    <div class="card-header border-0">
      <!--begin::Card title-->
      <div class="card-title">
        <h2>Commandes</h2>
      </div>
      <!--end::Card title-->

      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Filter-->
        <button
          type="button"
          class="btn btn-sm btn-flex btn-light-primary"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_add_payment"
        >
          <span class="svg-icon svg-icon-3">
            <inline-svg src="/media/icons/duotune/general/gen035.svg" />
          </span>
          Add payment
        </button>
        <!--end::Filter-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body pt-0 pb-5">
      <Datatable
        :table-header="tableHeader"
        :table-data="commands"
        :rows-per-page="5"
      >
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
              &nbsp;&nbsp;
              

               <!--begin::Menu-->
               
               <!--end::Menu-->
             </template>
      </Datatable>
    </div>
    <!--end::Card body-->
  </div>  
</template>

<script>
    import { defineComponent,ref ,onMounted } from "vue";
    import db from "../../../../firebase"
    import Datatable from "@/components/kt-datatable/Datatable.vue";
    import { doc, getDoc, collection ,query, where, getDocs} from 'firebase/firestore'

    export default defineComponent({
        name:"customer-commands",
        props:['ID','username','cardClasses'],
        components: {
            Datatable
        },
        setup(props){
            const commands = ref([]);
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
            onMounted(async()=>{
              console.log(props)
                await getCommands(db)

            })

            const getCommands = async (db) =>{
                
                //alert(localStorage.getItem('username'))
                const collectionRef =  query(collection(db,'Commandes'),where('username','==',localStorage.getItem('username')));


                const querySnapshot = await getDocs(collectionRef)
                //console.log(querySnapshot)

                
                querySnapshot.forEach((doc) => {
                  console.log(doc.data())
                  let item = doc.data()
                  item.id = doc.id

                   
                  // item.data = doc.data()

                  commands.value.push(item)
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ", doc.data());
                }); 
                    // .then((querySnapshot) => {
                    // querySnapshot.forEach((doc) => {
                    //     // doc.data() contains the data of each document
                    //     console.log('Document ID comm detail:', doc.id);
                    //     console.log('Document Data:', doc.data());
                    //     alert('u')
                    //     let item = doc.data();
                    //     item.id = doc.id;
                    //     commands.value.push(item);
                    //     // console.log(doc.data)
                        
                    // });
                    // // loading.value = false;
                    // })
                    // .catch((error) => {
                    // // loading.value = false;
                    // //console.error('Error getting documents from collection:', error);
                    // });
                
            }


            return {
                commands,
                getCommands,
                tableHeader
            }


        }

    })
</script>

<style>

</style>