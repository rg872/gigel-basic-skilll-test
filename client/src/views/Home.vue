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
          <div class="box">
            
          </div>
        </div>
        <div class="container" v-if-else="menu === 1">

        </div>
      </div>
    </div>    
  </div>
</template>

<script>
export default {
  data () {
    return {
      menu: 0
    }
  },

  beforeCreate () {
    this.$store.dispatch('verifyToken')
      .catch(msg => {
        this.$router.push('/sign')
      })
  }
}
</script>

<style>

</style>
