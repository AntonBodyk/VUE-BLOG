<template>
    <a-space>
        <a-button class="new-post" style="width: 150px; height: 40px;">
            <slot></slot>
        </a-button>
    </a-space>
</template>

<script>
export default{
    name: 'default-button'
}
</script>

<style>
.new-post{
    margin: 30px 0 0 100px;
}

</style>