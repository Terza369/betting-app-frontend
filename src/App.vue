<template>

  <Navigation />

  <router-view
    v-bind:matches="matches"
    v-bind:tournaments="tournaments"
    v-bind:sports="sports"
    v-if="ready"
    v-on:reset="reset"
    v-on:match-created="reset"/>

</template>

<script>
import Navigation from './components/Navigation'
export default {
  name: 'App',
  components: {
    Navigation
  },
  data() {
    return {
      matches: [],
      tournaments: [],
      sports: [],
      ready: false
    }
  },
  methods: {
    async fetchMatches() {
      const res = await fetch('api/matches');
      const data = await res.json();
      return data;
    },
    async fetchTournaments() {
      const res = await fetch('api/tournaments');
      const data = await res.json();
      return data;
    },
    async fetchSports() {
      const res = await fetch('api/sports');
      const data = await res.json();
      return data;
    },
    async resetMatchTime(match) {
      const body = {
        startTime: (new Date()).setSeconds((Math.random() * (60 - 1) + 1))
      }

      const res = await fetch('api/matches/' + match._id, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await res.json();
      return data;
    },
    resetScore() {
      this.matches = this.matches.map(match => {
        match.score = [0, 0];
        return match;
      });
    },
    calculateMinute() {
      this.matches = this.matches.map(match => {

        let startTime = new Date(match.startTime);
        let timePassed = Date.now() - startTime;
        timePassed = Math.floor(timePassed / 60000);
        timePassed = Math.max(timePassed, 0);

        if(timePassed > match.duration) {
          match.finished = true;
          match.minute = match.duration
        } else {
          match.finished = false;
          match.minute = timePassed; 
        }

        return match;
      });
    },
    incrementScores() {
      this.matches = this.matches.map(match => {
        if(new Date(match.startTime) > new Date() || match.finished) {
          return match;
        } else {
          let teamSelector = Math.round(Math.random());
          match.score[teamSelector] += 1;
          return match;
        }
      });
    },
    async reset() {
      this.matches = await this.fetchMatches();
      this.$router.go(0);
      return;
    }
  },
  async created() {
    this.matches = await this.fetchMatches();
    this.sports = await this.fetchSports();
    this.tournaments = await this.fetchTournaments();
    this.resetScore();
    this.calculateMinute();

    setInterval(() => this.incrementScores(), 20000);
    setInterval(() => this.calculateMinute(), 1000);

    this.ready = true;
  }
}
</script>

<style>

</style>
