import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ChartistModule } from "ng-chartist";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ChartistModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
