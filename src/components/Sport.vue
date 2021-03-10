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
                v-for="tournament in sport.tournaments"
                v-bind:tournament="tournament"
                v-on:match-click="onMatchClick"
            />
        </tbody>
    </table>
</template>

<script>
import Tournament from './Tournaments'

export default {
    name: 'Sport',
    props: {
        sport: Object
    },
    components: {
        Tournament
    },
    emits: ['match-click'],
    methods: {
        onMatchClick(match) {
            this.$emit('match-click', match);
        }
    }
}
</script>

<style>

</style>