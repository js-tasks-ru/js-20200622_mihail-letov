export default class SortableTable {

    constructor(header, options = { }) {
         
        this.header = header;         
        this.data = options.data || [];
        this.element = this.createSortable();
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

        this.header.forEach(fieldSettings => {
            const template = `<div class="sortable-table__cell" data-name="${fieldSettings.id}" data-sortable="">
                                <span>${fieldSettings.title}</span>
                            </div>`; 
            htmlHeader.innerHTML += template;
        });
        return htmlHeader;
    }

    createBody() {

        const htmlBody = document.createElement("div");
        htmlBody.setAttribute("data-element", "body");
        htmlBody.setAttribute("class", "sortable-table__body");

        this.data.forEach(row => {
            const link = document.createElement("a");
            link.setAttribute("class", "sortable-table__row");
            if (row["id"]) link.setAttribute("href", `/products/${row["id"]}`);
            this.header.forEach(column => {
                const fieldName = column.id;
                const template = column.template ? column.template(row[fieldName]) : `<div class="sortable-table__cell">${row[fieldName]}</div>`;
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
        this.htmlBody = this.createBody();
        const oldBody = table.querySelector(".sortable-table__body");
        if (oldBody) oldBody.remove();
        table.prepend(this.htmlBody);
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
          
        const columnSettings = this.header.filter(x => {
            return (x["id"] === field);
        });        
        
        const sortType = (columnSettings && columnSettings.length && columnSettings[0].sortType) ? columnSettings[0].sortType : "string";        
        this.data = this.sortByField(this.data, field, sortType, order);
        this.reloadHeader();
        this.reloadBody();
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

