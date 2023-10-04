<script lang="ts" setup >



const emit = defineEmits(["pagination-change-page"])
const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    },
    limit: {
        type: Number,
        default: 0
    },
    keepLength: {
        type: Boolean,
        default: false
    },
})

const onPaginationChangePage = (page: number) => {
    emit('pagination-change-page', page);
}

</script>
<template>
    <RenderlessPagination :data="props.data" :limit="props.limit" :keep-length="props.keepLength"
        @pagination-change-page="onPaginationChangePage" v-slot="slotProps">
        <nav class="pagination-items pagination-items-style1" v-bind="$attrs" aria-label="Pagination"
            v-if="slotProps.computed.total > slotProps.computed.perPage">
            <ul class="pagination mb--0">
                <li>
                    <a :disabled="!slotProps.computed.prevPageUrl" v-on="slotProps.prevButtonEvents">
                        <slot name="prev-nav">
                            <i class="fa fa-angle-left"></i>
                        </slot>
                    </a>
                </li>

                <li>
                    <a :class="props.data.current_page === page ? 'active' : ''"
                        :aria-current="slotProps.computed.currentPage ? 'page' : undefined"
                        v-for="(page, key) in slotProps.computed.pageRange" :key="key"
                        v-on="slotProps.pageButtonEvents(page)">
                        {{ page }}
                    </a>
                </li>
                <li>
                    <a :disabled="!slotProps.computed.nextPageUrl" v-on="slotProps.nextButtonEvents">
                        <slot name="next-nav">
                            <i class="fa fa-angle-right"></i>
                        </slot>
                    </a>
                </li>

            </ul>
        </nav>
    </RenderlessPagination>
</template>
<style scoped>
a {
    cursor: pointer;
}
</style>

