export default class ColumnChart {

    constructor(options) { 

        this.options = options;
        this._element = this.renderChart();
        let chart = this._element.querySelector(".column-chart__chart");
        if (!this.isOptionsEmpty) this.fillChartData(chart);
      //  return this._element;
      
    }
   
    get element() 
    {
        return this._element;
    }

    set element(val) {
        this.element = val;
    }
  
    fillChartData(chart) {        
        chart.innerHTML = "";

        const maxEl = Math.max(...this.options.data);
        const coeff = this.chartHeight/Math.max(...this.options.data);
       // console.log(coeff);

        this.options.data.forEach(element => {
            const procent = Math.round((element*coeff)/(this.chartHeight/100));
            const column = document.createElement("div");
            column.setAttribute("style", `--value:${Math.trunc(element*coeff)}`);
            column.setAttribute("data-tooltip", `${procent}%`);
            chart.appendChild(column);
        });
    }

    renderChart() {

       const wrapper = document.createElement("div");

       wrapper.setAttribute("class", "column-chart");
       wrapper.setAttribute("style", `--chart-height: ${this.chartHeight}`);       
       //if (this.options && this.options.className) wrapper.classList.add(this.options.className);  
       if (this.isOptionsEmpty) wrapper.classList.add("column-chart_loading");  

       const title = document.createElement("div");        
       title.setAttribute("class", "column-chart__title");
       if (this.options && this.options.label)  title.innerHTML = this.options.label;

       if (this.options  && this.options.link) {
            const link = document.createElement("a");        
            link.setAttribute("class", "column-chart__link");
            link.setAttribute("href", this.options.link);
            title.append(link);
       }

        const container = document.createElement("div");        
        container.setAttribute("class", "column-chart__container");

        const header = document.createElement("div");
        header.setAttribute("class", "column-chart__header"); 
        if (this.options  && this.options.value) header.innerHTML = this.options.value; 

        const chart = document.createElement("div");
        chart.setAttribute("class", "column-chart__chart");    
        
        container.appendChild(header); 
        container.appendChild(chart);   

        wrapper.appendChild(title); 
        wrapper.appendChild(container);     
        
       // console.log("WRAPPER", wrapper);
        return wrapper;
    }

    get chartHeight() {
        return 50;
        //return Math.max(this.options.data);
    }

    get isOptionsEmpty() {
        return !(this.options && this.options.data && this.options.data.length > 0);
    }

    get childElementCount() {
        return this.isOptionsEmpty ? this.options.data.length : 0;
    }

    update(newOptions) {
        //console.log(this.options.data);
        this.options.data = newOptions.bodyData ?? [];
        let chart = this._element.querySelector(".column-chart__chart");
        this.fillChartData(chart);
    }

    remove() {
        this._element.remove();
    }

    destroy() {
        this.remove();
    }
    
}