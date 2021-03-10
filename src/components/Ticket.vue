<template>
    <div class="card mt-2">
        <div class="card-header">Ticket</div>
        <div class="card-body" id="ticket-list">
            <ul class="list-group list-group-flush">
                <li 
                    class="list-group-item"
                    v-for="match in matches"
                    v-bind:key="match._id">
                    <span>{{match.teams[0]}} - {{match.teams[1]}} &nbsp; : &nbsp;&nbsp;</span>
                    <span>{{match.odds}}</span>
                </li>
            </ul>
            <ul>
                <p v-show="matches.length === 0">No match added</p>
            </ul>
        </div>
        <div class="card-footer">Total: {{sumOdds}}</div>
    </div>

</template>

<script>
export default {
    name: 'Ticket',
    props: {
        matches: Array
    },
    data() {
        return {
           summOdds: 0
        }
    },
    computed: {
        sumOdds() {
            let sum = 0;
            this.matches.forEach(match => {
                if(sum) {
                    sum = sum * match.odds;
                } else {
                    sum = match.odds;
                }
            });
            return sum.toFixed(2);
        }
    }
}
</script>

<style>
#ticket-list {
    max-height: 50vh;
    overflow:auto;
}
</style>