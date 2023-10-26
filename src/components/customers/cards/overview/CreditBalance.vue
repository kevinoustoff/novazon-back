<template>
  <!--begin::Card-->
  <div :class="`card pt-4 ${cardClasses}`">
    <!--begin::Card header-->
    <div class="card-header border-0">
      <!--begin::Card title-->
      <div class="card-title">
        <h2 class="fw-bolder">Montant</h2>
      </div>
      <!--end::Card title-->

      <!--begin::Card toolbar-->
      
      <!--end::Card toolbar-->
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body pt-0">
      <div class="fw-bolder fs-2">
        {{ montant }} FCFA<span class="text-muted fs-4 fw-bold"></span>
        <div class="fs-7 fw-normal text-muted">
          
        </div>
      </div>
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "credit-bilance",
  props: {
    cardClasses: String,
    montant: Number
  },
  components: {},
});
</script>
