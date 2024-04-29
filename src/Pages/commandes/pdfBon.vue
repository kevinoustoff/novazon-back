<template>
    <div  class="d-none">
        <div class="container">
          <div class="row">
              <div class="col-md-6">
                  <h1>NOVAZON</h1>
                  <hr style="width:100px;"/>
              </div>
              <div class="col-md-3 text-right">
                  <p>Date: 2023-11-05</p>
                  <p>Invoice #: {{ (commandeToPrint !== null)? commandeToPrint.commandRef:"" }}</p>
              </div>
          </div>

          <div class="row">
              <div class="col-md-12">
                  <h4>Bill To:</h4>
                  <address>
                    {{ (commandeToPrint !==null)?commandeToPrint.customerfirstname :""}} {{ (commandeToPrint !==null)?commandeToPrint.customerlastname:"" }}<br>
                      123 Main St<br>
                      Anytown, USA
                  </address>
              </div>
          </div>

          <div class="row">
              <div class="col-md-12">
                  <h4>Ship To:</h4>
                  <address>
                    {{ (commandeToPrint !==null)?  `${commandeToPrint.customerfirstname} ${commandeToPrint.customerlastname}`:"" }}<br>
                      456 Elm St<br>
                      Othertown, USA
                  </address>
              </div>
          </div>

          <div class="row">
              <div class="col-md-12">
                <div>
                    <table class="table table-bordered">
                      <thead>
                          <tr>
                              <th>Item</th>
                              <th>Description</th>
                              <th>Quantity</th>
                              <th>Unit Price</th>
                              <th>Total</th>
                          </tr>
                      </thead>
                      <tbody v-if="commandeToPrint">

                          <tr v-for="(item,index) in commandeToPrint.articles">
                              <td> {{ index }}</td>
                              <td>{{item.article.name}}</td>
                              <td>{{ item.quantity }}</td>
                              <td>{{ item.article.price }}</td>
                              <td></td>
                            
                          </tr>
                          
                      </tbody>
                  </table>
                </div>
                <div>
                    
                </div>
                  
              </div>
          </div>

          <div class="row">
              <div class="col-md-12 text-right">
                  <p><strong>Subtotal:</strong> $65.00</p>
                  <p><strong>Tax (10%):</strong> $6.50</p>
                  <p><strong>Total:</strong> $71.50</p>
              </div>
          </div>
      </div>
     </div>
     <div class="d-none">
        <div id="divToPrint" ref="divToPrint" class="row mx-2 py-7">
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <div class="col-8 px-0">
                    <div class="d-flex justify-content-center py-2">
                        <img class="w-250px h-50px" src="../../assets/images/novazon.png"/>
                    </div>
                    
                    <div class="border border-dark">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">N*</th>
                                    <th scope="col">Nom du produit</th>
                                    <th scope="col">Quantité</th>
                                </tr>
                            </thead>
                            <tbody v-if="commandeToPrint!=null">
                                <tr v-for="(item,index) in commandeToPrint.articles">
                                    <td scope="row" class="limitTd py-1">{{ index + 1 }}</td>
                                    <td scope="row" class="limitTd py-1">{{item.article.name}}</td>
                                    <td scope="row" class="limitTd py-1">{{ item.quantity }}</td> 
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="border border-dark">
                        <h4>Livraison à</h4>
                        <p>{{ (commandeToPrint !== null)? commandeToPrint.customerlastname:"" }} {{ (commandeToPrint !== null)? commandeToPrint.customerfirstname:"" }}</p>
                        <p v-if="commandeToPrint !=null">{{ commandeToPrint.destination }}</p>
                        <p>Lomé, Togo</p>
                    </div>
                    <div class="border border-dark">
                        <div class="d-flex justify-content-center">
                            <VueBarcode 
                                :value="(commandeToPrint !== null)?commandeToPrint.commandRef:'1233'">
                            </VueBarcode>
                        </div>
                    </div>
                </div>
                <div class="col-4 border border-dark px-0">
                    <div class="border border-dark px-2 py-2">
                        <h5>Information de commande</h5>
                        <p class="">Numéro de commande: <br/></p>
                        <p class="font-ref">{{ (commandeToPrint !== null)? commandeToPrint.commandRef:"" }}</p>
                        <p class="font-cmd" v-if="commandeToPrint!=null">Cmdé. le:  {{ `${new Date(commandeToPrint.dateofCommand).getDate()}-${new Date(commandeToPrint.dateofCommand).getMonth()+1}-${new Date(commandeToPrint.dateofCommand).getFullYear()}` }}</p>
                    </div>
                    <div class="border border-dark px-3 py-2">
                       <QrcodeVue 
                            :value="(commandeToPrint !== null)?commandeToPrint.commandRef:'123'    
                        "/> 
                    </div>
                    <div class="border border-dark px-3 py-2">
                        
                    </div>
                </div>
            <hr/>
                
        </div>
    </div>
</template>
<script lang="ts">
import { useRouter, RouterView } from 'vue-router';
import QrcodeVue from 'qrcode.vue'
import { defineComponent, ref,onMounted, watch,onUpdated} from "vue";
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import VueBarcode from "@chenfengyuan/vue-barcode";
import jQuery from "jquery";
import Vue3Html2pdf from 'vue3-html2pdf'
import html2pdf from 'html2pdf.js';

export default defineComponent ({
    props: ['commandeToPrint'],
    components:{
        RouterView,
        QrcodeVue,
        VueBarcode,
        Vue3Html2pdf
        
    },
setup(props) {
    const $ = jQuery;
    window.$ = $;   
    const router = useRouter();
    let divToPrint = ref()
    let url = ref('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')
    let dataUrrl = ref()
    const print = async (command) =>{
        const element = document.getElementById('divToPrint');

      // Configuration for PDF generation
      const config = {
        filename: props.commandeToPrint.commandRef+'.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {},
        jsPDF: { unit: 'mm', format: 'a6', orientation: 'portrait' },
      };

      // Use html2pdf to generate the PDF
      html2pdf().from(element).set(config).save();
        await new Promise(resolve => setTimeout(resolve, 2000));

        const pdfTable = divToPrint.value;
        //html to pdf format
          var html = htmlToPdfmake(pdfTable.innerHTML);

        
        const documentDefinition = { 
            content: html, 
            qr: '1234',
            styles:{
                header: {
                    fontSize: 22,
                    bold: true
                },
            }
        
        };
        let ll = {
            Roboto: {
            normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
            bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
            italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
            bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
        }}

           //pdfMake.vfs = (pdfFonts.pdfMake && pdfFonts.pdfMake.vfs )?pdfFonts.pdfMake.vfs: null;
           //const pedeef = pdfMake.createPdf(documentDefinition,null,ll).download();
          
       
       }
    watch(props.commandeToPrint,(newValue,oldValue)=>{
        print(newValue)
    })

    onMounted(() => {
        // alert("helll")
        console.log(router.options.history.location)
        const src = ''
        const imagePath = '../../assets/images/novazon.png';

        // fetch(imagePath)
        // .then(response => response.blob())
        // .then(blob => {
        //     dataUrrl.value = URL.createObjectURL(blob);
        //     console.log('Blob URL:', dataUrrl.value);
             
        //     // Use the blobURL as needed (e.g., set as the src of an image element)
        // })
        // .catch(error => {
        //     console.error('Error fetching image:', error);
        // });

        
    });
    onUpdated(() => {
        print(props.commandeToPrint)
        
    });

    // Now you can use the router instance as needed
    
    return {
        router,
        print,
        divToPrint,
        dataUrrl
    };
},
});
</script>
<style scoped>
    canvas {
        width: 250px;
        height: 100px;
    }
    .limitTd {
        max-width: 15ch;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    .limitedDiv::after {
        content: '...'; /* Display a full stop after the truncated text */
    }

    .font-ref{
        font-size: 7px;
        font-weight: 1000;
    }
    .font-cmd{
        font-size: 9px;
        font-weight: 800;
    }
</style>

 
 