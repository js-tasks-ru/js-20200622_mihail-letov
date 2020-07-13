export default class SortableTable {

    constructor(header, options = { }) {
         
        this.header = header; 
       // this.header1 = header; 
        
        console.log(this.header);
        this.data = options.data || [];
        this.element = this.createSortable();
    }

    createSortable() {
        const table = document.createElement("div");
        table.setAttribute("class", "sortable-table");
        this.htmlHeader = this.createHeader();
        this.htmlBody = this.createBody();
        table.append(this.htmlHeader);
        table.append(this.htmlBody);
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

    reloadHeader() {
        const table = document.querySelector(".sortable-table");
        this.htmlHeader = this.createHeader();
        document.querySelector(".sortable-table__header").remove();
        table.prepend(this.htmlHeader);
    }

    reloadBody() {
        const table = document.querySelector(".sortable-table");
        this.htmlBody = this.createBody();
        document.querySelector(".sortable-table__body").remove();
        table.prepend(this.htmlBody);
    }

    sortByField(array, field, sortType = "string", order = "asc") {

        function compare(a, b) {                              
            if (a[field] === b[field]) return 0;
            const arRes = {
                "asc": {
                    "number": (parseInt(a[field]) > parseInt(b[field])) ? 1 : -1,
                    "string": a[field].localeCompare(b[field])
                },
                "desc": {
                    "number": (parseInt(a[field]) < parseInt(b[field])) ? 1 : -1,
                    "string": a[field].localeCompare(b[field]) * -1
                }
            };
            return arRes[order][sortType];
        }

        return array.sort(compare);
    }

    sort(field, order = "asc") {
            
        const columnSettings = this.header.filter(x => {
            x.id = field;
        });        
        console.log(this.header); 
        const sortType = (columnSettings && columnSettings.sortType) ? columnSettings.sortType : "string";
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

