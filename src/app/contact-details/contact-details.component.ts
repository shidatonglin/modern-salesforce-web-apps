import { Component, Input, OnChanges } from '@angular/core';
import { Contact } from "../contact";

declare let sforce: any;
declare let d3: any;
declare let resources: any;

@Component({
  selector: 'contact-details',
  template: `
    <div>
      <h2>{{contact.name}} details!</h2>
      <svg id="details"></svg>
    </div>
  `
})
export class ContactDetailsComponent implements OnChanges {
  @Input()
  contact: Contact;

  draw(): void {
    d3.selectAll("#details > g").remove();
    let width = 420,
      height = 420,
      radius = Math.min(width, height) / 2,
      color = d3.scaleOrdinal(d3.schemeCategory20b),
      arc = d3.arc()
        .innerRadius(radius / 2)
        .outerRadius(radius),
      labelArc = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40),
      pie = d3.pie()
        // We don't want to start from biggest to
        // smallest values, don't sort original
        // data array.
        .sort(null)
        .value(function(d) {
          return d.sales;
        }),
      details = d3.select('#details')
        .attr('width', width)
        .attr('height', height)
        .append('g')
          .attr('transform', `translate(${width/2},${height/2})`);
    d3.csv(`${resources}/${this.contact.id}.csv`, (error, data) => {
      if (error) {
        throw error
      };

      let g = details.selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

      g.append("path")
      .attr("d", arc)
      .attr("stroke", "white")
      .attr("stroke-width", "3px")
      .style("fill", function(d) {
        return color(d.data.sales); 
      })
      .on("mouseover", function() {
        d3.select(this).style("opacity", "0.8");
      })
      .on("mouseout", function() {
        d3.select(this).style("opacity", "1");
      });

      g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .attr("fill", "white")
      .text(function(d) { return d.data.time; });
    });
  }

  ngOnChanges() {
    this.draw();
  }
}
