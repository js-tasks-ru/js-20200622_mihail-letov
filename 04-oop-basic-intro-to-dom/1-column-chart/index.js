export default class ColumnChart {
		
    constructor(options = {}) { 

		this.options = options;
		this.options.data = options.data || [];
		this.chartHeight = 50;
		
        this.element = this.renderChart();
        let chart = this.element.querySelector(".column-chart__chart");
        if (this.options.data.length > 0) this.fillChartData(chart);
      
    }
		     
    fillChartData(chart) {        
        chart.innerHTML = "";

        const maxEl = Math.max(...this.options.data);
        const coeff = this.chartHeight/Math.max(...this.options.data);

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
        if (this.options.data.length === 0) wrapper.classList.add("column-chart_loading"); 
	   
        let link;        
	    if (this.options.link) {
            link = document.createElement("a");        
            link.setAttribute("class", "column-chart__link");
            link.setAttribute("href", this.options.link);  
            link.innerHTML = this.options.link;          
        }       
        
		wrapper.innerHTML = `
							  <div class="column-chart__title">${this.options.label || ""}${ link ? link.outerHTML : ""}</div>
							  <div class="column-chart__container">
								 <div class="column-chart__header">${this.options.value || ""}</div>
								 <div class="column-chart__chart"></div>
							  </div>
                            `;
        return wrapper;
    }

    update(newOptions = {}) {
        this.options.data = newOptions.bodyData || [];
        const chart = this.element.querySelector(".column-chart__chart");
        this.fillChartData(chart);
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
    }
    
}