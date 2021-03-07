<template>
    <table class="table table-hover">
        <thead style="background-color:rgb(0, 51, 102);color:white;">
            <tr>
                <th>{{sport.name}}</th>
            </tr>
        </thead>
        <tbody>
            <Tournament 
                v-bind:key="tournament._id"
                v-for="tournament in uniqueSortedTournaments"
                v-bind:matches="getTournamentMatches(tournament._id)"
                v-bind:tournament="getTournament(tournament._id)"
                v-on:match-click="onClick"
            />
        </tbody>
    </table>
</template>

<script>
import Tournament from './Tournaments'

export default {
    name: 'Sport',
    props: {
        matches: Array,
        tournaments: Array,
        sport: Object
    },
    components: {
        Tournament
    },
    computed: {
        uniqueSortedTournaments() {
            let uniqueTournamentIds = this.matches
                .map(match => match.tournamentId)
                .filter((value, index, self) => self.indexOf(value) === index);

            let uniqueTournaments = [];
            uniqueTournamentIds.forEach(uniqueTournamentId => {
                this.tournaments.forEach(tournament => {
                if(tournament._id === uniqueTournamentId) {
                    uniqueTournaments.push(tournament);
                }
                })
            })

            uniqueTournaments.sort((a, b) => {
                return a.priority - b.priority;
            })

            return uniqueTournaments;
        }
    },
    data() {
        return {

        }
    },
    emits: ['match-click'],
    methods: {
        getTournament(id) {
            return this.tournaments.filter(tournament => tournament._id === id)[0]
        },
        getTournamentMatches(tournamentId) {
            return this.matches
                .map(match => {
                    if(match.tournamentId === tournamentId) {
                        return match;
                    }
                })
                .filter(match => {
                    return match !== undefined;
                });
        },
        onClick(match) {
            this.$emit('match-click', match);
        }
    },
    async created() {
        
    }
}
</script>

<style>

</style>