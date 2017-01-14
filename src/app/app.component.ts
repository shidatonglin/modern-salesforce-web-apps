import { Component, OnInit } from '@angular/core';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { Contact } from "./contact";

declare let sforce: any;
declare let d3: any;

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>{{title}}</h1>
      <div class="grid">
        <div>
          <h2>My Contacts</h2>
          <div>
            <label>Find contact</label>
            <input #search (keyup)="draw(search.value);" placeholder="Search for names">
          </div>
          <svg id="chart"></svg>
        </div>
        <contact-details *ngIf="selectedContact" [contact]="selectedContact"></contact-details>
      </div>
    </div>
  `,
})

export class AppComponent implements OnInit {
  title: string = "Modern Salesforce Web App";
  contacts: Contact[] = JSON.parse(sforce.apex.execute("ngAppTest", "getContacts", {}));

  selectedContact: Contact;

  onSelect(contact: Contact): void {
    this.selectedContact = contact;
  }

  draw(searchTerm: string): void {
    // Clear SVG before drawing a new chart
    d3.selectAll("#chart > g").remove();
    let hue = 200,
        width = 420,
        barHeight = 30,
        index = 0,
        chart = d3.select("#chart")
          .attr("width", width)
          .attr("height", barHeight * this.contacts.length);

    this.contacts
      .filter(contact => {
        return contact.name.toLowerCase().includes(searchTerm.toLowerCase());
      })
      .map(contact => {
      let group = chart.append("g")
        .attr("transform", `translate(0, ${index * barHeight})`)
        .on("click", () => {
          this.onSelect(contact);
        });
      
      group.append("rect")
        .attr("width", contact.score*10)
        .attr("height", barHeight - 1)
        .style("fill", `hsl(${hue + contact.score*1.25},100%,50%)`);
      group.append("text")
        .attr("x", contact.score*10-5)
        .attr("y", barHeight / 2 )
        .attr("dy", ".35em")
        .style("fill", "white")
        .style("font", `14px "Roboto"`)
        .style("text-anchor", "end")
        .text(`${contact.name.split(" ")[0]} (${contact.score})`);
      index++;
    });
  }

  ngOnInit() {
    this.draw('');
  }
}
