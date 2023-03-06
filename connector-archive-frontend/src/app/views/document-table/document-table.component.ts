import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ROOT_FOLDER } from 'src/app/constants/environement';
import { Connector } from 'src/app/models/connector.model';
import { Doc } from 'src/app/models/doc.model';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-document-table',
  templateUrl: './document-table.component.html',
})
export class DocumentTableComponent {
  @Input() connector: Connector = {};
  @Output() onChange = new EventEmitter();

  constructor(private fileUploadService: FileUploadService) {}

  addDocuments(event: any) {
    if (event && event.files.length > 0) {
      this.fileUploadService
        .uploadFile(event.files, `${ROOT_FOLDER}/${this.connector?.id}/`)
        .subscribe({
          next(value) {},
          error(err) {
            alert('error');
          },
        });
      this.addDocumentsToConnectorList(event.files);
    }
  }
  addDocumentsToConnectorList(documents: any) {
    if (!this.connector.documents) {
      this.connector.documents = [];
    }
    documents.forEach((file: any) => {
      this.connector?.documents?.push({ filePath: file.name });
    });
    this.onChange.emit();
  }

  deleteDocument(index: number) {
    this.connector?.documents?.splice(index, 1);
    this.onChange.emit();
  }
}
