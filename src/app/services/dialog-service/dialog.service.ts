import { Injectable } from '@angular/core';
import {DialogComponent} from '../../dialog/dialog.component';
import {Project} from '../../interfaces/project';
import {Resource} from '../../interfaces/resource';
import { BsModalService } from 'ngx-bootstrap/modal';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(public modalService: BsModalService) { }
  openDialogProject(project: Project): Observable<Project> {
    const state = {
      name: project.name,
      api: project.api,
      description: project.description,
      resources: project.resources
    };
    const dialogRef = this.modalService.show<DialogComponent>(DialogComponent, {initialState: state, class: 'modal-lg'});
    const subject = new Subject<Project>();
    dialogRef.content.onClose.subscribe(result => {
      subject.next(result);
    });
    return subject.asObservable();
  }
  openDialogResource(resource: Resource): Observable<any> {
    const state = {
      name: resource.name,
      api: resource.api,
      description: resource.description,
      action: resource.action
    };
    const dialogRef = this.modalService.show<DialogComponent>(DialogComponent, {initialState: state});
    const subject = new Subject<Resource>();
    dialogRef.content.onClose.subscribe(result => {
      subject.next(result);
    });
    return subject.asObservable();
  }
}
