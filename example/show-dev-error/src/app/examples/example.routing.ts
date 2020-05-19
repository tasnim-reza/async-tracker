import { Routes } from '@angular/router';
import { ExampleLayoutComponent } from './example-layout/example-layout.component';
import { BasicSetTimeoutComponent } from './basic-settimeout/basic-settimeout.component';
import { HttpErrorClientSideComplexComponent } from './http-error-client-side-complex/http-error-client-side-complex.component';

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
        component: HttpErrorClientSideComplexComponent
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
