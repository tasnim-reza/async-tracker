import { Routes } from '@angular/router';
import { ExampleLayoutComponent } from './example-layout/example-layout.component';
import { BasicSetTimeoutComponent } from './basic-settimeout/basic-settimeout.component';
import { HttpErrorClientSideComponent } from './http-error-client-side/http-error-client-side.component';

const childExampleRoutes: Routes = [
    {
        path: '',
        component: BasicSetTimeoutComponent
    },
    {
        path: 'settimeout',
        component: BasicSetTimeoutComponent
    },
    {
        path: 'xmlhttprequest',
        component: HttpErrorClientSideComponent
    }
]

export const ExampleRoutes: Routes = [
    {
        path: '',
        component: ExampleLayoutComponent,
        children: childExampleRoutes
    },
    {
        path: 'example',
        component: ExampleLayoutComponent,
        children: childExampleRoutes
    },
];
