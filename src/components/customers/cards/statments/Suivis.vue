<template>
    <div class="card card-xxl-stretch">
        <!--begin::Header-->
        <div class="card-header align-items-center border-0 mt-4">
            <h3 class="card-title align-items-start flex-column">
                <span class="fw-bolder mb-2 text-dark">Suivis</span>
            </h3>
            <div class="card-toolbar">
                <!--begin::Menu-->
                <button type="button" class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                    <!--begin::Svg Icon | path: icons/duotune/general/gen024.svg-->
                    <span class="svg-icon svg-icon-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <rect x="5" y="5" width="5" height="5" rx="1" fill="#000000"></rect>
                                <rect x="14" y="5" width="5" height="5" rx="1" fill="#000000" opacity="0.3"></rect>
                                <rect x="5" y="14" width="5" height="5" rx="1" fill="#000000" opacity="0.3"></rect>
                                <rect x="14" y="14" width="5" height="5" rx="1" fill="#000000" opacity="0.3"></rect>
                            </g>
                        </svg>
                    </span>
                    <!--end::Svg Icon-->
                </button>
                <!--begin::Menu 1-->
                <div class="menu menu-sub menu-sub-dropdown w-250px w-md-300px" data-kt-menu="true" id="kt_menu_61484bf44f851">
                    <!--begin::Header-->
                    <div class="px-7 py-5">
                        <div class="fs-5 text-dark fw-bolder">Filter Options</div>
                    </div>
                    <!--end::Header-->
                    <!--begin::Menu separator-->
                    <div class="separator border-gray-200"></div>
                    <!--end::Menu separator-->
                    <!--begin::Form-->
                    <div class="px-7 py-5">
                        <!--begin::Input group-->
                        <div class="mb-10">
                            <!--begin::Label-->
                            <label class="form-label fw-bold">Status:</label>
                            <!--end::Label-->
                            <!--begin::Input-->
                            <div>
                                <select class="form-select form-select-solid select2-hidden-accessible" data-kt-select2="true" data-placeholder="Select option" data-dropdown-parent="#kt_menu_61484bf44f851" data-allow-clear="true" data-select2-id="select2-data-10-pt76" tabindex="-1" aria-hidden="true">
                                    <option data-select2-id="select2-data-12-1ijn"></option>
                                    <option value="1">Approved</option>
                                    <option value="2">Pending</option>
                                    <option value="2">In Process</option>
                                    <option value="2">Rejected</option>
                                </select><span class="select2 select2-container select2-container--bootstrap5" dir="ltr" data-select2-id="select2-data-11-qtgh" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single form-select form-select-solid" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-9e9v-container" aria-controls="select2-9e9v-container"><span class="select2-selection__rendered" id="select2-9e9v-container" role="textbox" aria-readonly="true" title="Select option"><span class="select2-selection__placeholder">Select option</span></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                            </div>
                            <!--end::Input-->
                        </div>
                        <!--end::Input group-->
                        <!--begin::Input group-->
                        <div class="mb-10">
                            <!--begin::Label-->
                            <label class="form-label fw-bold">Member Type:</label>
                            <!--end::Label-->
                            <!--begin::Options-->
                            <div class="d-flex">
                                <!--begin::Options-->
                                <label class="form-check form-check-sm form-check-custom form-check-solid me-5">
                                    <input class="form-check-input" type="checkbox" value="1">
                                    <span class="form-check-label">Author</span>
                                </label>
                                <!--end::Options-->
                                <!--begin::Options-->
                                <label class="form-check form-check-sm form-check-custom form-check-solid">
                                    <input class="form-check-input" type="checkbox" value="2" checked="checked">
                                    <span class="form-check-label">Customer</span>
                                </label>
                                <!--end::Options-->
                            </div>
                            <!--end::Options-->
                        </div>
                        <!--end::Input group-->
                        <!--begin::Input group-->
                        <div class="mb-10">
                            <!--begin::Label-->
                            <label class="form-label fw-bold">Notifications:</label>
                            <!--end::Label-->
                            <!--begin::Switch-->
                            <div class="form-check form-switch form-switch-sm form-check-custom form-check-solid">
                                <input class="form-check-input" type="checkbox" value="" name="notifications" checked="checked">
                                <label class="form-check-label">Enabled</label>
                            </div>
                            <!--end::Switch-->
                        </div>
                        <!--end::Input group-->
                        <!--begin::Actions-->
                        <div class="d-flex justify-content-end">
                            <button type="reset" class="btn btn-sm btn-light btn-active-light-primary me-2" data-kt-menu-dismiss="true">Reset</button>
                            <button type="submit" class="btn btn-sm btn-primary" data-kt-menu-dismiss="true">Apply</button>
                        </div>
                        <!--end::Actions-->
                    </div>
                    <!--end::Form-->
                </div>
                <!--end::Menu 1-->
                <!--end::Menu-->
            </div>
        </div>
        <!--end::Header-->
        <!--begin::Body-->
        <div class="card-body pt-5">
            <!--begin::Timeline-->
            <div class="timeline-label">
                <!--begin::Item-->
                <div class="timeline-item">
                    <!--begin::Label-->
                    <div class="timeline-label fw-bolder text-gray-800 fs-6">08:42</div>
                    <!--end::Label-->
                    <!--begin::Badge-->
                    <div class="timeline-badge">
                        <i class="fa fa-genderless text-warning fs-1"></i>
                    </div>
                    <!--end::Badge-->
                    <!--begin::Text-->
                    <div class="fw-bolder timeline-content ps-3">Préparation de la commande par le vendeur</div>
                    <!--end::Text-->
                </div>
                <!--end::Item-->
                <!--begin::Item-->
                <div class="timeline-item">
                    <!--begin::Label-->
                    <div class="timeline-label fw-bolder text-gray-800 fs-6">10:00</div>
                    <!--end::Label-->
                    <!--begin::Badge-->
                    <div class="timeline-badge">
                        <i class="fa fa-genderless text-success fs-1"></i>
                    </div>
                    <!--end::Badge-->
                    <!--begin::Content-->
                    <div class="timeline-content d-flex">
                        <span class="fw-bolder text-gray-800 ps-3">Dépot au relais Hédzranawoé</span>
                    </div>
                    <!--end::Content-->
                </div>
                <!--end::Item-->
                <!--begin::Item-->
                <div class="timeline-item">
                    <!--begin::Label-->
                    <div class="timeline-label fw-bolder text-gray-800 fs-6">14:37</div>
                    <!--end::Label-->
                    <!--begin::Badge-->
                    <div class="timeline-badge">
                        <i class="fa fa-genderless text-danger fs-1"></i>
                    </div>
                    <!--end::Badge-->
                    <!--begin::Desc-->
                    <div class="timeline-content fw-bolder text-gray-800 ps-3">Expédition au relais Agoè Assiyéyé</div>
                    <!--end::Desc-->
                </div>
                <!--end::Item-->
                <!--begin::Item-->
                <div class="timeline-item">
                    <!--begin::Label-->
                    <div class="timeline-label fw-bolder text-gray-800 fs-6">16:50</div>
                    <!--end::Label-->
                    <!--begin::Badge-->
                    <div class="timeline-badge">
                        <i class="fa fa-genderless text-primary fs-1"></i>
                    </div>
                    <!--end::Badge-->
                    <!--begin::Text-->
                    <div class="timeline-content fw-mormal text-muted ps-3">Dépot au relais 1 agoè assiyéyé</div>
                    <!--end::Text-->
                </div>
                <!--end::Item-->
            </div>
            <!--end::Timeline-->
        </div>
        <!--end: Card Body-->
    </div>
</template>
<script>
import { defineComponent } from 'vue'
import "@fortawesome/fontawesome-free"

export default defineComponent({
    name: "suivis",
    setup() {
        
    },
})
</script>
