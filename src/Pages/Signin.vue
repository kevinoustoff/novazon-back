<template>
  <!--begin::Wrapper-->
  <div class="d-flex flex-column flex-lg-row flex-column-fluid full-screen">
    <div class="d-flex flex-column flex-lg-row-auto w-xl-900px positon-xl-relative">
      <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="5000">
          </div>
          <div class="carousel-item" data-bs-interval="2000">
            <img src="https://kevinkodjo98.pythonanywhere.com/static/img/bg.png" class="d-block w-100 full-screen" alt="...">
          </div>
          <div class="carousel-item">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(15).webp" class="d-block w-100 full-screen" alt="...">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
        <div class="overlay"></div>
      </div>
      <!--begin::Wrapper-->
      <div class="d-flex flex-column position-xl-fixed top-0 bottom-0 w-xl-900px scroll-y">
        <!--begin::Content-->
        <div class="d-flex flex-row-fluid flex-column text-center p-10 pt-lg-20">
          <!--begin::Logo-->
          <a href="" class="py-9 mb-5">
            <img src="../assets/images/novazon.png" alt="Logo" class="h-60px" />
          </a>
          <!--end::Logo-->
          <!--begin::Title-->
          <h1 class="fw-bolder fs-2qx pb-5 pb-md-10" style="color: white;">Bienvenue sur le back office novazon</h1>
          <!--end::Title-->
          <!--begin::Description-->
          <p class="fw-bold fs-2" style="color: white">La révolution du e-commerce</p>
          <!--end::Description-->
        </div>
        <!--end::Content-->
        <!--begin::Illustration-->
        <div class="d-flex flex-row-auto bgi-no-repeat bgi-position-x-center bgi-size-contain bgi-position-y-bottom min-h-100px min-h-lg-350px" style="background-image: url(assets/media/illustrations/sketchy-1/13.png"></div>
        <!--end::Illustration-->
      </div>
      <!--end::Wrapper-->
    </div>
    <div class="d-flex flex-column flex-lg-row-fluid py-10">
      <div class="d-flex flex-center flex-column flex-column-fluid">
        <div class="w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto">
          <!--begin::Form-->
          <Form
            class="form w-100"
            id="kt_login_signin_form"
            @submit="onSubmitLogin"
            :validation-schema="login"
          >
            <!--begin::Heading-->
            <div class="text-center mb-10">
              <!--begin::Title-->
              <h1 class="text-dark mb-3">Connectez vous sur Novazon</h1>
              <!--end::Title-->
            </div>
            <!--begin::Heading-->
            <!--begin::Input group-->
            <div class="fv-row mb-10">
              <!--begin::Label-->
              <label class="form-label fs-6 fw-bolder text-dark">Email</label>
              <!--end::Label-->

              <!--begin::Input-->
              <Field
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="email"
                autocomplete="off"
              />
              <!--end::Input-->
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="email" />
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="fv-row mb-10">
              <!--begin::Wrapper-->
              <div class="d-flex flex-stack mb-2">
                <!--begin::Label-->
                <label class="form-label fw-bolder text-dark fs-6 mb-0"
                  >Password</label
                >
                <!--end::Label-->

                <!--begin::Link-->
                <router-link to="/password-reset" class="link-primary fs-6 fw-bolder">
                  Forgot Password ?
                </router-link>
                <!--end::Link-->
              </div>
              <!--end::Wrapper-->

              <!--begin::Input-->
              <Field
                class="form-control form-control-lg form-control-solid"
                type="password"
                name="password"
                autocomplete="off"
              />
              <!--end::Input-->
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="password" />
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <!--begin::Actions-->
            <div class="text-center">
              <!--begin::Submit button-->
              <button
                type="submit"
                ref="submitButton"
                id="kt_sign_in_submit"
                class="btn btn-lg btn-primary w-100 mb-5"
              >
                <span class="indicator-label"> Continue </span>

                <span class="indicator-progress">
                  Please wait...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
              </button>
              <!--end::Submit button-->

              <!--begin::Separator-->
              <div class="text-center text-muted text-uppercase fw-bolder mb-5">
                or
              </div>
              <!--end::Separator-->

              

              <!--begin::Google link-->
        
              <!--end::Google link-->
              <!--end::Google link-->
            </div>
            <!--end::Actions-->
          </Form>
          <!--end::Form-->
        </div>
      </div>
    </div>
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import * as Yup from "yup";

export default defineComponent({
  name: "sign-in",
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const submitButton = ref<HTMLElement | null>(null);

    //Create form validation object
    const login = Yup.object().shape({
      email: Yup.string().email().required().label("Email"),
      password: Yup.string().min(4).required().label("Password"),
    });

    //Form submit function
    const onSubmitLogin = (values) => {
      // Clear existing errors
      store.dispatch(Actions.LOGOUT);

      if (submitButton.value) {
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }

      // Dummy delay
      setTimeout(() => {
        // Send login request
        store
          .dispatch(Actions.LOGIN, values)
          .then(() => {
            Swal.fire({
              text: "All is cool! Now you submit this form",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn fw-bold btn-light-primary",
              },
            }).then(function () {
              // Go to page after successfully login
              router.push({ name: "dashboard" });
            });
          })
          .catch(() => {
            Swal.fire({
              text: store.getters.getErrors[0],
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Try again!",
              customClass: {
                confirmButton: "btn fw-bold btn-light-danger",
              },
            });
          });

        //Deactivate indicator
        submitButton.value?.removeAttribute("data-kt-indicator");
      }, 2000);
    };

    return {
      onSubmitLogin,
      login,
      submitButton,
    };
  },
});
</script>
