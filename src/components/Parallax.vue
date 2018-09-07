<template>
  <div>
    Counter: {{$store.state.count}}, counter is {{evenOrOdd}}
    <button @click="increment">incremente</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data(){
    return {

    }
  },
  computed: {
    ...mapGetters([
      'evenOrOdd'
    ])
  },
  methods: mapActions([
    'increment'
  ])  
}
</script>
