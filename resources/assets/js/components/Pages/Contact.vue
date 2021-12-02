<template>
  <section>
    <div class="container is-max-desktop">
      <div class="tile">
        <div class="tile is-parent">
          <article class="tile is-child box">
            <p class="title es-title">{{ title }}</p>
            <p class="subtitle es-subtitle">{{ subtitle }}</p>
            <div class="content">
              <b-field label="Nombre" class="es-label">
                <b-input
                  type="text"
                  placeholder="Nombre"
                  v-model="name"
                  :disabled="isDisabled"
                />
              </b-field>
              <b-field label="Correo Electronico" class="es-label">
                <b-input
                  type="email"
                  :disabled="isDisabled"
                  placeholder="Correo Electronico"
                  v-model="email"
                />
              </b-field>
              <b-field label="Mensaje" class="es-label">
                <b-input
                  type="textarea"
                  :disabled="isDisabled"
                  placeholder="Mensaje"
                  v-model="message"
                />
              </b-field>
              <div class="buttons">
                <b-button
                  type="is-primary"
                  expanded
                  :loading="isLoading"
                  :disabled="disableButton"
                  @click="sendMessage"
                >
                  Enviar
                </b-button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
    <b-modal
      ref="modal"
      v-model="showModal"
      size="is-medium"
      :scrollable="false"
    >
      <div class="modal-card">
        <div class="modal-card-body  has-text-centered">
          <img :src="urlImage" alt="logo" class="logo-modal" />
        </div>
      </div>
    </b-modal>
  </section>
</template>

<script>

import NavBar from "./../NavBar.vue";

export default {
  data() {
    return {
      title: "Contacto",
      subtitle: "¿Quieres contactarme?",
      name: "",
      email: "",
      message: "",
      disableButton: false,
      isFullPage: true,
      isLoading: false,
      isDisabled: false,
      showModal: false,
      urlImage:
        "https://lh3.googleusercontent.com/proxy/luZRXQYH8ql-1CVgoH0XxQ3R-naqB6ssgkxQ55EpDaVFb7QyDiFE5NjJ8txHrf1Vd-i7lm9y-Pz_oITkqWVsKshxmp80nMBNVcE4PKc696DX5JRZYYwYx93w50xUZEKBdAS8hTY",
    };
  },
  components: {
    NavBar,
  },
  mounted() {
    console.log("Component mounted.");
  },
  methods: {
    validateForm() {
      if (
        this.name.length > 0 &&
        this.email.length > 0 &&
        this.message.length > 0
      ) {
        this.disableButton = true;
        return this.disableButton;
      } else {
        this.disableButton = false;
        return this.disableButton;
      }
    },
    sendMessage() {
      //llamado a la funcion de validacion del formulario
      this.isLoading = true;
      this.isDisabled = true;
      if (this.validateForm()) {
        //notificaion envio de email
        const loadingComponent = this.$buefy.loading.open({
          container: this.isFullPage ? null : this.$refs.element.$el,
        });
        axios
          .post("/api/contact", {
            name: this.name,
            email: this.email,
            message: this.message,
          })
          .then((response) => {
            console.log(response);
            this.name = "";
            this.email = "";
            this.message = "";

            this.$buefy.toast.open({
              message: "Mensaje enviado.",
              type: "is-success",
              duration: 5000,
            });
            this.disableButton = false;
            this.isLoading = false;
          })
          .catch((error) => {
            console.log(error);
            this.$buefy.toast.open({
              message:
                "Se ha producido un error, intentelo nuevamente mas tarde.",
              type: "is-danger",
              duration: 5000,
            });
          })
          .finally(() => {
            loadingComponent.close();
            this.isLoading = false;
            this.disableButton = false;
            this.isDisabled = false;
          });
      } else {
        this.$buefy.toast.open({
          message: "Por favor complete todos los campos.",
          type: "is-danger",
          duration: 5000,
        });
        this.disableButton = false;
        this.isLoading = false;
        this.isDisabled = false;
      }
      this.showModal = true;
    },
  },
};
</script>
