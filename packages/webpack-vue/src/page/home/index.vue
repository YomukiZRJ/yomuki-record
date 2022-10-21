<template>
	<div>hi{{ b }}{{ a }}</div>
</template>
<script setup>
import { chunk } from "lodash-es";
import { ref } from "vue";
import { a } from "@/libs/test";
const b = ref("123");
chunk([1, 2, 3], 2);
</script>
