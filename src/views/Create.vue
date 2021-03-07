<template>
        <form class="match-form" method="POST" v-on:submit="onSubmit">

            <div class="my-form-control">
                <label for="sport">Sport:</label>
                <select v-model="sport" name="sport" class="dropdown">
                  <option required disabled selected hidden>Select a sport</option>
                  <option 
                    v-for="sport in sports"
                    v-bind:key="sport._id"
                    v-bind:value="sport._id"
                  >{{sport.name}}</option>
                </select>
            </div>

            <div class="my-form-control">
                <label for="tournament">Tournament:</label>
                <select v-bind:disabled="tournamentDisabled" v-model="tournament" name="tournament" class="dropdown">
                  <option disabled selected hidden>Select a tournament</option>
                  <option 
                    v-for="tournament in filteredTournaments"
                    v-bind:key="tournament._id"
                    v-bind:value="tournament._id"
                  >{{tournament.name}}</option>
                </select>
            </div>

            <div class="my-form-control">
                <label for="team1">Team 1:</label>
                <input
                  required
                  type="text" 
                  name="team1"
                  placeholder="Team 1"
                  v-model="team1">
            </div>

            <div class="my-form-control">
                <label for="team2">Team 2:</label>
                <input
                  required
                  type="text" 
                  name="team2"
                  placeholder="Team 2"
                  v-model="team2">
            </div>

            <div class="my-form-control">
                <label for="date">Date:</label>
                <input
                  required
                  type="date" 
                  name="date"
                  v-model="date">
            </div>

            <div class="row">

              <div class="my-form-control col-sm-6">
                  <label for="hour">Hour:</label>
                  <input
                    required
                    type="number"
                    min="1"
                    max="24"
                    placeholder="12"
                    name="hour"
                    v-model="hour">
              </div>

              <div class="my-form-control col-sm-6">
                  <label for="minute">Minute:</label>
                  <input
                    required
                    type="number"
                    min="0"
                    max="59"
                    placeholder="0"
                    name="minute"
                    v-model="minute">
              </div>

            </div>

            <div class="my-form-control">
                <label for="duration">Duration:</label>
                <input
                  required
                  type="number"
                  min="1"
                  max="360"
                  name="duration"
                  placeholder="minutes"
                  v-model="duration">
            </div>

            <div class="button-wrapper">
                <button 
                  type="submit" 
                  class="btn" 
                  id="submit"
                  v-bind:disabled="submitButtonDisabled" >Submit</button>
            </div>
        </form>

</template>

<script>
export default {
  name: 'Create',
  props: {
    sports: Array,
    tournaments: Array
  },
  computed: {
    sportNames() {
      return this.sports.map(sport => sport.name);
    },
    tournamentDisabled() {
      if(this.sport !== 'Select a sport') {
        return false;
      } else {
        return true;
      }
    },
    filteredTournaments() {
      return this.tournaments.filter(tournament => {
        if(tournament.sportId === this.sport) {
          return true
        } else {
          return false
        }
      });
    },
    submitButtonDisabled() {
      if(
        this.sport === 'Select a sport' || 
        this.tournament === 'Select a tournament' ||
        this.team1 === '' ||
        this.team2 === '' ||
        this.date === '' ||
        this.hour === '' ||
        this.minute === '' ||
        this.duration === '') {
        return true
      } else {
        return false
      }
    }
  },
  data() {
    return {
      sport: 'Select a sport',
      tournament: 'Select a tournament',
      team1: '',
      team2: '',
      date: '',
      hour: '',
      minute: '',
      duration: ''
    }
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();

      const match = {
        startTime: {
          date: this.date,
          hours: this.hour,
          minutes: this.minute
        },
        teams: [this.team1, this.team2],
        sportId: this.sport,
        tournamentId: this.tournament,
        duration: this.duration
      }

      const res = await fetch('api/matches/', {
        method: 'POST',
        body: JSON.stringify(match),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await res.json();

      console.log(data);

      if(data.insertedCount > 0) {
        this.$emit('match-created', data.match);
      }


      this.sport = 'Select a sport';
      this.tournament = 'Select a tournament';
      this.team1 = '';
      this.team2 = '';
      this.date = '';
      this.hour = '';
      this.minute = '';
      this.duration = '';
    }
  }
}
</script>

<style>
.match-form {
    width: 20rem;
    max-width: 90%;
    margin: auto;
    display: block;
}

.my-form-control {
  margin: 1rem 0;
}

.my-form-control label,
.my-form-control input,
.my-form-control select {
  display: block;
  width: 100%;
  margin-bottom: 0.25rem;
}

.my-form-control input {
  border: 1px solid #a1a1a1;
  font: inherit;
  border-radius: 5px;
  padding: 3px 5px;
}

.my-form-control select {
  border: 1px solid #a1a1a1;
  font: inherit;
  border-radius: 5px;
  padding: 3px 0px;
}

.my-form-control input:focus,
.my-form-control select:focus {
  outline-color: rgb(0, 102, 34);
}

.my-form-control input.invalid {
  border-color: rgb(231, 0, 0);
}

.button-wrapper{
  text-align: center;
}

#submit {
  background-color: rgb(0, 102, 34);
  color: white;
  transition: none;
}

#submit:hover {
  background-color: rgb(0, 143, 48);
}

#submit:focus {
  background-color: rgb(0, 75, 25);
  box-shadow: none;
}
</style>