<template>
    <table class="table">
        <thead style="background-color:rgb(0, 102, 34);color:white">
            <tr>
                <th>{{tournament.name}}</th>
            </tr>
        </thead>
        <tbody>
            <table class="table table-hover">
                <thead style="background-color:rgb(200, 200, 200);color:rgb(50, 50, 50);">
                    <tr>
                        <th>Date</th>
                        <th>Minute</th>
                        <th>Team 1</th>
                        <th>Team 2</th>
                        <th>Score</th>
                        <th>Odds</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-bind:key="match.startTime"
                        v-for="match in tournament.matches"
                        v-on:click="onMatchClick(match)"
                        v-bind:class="{ 
                            addedToTicketClass: match.addedToTicket,
                            matchFinishedClass: match.finished
                        }"
                        class="match">
                        <td>{{(new Date(match.startTime)).toLocaleString()}}</td>
                        <td>{{match.minute}}</td>
                        <td>{{match.teams[0]}}</td>
                        <td>{{match.teams[1]}}</td>
                        <td>{{match.score.join(':')}}</td>
                        <td>{{match.odds}}</td>
                    </tr>
                </tbody>
            </table>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'Tournament',
    props: {
        tournament: Object
    },
    methods: {
        onMatchClick(match) {
            if(match.finished) {
                return;
            } else {
                if(match.addedToTicket) {
                    match.addedToTicket = !match.addedToTicket;
                } else {
                    match.addedToTicket = true;
                }
                this.$emit('match-click', match);
            }
        }
    }
}
</script>

<style>
.match {
    cursor: pointer;
}
.addedToTicketClass {
    background-color: lightgray;
}

.matchFinishedClass {
    background-color: coral;
    cursor: default;
}

.matches-head {
    background-color:rgb(200, 200, 200);
    color:rgb(50, 50, 50);
}
</style>