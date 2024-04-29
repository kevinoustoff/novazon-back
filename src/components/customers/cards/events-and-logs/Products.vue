<template>
    <div class="row">
        <div v-for="(article, index) in articles" class="col-lg-6 mb-5">
            <div class="card shadow-sm">
                <div class="card-header">
                    <h3 class="card-title"><strong>{{article.article.name}}</strong></h3>
                    <div class="card-toolbar">
                        <button type="button" class="btn btn-sm btn-light">
                            Action
                        </button>
                    </div>
                </div>
                <div class="card-body p-0">
                    <div class="card-p mb-10">
                        <div class="row">
                            <div class="col-lg-3"> Quantité:</div>
                            <div class="col-lg-3"> {{ article.quantity }}</div>
                        </div>
                        <div class="row">
                            <div class="col-lg-3"> Prix unitaire:</div>
                            <div class="col-lg-3"> {{ article.article.price }} FCFA</div>
                        </div>
                    </div>

                    <div class="text-center px-4">
                        <img class="mw-100 mh-300px card-rounded-bottom" alt="" :src="article.article.images[0]"/>
                    </div>
                </div>
            </div>
        </div>j
    </div>
    
    
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name:"products",
    props: ["articles"],
    setup() {
        
    },
})
</script>
