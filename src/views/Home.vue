<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-8 border" id="matches">
          <Sport 
          v-bind:key="sport._id"
          v-for="sport in sports"
          v-bind:sport="sport"
          v-on:match-click="matchClick"/>
      </div>
      <div class="col-sm-4" id="ticket">
        <div id="resetButtonWrapper">
          <button 
            type="button" 
            class="btn btn-warning" 
            id="resetButton"
            v-on:click="reset"
          >Reset</button>
        </div>
        <Ticket 
          v-bind:matches="clickedMatches"/>
      </div>
    </div>
  </div>
</template>

<script>
import Sport from '../components/Sport'
import Ticket from '../components/Ticket'

export default {
  name: 'Home',
  components: {
    Sport,
    Ticket
  },
  data() {
    return {
      sports: [],
      clickedMatches: []
    }
  },
  methods: {
    async fetchSports() {
      const res = await fetch('https://betting-app-backend.herokuapp.com/matches/everything');
      const data = await res.json();
      return data;
    },
    async incrementScores() {
      const body = this.sports;

      const res = await fetch('https://betting-app-backend.herokuapp.com/matches/everything/increment', {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      this.sports = await res.json();

      return;
    },
    async reset() {
      const res = await fetch('https://betting-app-backend.herokuapp.com/matches/everything?reset=true');
      this.matches = await res.json();
      this.$router.go(0);
      return;
    },
    matchClick(match) {
      if(this.clickedMatches.includes(match)) {
        this.clickedMatches.splice(this.clickedMatches.indexOf(match), 1);
      } else {
        this.clickedMatches.push(match);
      }
    }
  },
  async created() {
    this.sports = await this.fetchSports();
    setInterval(() => this.incrementScores(), 20000);
  }
}
</script>

<style>
#matches {
  height:94.5vh;
  overflow:auto;
  padding: 0;
}

#resetButton {
  margin-left: 25%;
  width: 50%;  
}

#resetButtonWrapper {
  width: 100%;
  margin-top: 0.5rem;
}
</style>