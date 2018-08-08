<template>
  <div>
    <div class="container">
      <div class="hero">
        <div class="hero-body">
          <div v-if="isLoading">
            <img src="../assets/loading-icon.svg" alt="">
          </div>
          <div class="box" v-if="isRegister">
            <h1 class="title">
              Daftar
            </h1>
            <div class="field">
              <label class="label">Nama</label>
              <div class="control">
                <input class="input" type="text" placeholder="Masukan nama" v-model="name">
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input class="input" type="email" placeholder="Masukan email" v-model="email">
              </div>
            </div>
            <div class="field">
              <label class="label">Nomor Hp</label>
              <div class="control">
                <input class="input" type="text" placeholder="Masukan nomor handphone" v-model="handphone">
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input class="input" type="password" placeholder="Masukan password" v-model="password">
              </div>
            </div>
            <div class="field">
              <label class="label">Konfirm Password</label>
              <div class="control">
                <input class="input" type="password" placeholder="Masukan ulang password" v-model="confirmPass">
              </div>
            </div>
            <label class="label">Gambar Profil</label>
            <div class="file has-name">
              <label class="file-label">
                <input class="file-input" type="file" accept="image/*" @change="saveImage">
                <span class="file-cta">
                  <span class="file-label">
                    Choose a file…
                  </span>
                </span>
                <span class="file-name">
                  {{ image.name || '......'}}
                </span>
              </label>
            </div>
            <img :src="url" height="150" width="150"/>
            <div>
              <button class="button" @click="registerUser">Daftar</button>
              <a @click="changeSignForm"><small>Sudah punya akun ?</small></a>
            </div>
          </div>
          <div class="box" v-else>
            <div>
              <h1 class="title">
                Masuk
              </h1>
              <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input class="input" type="email" placeholder="Masukan email" v-model="email">
              </div>
            </div>
              <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input class="input" type="password" placeholder="Masukan password" v-model="password">
                </div>
              </div>
              <div>
                <button class="button" @click="signInUser">Masuk</button>
                <a @click="changeSignForm"><small>Belum punya akun ?</small></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      isRegister: true,
      name: '',
      email: '',
      handphone: '',
      password: '',
      confirmPass: '',
      image: {},
      url: ''
    }
  },

  methods: {
    changeSignForm () {
      if (this.isRegister) {
        this.clearData(true)
      } else {
        this.clearData(false)
      }

      this.isRegister = !this.isRegister
    },

    saveImage () {
      // Reference to the DOM input element
      var input = event.target

      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        console.log(input.files[0])
        this.image = input.files[0]
        // create object url to preview image
        this.url = URL.createObjectURL(this.image)
      }
    },

    registerUser () {
      if (!this.checkPassword()) {
        this.clearData(true)
        swal('Oops...', 'Password yang kamu masukan salah', 'error')
        return
      }

      let payload = new FormData()
      payload.append('name', this.name)
      payload.append('email', this.email)
      payload.append('password', this.password)
      payload.append('handphone', this.handphone)
      payload.append('image', this.image)

      this.$store.commit('setLoading', true)
      this.$store.dispatch('register', payload)
        .then((message) => {
          this.clearData(true)
          this.$router.push('/')
        })
        .catch((message) => {
          swal('Oops...', message, 'error')
          this.$store.commit('setLoading', false)
        })
    },

    signInUser () {
      let payload = {
        email: this.email,
        password: this.password
      }

      this.$store.commit('setLoading', true)
      this.$store.dispatch('register', payload)
        .then((message) => {
          this.clearData(false)
          this.$router.push('/')
        })
        .catch((message) => {
          swal('Oops...', message, 'error')
          this.$store.commit('setLoading', false)
        })
    },

    checkPassword () {
      return (this.password === this.confirmPass)
    },

    clearData (all) {
      if (all) {
        this.name = ''
        this.email = ''
        this.handphone = ''
        this.password = ''
        this.confirmPass = ''
        this.image = {}
        this.url = ''
      } else {
        this.email = ''
        this.password = ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'isLoading'
    ])
  },

  beforeCreate () {
    this.$store.dispatch('verifyToken')
      .then(msg => {
        this.$router.push('/')
      })
  }
}
</script>

<style>

</style>
