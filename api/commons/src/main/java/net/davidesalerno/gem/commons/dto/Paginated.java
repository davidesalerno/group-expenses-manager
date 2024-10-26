package net.davidesalerno.gem.commons.dto;

import java.util.List;

public class Paginated<T>{
    private List<T> items;
    private Integer page;
    private Boolean hasMore;

    public Paginated(List<T> items, Integer page, Boolean hasMore) {
        this.items = items;
        this.page = page;
        this.hasMore = hasMore;
    }


    public List<T> getItems() {
        return items;
    }

    public void setItems(List<T> items) {
        this.items = items;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Boolean getHasMore() {
        return hasMore;
    }

    public void setHasMore(Boolean hasMore) {
        this.hasMore = hasMore;
    }

    //Builder Class
    public static class PaginatedBuilder<T>{
        private List<T> items;
        private Integer page;
        private Boolean hasMore;

        public PaginatedBuilder(List<T> items, Integer page, Boolean hasMore) {
            this.items = items;
            this.page = page;
            this.hasMore = hasMore;
        }

        public PaginatedBuilder() {
        }

        public PaginatedBuilder<T> items(List<T> items){
            this.items = items;
            return this;
        }
        public PaginatedBuilder<T> page(Integer page){
            this.page = page;
            return this;
        }

        public PaginatedBuilder<T> hasMore(Boolean hasMore){
            this.hasMore = hasMore;
            return this;
        }

        public Paginated<T> build(){
            return new Paginated<>(items,page,hasMore);
        }
    }

}
