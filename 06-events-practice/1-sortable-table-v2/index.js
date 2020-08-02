export default class SortableTable {

    constructor(header, options = { }) {
        
        this.sortField = "title";
        this.sortOrder = "desc";
        this.header = header;         
        this.data = options.data || [];

        this.sortData(this.sortField, this.sortOrder);
        this.element = this.createSortable();
       // this.clearArrows();
    }

    clearArrows() {
        const arrow = this.element.querySelector(".sortable-table__sort-arrow");
        arrow.remove();
    }

    get subElements() {
        return {
            header: this.htmlHeader,
            body: this.body
        };
    }

    createSortable() {
        const table = document.createElement("div");
        table.setAttribute("class", "sortable-table");
        this.reloadHeader(table);
        this.reloadBody(table);
        return table;
    }

    createHeader() {
        const htmlHeader = document.createElement("div");
        htmlHeader.setAttribute("data-element", "header");
        htmlHeader.setAttribute("class", "sortable-table__header sortable-table__row");

        this.header.forEach(column => {
            const sortable = column.sortable ? "true" : "false";
            const sortArrow = (this.sortField === column.id) ? `<span data-element="arrow" class="sortable-table__sort-arrow">
                                                                    <span class="sort-arrow"></span>
                                                                </span>` : "";
            const dataOrder = (this.sortField === column.id) ? `data-order="${this.sortOrder}"` : "";
            const dataId = (this.sortField === column.id) ? `data-id="${column.id}"` : "";
            //${dataId}
            const template = `<div class="sortable-table__cell" data-id="${column.id}" data-sortable="${sortable}" ${dataOrder}>
                                <span>${column.title}</span>
                                ${sortArrow}
                            </div>`; 
            htmlHeader.innerHTML += template;
        });
        
        this.addSortHandlers(htmlHeader);

        return htmlHeader;
    }

    addSortHandlers(htmlHeader) {

        const thisSortTable = this;

        const sortableHeaders = htmlHeader.querySelectorAll(`div[data-sortable]`);
        if (sortableHeaders.length) {
            sortableHeaders.forEach(column => {
                column.addEventListener("click", function(event){
                    const newSortField = event.currentTarget.getAttribute("data-id");
                    if (newSortField === thisSortTable.sortField && thisSortTable.sortOrder === "desc") {
                        thisSortTable.sortOrder = "asc";
                    }
                    else {
                        thisSortTable.sortOrder = "desc";
                    }
                    thisSortTable.sortField = newSortField;
                    thisSortTable.sortData(thisSortTable.sortField, thisSortTable.sortOrder);    
                    thisSortTable.reloadTable();      
                    
                   // thisSortTable.clearArrows();
                });
            });        
        }
    }

    createBody() {

        const htmlBody = document.createElement("div");
        htmlBody.setAttribute("data-element", "body");
        htmlBody.setAttribute("class", "sortable-table__body");

        this.data.forEach(row => {
            const link = document.createElement("div");
            link.setAttribute("class", "sortable-table__row");
            //if (row["id"]) link.setAttribute("href", `/products/${row["id"]}`);
            this.header.forEach(column => {  
                const template = column.template ? column.template(row[column.id]) : `<div class="sortable-table__cell">${row[column.id]}</div>`;
                link.innerHTML += template;
            });
            htmlBody.append(link);
        });    
        return htmlBody;

    }

    reloadHeader(table) {
        table = table || document.querySelector(".sortable-table");
        this.htmlHeader = this.createHeader();
        const oldHeader = table.querySelector(".sortable-table__header");
        if (oldHeader) oldHeader.remove();
        table.prepend(this.htmlHeader);        
    }

    reloadBody(table) {
        table = table || document.querySelector(".sortable-table");
        this.body = this.createBody();
        const oldBody = table.querySelector(".sortable-table__body");
        if (oldBody) oldBody.remove();
        table.append(this.body);
    }

    reloadTable(table) {
        this.reloadHeader(table);
        this.reloadBody(table);  
    }

    sortByField(array, field, sortType = "string", order = "asc") {

       function compareByType(a, b) {
           if (sortType === "number") {
                return (parseInt(a[field]) > parseInt(b[field])) ? 1 : -1;
           }
           else {
               return a[field].localeCompare(b[field], "ru", { sensitivity: 'base' });
           }
       }

        function compare(a, b) {                           
            if (a[field] === b[field]) return 0;
            const arRes = {
                "asc": compareByType(a, b),
                "desc": compareByType(a, b)*-1
            };
            return arRes[order];
        }

        return array.sort(compare);
    }

    sort(field, order = "asc") {          
        this.sortOrder = order;
        this.sortData(sort, order);
        this.reloadTable();
        this.clearArrows();
    }

    sortData(field, order = "asc") {
        const columnSettings = this.header.filter(x => {
            return (x["id"] === field);
        });                
        const sortType = (columnSettings && columnSettings.length && columnSettings[0].sortType) ? columnSettings[0].sortType : "string";        
        this.data = this.sortByField(this.data, field, sortType, order);
    }

    remove() {
        if (this.element) {
            this.element.remove();
        }
    }

    destroy() {
        this.remove();
    }
}

