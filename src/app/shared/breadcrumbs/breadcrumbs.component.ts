import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public pageTitle;
  public tituloSubs$: Subscription;

  
  constructor(private router: Router) {
    this.tituloSubs$ = this.getArgumentosRuta()
    .subscribe(title => {
      this.pageTitle=title
      document.title=`Admin-Pro - ${title}` 
    });
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }


  getArgumentosRuta() {
    return this.router.events
    .pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event:ActivationEnd) => event.snapshot.firstChild === null ),
      map( event =>  event.snapshot.data['titulo'])
    )
  }
}
