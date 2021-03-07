<template>
    <header class="main-header">
        <nav class="main-header__nav">
            <ul class="main-header__item-list bg-dark">
                <li class="main-header__item">
                    <router-link to="/" class="nav-link">Home</router-link>
                </li>
                <li class="main-header__item">
                    <router-link to="/about" class="nav-link">Create</router-link>
                </li>
                <li class="main-header__item-email">
                simun.terzanovic@gmail.com
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'Navigation'
}
</script>

<style>

.main-header__item-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

.main-header__item {
    float: left;
}

.main-header__item a {
    text-decoration: none;
    display: block;
    color: white;
    text-align: center;
    padding: 13px 26px;
    transition: background-color 0.15s;
    transition-timing-function: linear;
}

.main-header__item a:hover,
.main-header__item a:active,
.main-header__item a.active {
    background-color:rgb(0, 102, 34);
    color:white;
}

.main-header__item-email {
    float: right;
    padding-top: 12px;
    padding-right: 26px;
    color: white;
    display: block;
    text-align: center;
}

</style>