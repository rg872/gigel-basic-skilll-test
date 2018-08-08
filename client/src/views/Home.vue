<template>
  <div class="container">
    <div class="columns">
      <div class="column is-one-third">
        <aside class="menu">
          <p class="menu-label">
            Menu
          </p>
          <ul class="menu-list">
            <li><a @click="menu = 0">Dashboard</a></li>
            <li><a @click="menu = 1">Change password</a></li>
          </ul>
        </aside>
      </div>
      <div class="column">
        <div class="container" v-if="menu === 0">
          <div class="card" v-if="!isEdit">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="user.image" alt="" height="200" width="200">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <p class="title is-4">{{ user.name }}</p>
                <p class="subtitle is-6">{{ user.email }}</p>
                <p class="subtitle is-6">{{ user.handphone }}</p>
              </div>
            </div>
            <button class="button is-warning" @click="isEdit = true">Ganti</button>
          </div>
          <div class="box" v-else>
            <h1 class="title">
              Ganti
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
              <button class="button" @click="updateUser">Ganti</button>
              <button class="button is-danger" @click="isEdit = false">Batal</button>
            </div>
          </div>
        </div>
        <div class="container" v-else-if="menu === 1">
          <div class="box">
            <div class="field">
              <label class="label">Password Lama</label>
              <div class="control">
                <input class="input" type="password" placeholder="Masukan password" v-model="oldpassword">
              </div>
            </div>
            <div class="field">
              <label class="label">Password Baru</label>
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
            <div>
              <button class="button" @click="changePassword">Ganti</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import swal from 'sweetalert'

export default {
  data () {
    return {
      menu: 0,
      isEdit: false,
      name: '',
      email: '',
      handphone: '',
      image: {},
      url: '',
      oldpassword: '',
      password: '',
      confirmPass: ''
    }
  },

  methods: {
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

    updateUser () {
      let payload = new FormData()
      payload.append('image', this.image)
      payload.append('name', this.name)
      payload.append('email', this.email)
      payload.append('handphone', this.handphone)

      this.$store.commit('setLoading', true)
      this.$store.dispatch('updateAccount', payload)
        .then((message) => {
          swal('Yes !', message, 'success')
          this.$store.commit('setLoading', false)
          this.isEdit = false
        })
        .catch((message) => {
          swal('Oops...', message, 'error')
          this.$store.commit('setLoading', false)
        })
    },

    changePassword () {
      if (!this.checkPassword()) {
        this.clearData(true)
        swal('Oops...', 'Password yang kamu masukan salah', 'error')
        return
      }

      let payload = {
        password: this.password,
        oldpassword: this.oldpassword
      }

      this.$store.commit('setLoading', true)
      this.$store.dispatch('changePassword', payload)
        .then((message) => {
          swal('Oops...', message, 'success')
          this.$store.commit('setLoading', false)
        })
        .catch((message) => {
          swal('Oops...', message, 'error')
          this.$store.commit('setLoading', false)
        })
    },

    checkPassword () {
      return (this.password === this.confirmPass)
    },
  },

  computed: {
    ...mapState([
      'user',
      'isLoading'
    ])
  },

  beforeCreate () {
    this.$store.dispatch('verifyToken')
      .then(() => {
        this.name = this.$store.state.user.name
        this.email = this.$store.state.user.email
        this.handphone = this.$store.state.user.handphone
        this.url = this.$store.state.user.image
      })
      .catch(msg => {
        this.$router.push('/sign')
      })
  }
}
</script>

<style>

</style>
