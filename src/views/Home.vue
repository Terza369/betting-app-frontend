<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-8 border" id="matches">
          <Sport 
          v-bind:key="sport._id"
          v-for="sport in uniqueSortedSports"
          v-bind:sport="getSport(sport._id)"
          v-bind:tournaments="getSportTournaments(sport._id)"
          v-bind:matches="getSportMatches(sport._id)"
          v-on:match-click="matchClick"/>
      </div>
      <div class="col-sm-4" id="ticket">
        <div id="resetButtonWrapper">
          <button 
            type="button" 
            class="btn btn-warning" 
            id="resetButton"
            v-on:click="resetClick"
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
  props: {
    matches: Array,
    tournaments: Array,
    sports: Array
  },
  components: {
    Sport,
    Ticket
  },
  computed: {
    uniqueSortedSports() {
      let uniqueSportIds = this.matches
        .map(match => match.sportId)
        .filter((value, index, self) => self.indexOf(value) === index);

      let uniqueSports = [];
      uniqueSportIds.forEach(uniqueSportId => {
        this.sports.forEach(sport => {
          if(sport._id === uniqueSportId) {
            uniqueSports.push(sport);
          }
        })
      })

      uniqueSports.sort((a, b) => {
        return a.priority - b.priority;
      })

      return uniqueSports;
    }
  },
  data() {
    return {
      clickedMatches: []
    }
  },
  methods: {
    getSport(id) {
      return this.sports.filter(sport => sport._id === id)[0]
    },
    getSportMatches(sportId) {
      return this.matches
        .map(match => {
          if(match.sportId === sportId) {
            return match;
          }
        })
        .filter(match => {
          return match !== undefined;
        })
    },
    getSportTournaments(sportId) {
      return this.tournaments
        .map(tournament => {
          if(tournament.sportId === sportId) {
            return tournament;
          }
        })
        .filter(tournament => {
          return tournament !== undefined;
        })
    },
    matchClick(match) {
      if(this.clickedMatches.includes(match)) {
        this.clickedMatches.splice(this.clickedMatches.indexOf(match), 1);
      } else {
        this.clickedMatches.push(match);
      }
    },
    async resetMatchTime(match) {
      let startTime = new Date();
      startTime.setSeconds((Math.random() * (60 - 1) + 1));
      startTime = new Date(startTime);

      const body = {
        startTime: startTime
      }

      await fetch('https://betting-app-backend.herokuapp.com/matches/' + match._id, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return;
    },
    async resetClick() {
      this.matches.forEach(match => this.resetMatchTime(match));

      this.$emit('reset');

      return;
    }
  },
  async created() {

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