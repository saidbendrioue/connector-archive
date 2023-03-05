import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import {DropdownModule} from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConnectorService } from './services/connector.service';
import { ConnectorComponent } from './views/connector/connector-table.component';
import { ConnectorStepperComponent } from './views/connector-stepper/connector-stepper.component';
import { StepsModule } from 'primeng/steps';
import { DetectionTableComponent } from './views/detections-table/detections-table.component';
import { MnumberTableComponent } from './views/mnumber-table/mnumber-table.component';
import { PartNumberTableComponent } from './views/part-number-table/part-number-table.component';
import { DocumentTableComponent } from './views/document-table/document-table.component';
import { ColorTagComponent } from './views/widgets/color-tag/color-tag.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    StepsModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    RouterModule.forRoot([{ path: '', component: ConnectorComponent }]),
  ],
  declarations: [
    AppComponent,
    ConnectorComponent,
    ConnectorStepperComponent,
    DetectionTableComponent,
    MnumberTableComponent,
    PartNumberTableComponent,
    DocumentTableComponent,
    ColorTagComponent,
  ],
  bootstrap: [AppComponent],
  providers: [ConnectorService, MessageService, ConfirmationService],
})
export class AppModule {}
