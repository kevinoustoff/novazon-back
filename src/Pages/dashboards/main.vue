<template>
    <div class="row g-5 g-xl-8">
        <div class="col-xl-3">
           
            <a href="#" class="card bg-body hoverable card-xl-stretch mb-xl-8">
                
                <div class="card-body">
                    <span class="svg-icon svg-icon-primary svg-icon-3x ms-n1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                        </svg>
                    </span>
                    
                    <div class="text-gray-900 fw-bolder fs-2 mb-2 mt-5">{{ numberCustomers }}</div>
                    <div class="fw-bold text-gray-400">Clients</div>
                </div>
                
            </a>
            
        </div> 
        <div class="col-xl-3">
           
           <a href="#" class="card bg-body hoverable card-xl-stretch mb-xl-8">
               
               <div class="card-body">
                   <span class="svg-icon svg-icon-primary svg-icon-3x ms-n1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shop-window" viewBox="0 0 16 16">
                            <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z"/>
                        </svg>
                    </span>
                   
                   <div class="text-gray-900 fw-bolder fs-2 mb-2 mt-5">{{ numberSellers }}</div>
                   <div class="fw-bold text-gray-400">Vendeurs</div>
               </div>
               
           </a>
           
       </div> 
        <div class="col-xl-3">
            
            <a href="#" class="card bg-warning hoverable card-xl-stretch mb-xl-8">
                <div class="card-body">
                    <span class="svg-icon svg-icon-white svg-icon-3x ms-n1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path opacity="0.3" d="M20 15H4C2.9 15 2 14.1 2 13V7C2 6.4 2.4 6 3 6H21C21.6 6 22 6.4 22 7V13C22 14.1 21.1 15 20 15ZM13 12H11C10.5 12 10 12.4 10 13V16C10 16.5 10.4 17 11 17H13C13.6 17 14 16.6 14 16V13C14 12.4 13.6 12 13 12Z" fill="black"></path>
                            <path d="M14 6V5H10V6H8V5C8 3.9 8.9 3 10 3H14C15.1 3 16 3.9 16 5V6H14ZM20 15H14V16C14 16.6 13.5 17 13 17H11C10.5 17 10 16.6 10 16V15H4C3.6 15 3.3 14.9 3 14.7V18C3 19.1 3.9 20 5 20H19C20.1 20 21 19.1 21 18V14.7C20.7 14.9 20.4 15 20 15Z" fill="black"></path>
                        </svg>
                    </span>
                    <div class="text-white fw-bolder fs-2 mb-2 mt-5">{{ numberRelais }}</div>
                    <div class="fw-bold text-white">Relais enregistrés</div>
                </div>
            </a>
        </div>
        <div class="col-xl-3">
            
            <a href="#" class="card bg-success hoverable card-xl-stretch mb-xl-8">
                <div class="card-body">
                    <span class="svg-icon svg-icon-white svg-icon-3x ms-n1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path opacity="0.3" d="M20 15H4C2.9 15 2 14.1 2 13V7C2 6.4 2.4 6 3 6H21C21.6 6 22 6.4 22 7V13C22 14.1 21.1 15 20 15ZM13 12H11C10.5 12 10 12.4 10 13V16C10 16.5 10.4 17 11 17H13C13.6 17 14 16.6 14 16V13C14 12.4 13.6 12 13 12Z" fill="black"></path>
                            <path d="M14 6V5H10V6H8V5C8 3.9 8.9 3 10 3H14C15.1 3 16 3.9 16 5V6H14ZM20 15H14V16C14 16.6 13.5 17 13 17H11C10.5 17 10 16.6 10 16V15H4C3.6 15 3.3 14.9 3 14.7V18C3 19.1 3.9 20 5 20H19C20.1 20 21 19.1 21 18V14.7C20.7 14.9 20.4 15 20 15Z" fill="black"></path>
                        </svg>
                    </span>
                    <div class="text-white fw-bolder fs-2 mb-2 mt-5">{{ relaisConfirmes }}</div>
                    <div class="fw-bold text-white">Relais confirmés</div>
                </div>
            </a>
        </div>
        <div class="col-xl-3">
           
           <a href="#" class="card bg-body hoverable card-xl-stretch mb-xl-8">
               
               <div class="card-body">
                   <span class="svg-icon svg-icon-primary svg-icon-3x ms-n1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                    </svg>
                   </span>
                   
                   <div class="text-gray-900 fw-bolder fs-2 mb-2 mt-5">{{ numberCommandes }}</div>
                   <div class="fw-bold text-gray-400">Commandes</div>
               </div>
               
           </a>
           
       </div> 

      
        <!-- <div class="col-xl-3">
            
            <a href="#" class="card bg-info hoverable card-xl-stretch mb-5 mb-xl-8">
                
                <div class="card-body">
                    <span class="svg-icon svg-icon-white svg-icon-3x ms-n1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path opacity="0.3" d="M10.9607 12.9128H18.8607C19.4607 12.9128 19.9607 13.4128 19.8607 14.0128C19.2607 19.0128 14.4607 22.7128 9.26068 21.7128C5.66068 21.0128 2.86071 18.2128 2.16071 14.6128C1.16071 9.31284 4.96069 4.61281 9.86069 4.01281C10.4607 3.91281 10.9607 4.41281 10.9607 5.01281V12.9128Z" fill="black"></path>
                            <path d="M12.9607 10.9128V3.01281C12.9607 2.41281 13.4607 1.91281 14.0607 2.01281C16.0607 2.21281 17.8607 3.11284 19.2607 4.61284C20.6607 6.01284 21.5607 7.91285 21.8607 9.81285C21.9607 10.4129 21.4607 10.9128 20.8607 10.9128H12.9607Z" fill="black"></path>
                        </svg>
                    </span>
                    
                    <div class="text-white fw-bolder fs-2 mb-2 mt-5">$50,000</div>
                    <div class="fw-bold text-white">Milestone Reached</div>
                </div>
                
            </a>
           
        </div> -->
    </div>
</template>
<script lang="ts">
    import { defineComponent,ref,onMounted } from 'vue'
    import { doc, getDoc, collection , getDocs} from 'firebase/firestore'
    import db from '../../firebase';


    export default defineComponent({
        name: "dashboards",
        setup() {
            let numberRelais = ref(0)
            let numberCustomers = ref(0)
            let numberSellers = ref(0)
            let numberCommandes = ref(0)
            let relaisConfirmes = ref(0)

            onMounted(() => {
                loadDataRelais(db)
            })

            const loadDataRelais =  (db) =>{
                const collectionRef =  collection(db,'Relais');
                getDocs(collectionRef)
                    .then((querySnapshot) => {
                    numberRelais.value = querySnapshot.size

                    querySnapshot.forEach(rel =>{
                        if (rel.data().confirm === true){
                            relaisConfirmes.value++;
                        }
                        
                    })
                        
                    })
                    .catch((error) => {
                    
                    });

                const customersRef = collection(db,'Customers')
                getDocs(customersRef)
                .then((querySnapshot) => {
                    numberCustomers.value = querySnapshot.size
                        
                    })
                    .catch((error) => {
                    
                    });

                const sellers = collection(db,'Sellers')
                getDocs(sellers)
                .then((querySnapshot) => {
                    numberSellers.value = querySnapshot.size
                        
                    })
                    .catch((error) => {
                    
                    });

                const commandesRef = collection(db,'Commandes')
                getDocs(commandesRef)
                .then((querySnapshot) => {
                    numberCommandes.value = querySnapshot.size
                        
                    })
                    .catch((error) => {
                    console.log(error)
                    });


            }

            return{
                numberRelais,
                numberCustomers,
                numberSellers,
                numberCommandes,
                relaisConfirmes
            }
        },
    })
</script>
