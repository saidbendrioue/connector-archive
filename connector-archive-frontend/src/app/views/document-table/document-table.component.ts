import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ROOT_FOLDER } from 'src/app/constants/environement';
import { Connector } from 'src/app/models/connector.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-document-table',
  templateUrl: './document-table.component.html',
})
export class DocumentTableComponent implements OnInit{
  @Input() connector: Connector = {};
  @Output() onChange = new EventEmitter();

  constructor(
    private _fileUploadService: FileUploadService,
    private _sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
  }

  addDocuments(event: any) {
    if (event && event.files.length > 0) {
      this._fileUploadService
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

  getFile(fileName: string) {
    this._fileUploadService
      .getFile(`${ROOT_FOLDER}/${this.connector.id}/${fileName}`)
      .subscribe({
        next:(blob) => {
          var url = window.URL.createObjectURL(blob);
          var anchor = document.createElement("a");
          anchor.download = fileName;
          anchor.href = url;
          anchor.click();
        },
      });
  }
}
