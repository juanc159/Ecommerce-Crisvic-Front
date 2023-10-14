<template>
  <div>
    <div id="whatsapp-chat" class="hide" :class="{ 'show': isChatVisible }">
      <div class="header-chat">
        <div style=" color: white;cursor: pointer;" class="head-home" @click="showList()">
          <h6 style=" color: white;cursor: pointer; font-size: 16px;">Contacta a tu experto</h6>
        </div>
        <div class="get-new hide">
          <div id="get-label"></div>
          <div id="get-nama"></div>
        </div>
      </div>
      <div class="home-chat" v-if="!isTextVisible">
        <a v-for="(item, index) in arrayWs" :key="index" class="informasi" href="javascript:void" title="Chat Whatsapp"
          @click="openChat(item)">
          <div class="info-avatar">
            <!-- @if ($showRo->user->url_vcard == '') -->
            <img :src="item.avatar" />
            <!-- @else
            <img src='https://tracecr.housebl.com:7443/images/Profile/{{$showRo->user->url_vcard}}' />
            @endif -->
          </div>
          <div class="info-chat">
            <span class="chat-label">{{ item.fullName }}</span>
            <span class="chat-nama">{{ item.company }}</span>
          </div>
          <span class="my-number">{{ item.phoneNumber }}</span>
        </a>
      </div>
      <div class="start-chat" v-if="isTextVisible">
        <div class="first-msg"><span>¡Hola! ¿Qué puedo hacer por ti? Deja tu mensaje. En breve me conectaré
            contigo.</span></div>
        <div class="sundaku-msg">
          <textarea id="chat-input" placeholder="Escríbenos" rows="3" v-model="message"></textarea>
          <a href="javascript:void" class="send-it" @click="sendMessage">
            <VIcon icon="mdi-send" /> <!-- Asumiendo que estás usando Vuetify para los íconos -->
            <i class="fa fa-send"></i>
          </a>
        </div>
      </div>
      <div id="get-number"></div>
      <a class="close-chat" href="javascript:void" @click="closeChat">×</a>
    </div>
    <a class="sundakushow-chat" href="javascript:void" title="Show Chat" @click="showChat">
      <VIcon color="white" icon=" mdi-whatsapp"></VIcon>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arrayWs: [
        {
          fullName: "Cristhian Moreno",
          phoneNumber: "+58 4247401580",
          avatar: "data:image/png;base64,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",
          company: "",
        },
        {
          fullName: "Victoria Guerrero",
          phoneNumber: "+58 4247515985",
          avatar: "data:image/png;base64,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",
          company: "",
        },
      ],
      isChatVisible: false,
      isTextVisible: false,
      message: "",
    };
  },
  methods: {
    sendMessage() {
      if (this.message !== "") {
        const getNumber = this.contactNumber;
        const url = "https://web.whatsapp.com/send";
        const phone = getNumber;
        const text = "&text=" + this.message;

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          window.location.href = "whatsapp://send?phone=" + phone + text;
        } else {
          window.open(url + "?phone=" + phone + text, "_blank");
        }
      }
    },
    showList() {
      this.isChatVisible = true;
      this.isTextVisible = false;
    },
    showChat() {
      this.isChatVisible = true;
    },
    closeChat() {
      this.showList()
      this.isChatVisible = false;
      this.message = ""; // Limpiar el mensaje al cerrar el chat
    },
    openChat() {
      console.log("aaa");
      this.isTextVisible = true;
      this.contactName = item.fullName;  // Actualizar la información del contacto al abrir el chat
      this.contactLabel = item.company;
      this.contactNumber = item.phoneNumber;
      this.contactAvatar = item.avatar;
    },
  },
};
</script>


<style lang="scss">
#whatsapp-chat {
  position: fixed;
  z-index: 99;
  overflow: hidden;
  border-radius: 10px;
  animation-duration: 0.3s;
  animation-name: showchat;
  background: #fff;
  box-shadow: 0 1px 15px rgb(32 33 36 / 28%);
  inline-size: 350px !important;
  inset-block-end: 177px;
  inset-inline-end: 90px;
  transform: scale(1);
}

a.sundakushow-chat {
  position: fixed;
  z-index: 98;
  border-radius: 60%;
  background: linear-gradient(to right);
  block-size: auto;
  box-shadow: 0 1px 15px rgb(32 33 36 / 28%);
  color: #fff;
  font-size: 25px;
  inline-size: 80px !important;
  inset-block-end: 92px;
  inset-inline-end: 28px;
  padding-block: 23px;
  padding-inline: 20px;
}

a.sundakushow-chat {
  animation: Gradient 3s ease infinite;
  background: linear-gradient(-50deg, rgb(23, 187, 26), rgb(3, 120, 5), rgb(45, 235, 48), rgb(3, 120, 5));
  background-size: 320% 200%;
}

@keyframes Gradient {
  0% {
    background-position: 0 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}

@keyframes Gradient {
  0% {
    background-position: 0 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}

@keyframes Gradient {
  0% {
    background-position: 0 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}

a.sundakushow-chat i {
  margin-block: 0;
  margin-inline: 3px 0;
  transform: scale(1.2);
}

.header-chat {
  padding: 15px;
  background: linear-gradient(to right top, rgb(3, 120, 5), rgb(23, 187, 26));
  color: #fff;
}

.header-chat h3 {
  margin-block: 0 10px;
  margin-inline: 0;
}

.header-chat p {
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
}

.info-avatar {
  position: relative;
}

.info-avatar img {
  border-radius: 100%;
  block-size: 50px;
  float: inline-start;
  inline-size: 50px;
  margin-block: 0;
  margin-inline: 0 10px;
}

.info-avatar::before {
  position: absolute;
  z-index: 1;
  border-radius: 100%;
  background: #23ab23;
  color: #fff;
  content: "\f232";
  font-family: "Font Awesome 5 Brands";
  inset-block-start: 30px;
  inset-inline-start: 30px;
  padding-block: 0;
  padding-inline: 5px;
}

a.informasi {
  display: block;
  overflow: hidden;
  padding: 20px;
  animation-duration: 1s;
  animation-name: showhide;
}

a.informasi:hover {
  background: #f1f1f1;
}

.info-chat span {
  display: block;
}

#get-label,
span.chat-label {
  color: #888;
  font-size: 12px;
}

#get-nama,
span.chat-nama {
  color: #222;
  font-size: 15px;
  font-weight: 700;
  margin-block: 5px 0;
  margin-inline: 0;
}

#get-label,
#get-nama {
  color: #fff;
}

span.my-number {
  display: none;
}

.sundaku-msg {
  padding: 20px;
  border-block-start: 1px solid #ddd;
  color: #444;
  font-size: 12.5px;
  text-align: center;
}

textarea#chat-input {
  border: none;
  block-size: auto;
  font-family: sans-serif;
  inline-size: 100%;
  outline: none;
  resize: auto;
}

a#send-it {
  padding: 14px;
  border-radius: 30px;
  background: #f60;
  color: white;
  font-weight: 700;
  inline-size: 40px;
  margin-block: 3px;
  margin-inline: 8px 0;
}

.first-msg {
  padding: 30px;
  background: #f5f5f5;
  text-align: center;
}

.first-msg span {
  display: inline-block;
  border-radius: 10px;
  background: #e2e2e2;
  color: #333;
  font-size: 14.2px;
  line-height: 1.7;
  padding-block: 15px;
  padding-inline: 20px;
}

.start-chat .sundaku-msg {
  display: flex;
}

#get-number {
  display: none;
}

a.close-chat {
  position: absolute;
  color: #fff;
  font-size: 30px;
  inset-block-start: 0;
  inset-inline-end: 15px;
}

@keyframes showhide {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
}

@keyframes showchat {
  from {
    opacity: 0;
    transform: scale(0);
  }
}

@media screen and (max-width: 480px) {
  #whatsapp-chat {
    font-size: 80%;
    inline-size: auto;
    inset-inline: 5%;
  }
}

.hide {
  display: none;
  animation-duration: 1.5s;
  animation-name: showhide;
  opacity: 1;
  transform: scale(1);
}

.show {
  display: block;
  animation-duration: 0.5s;
  animation-name: showhide;
  opacity: 1;
  transform: scale(1);
}
</style>
