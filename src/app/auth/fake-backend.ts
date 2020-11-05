import { Injectable, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize, startWith } from 'rxjs/operators';
import { User } from '../models/user';
import { Form } from '../models/form';


const users: User[] = [
    { id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }
];

const forms: Form[] = [
    {  title: 'f1',
        notification_emails: ['frsfsr'],
        upload_id: 'gt',
        source_file: 'source',
        recipient_templates: [{
            label: 'label',
            number: 1,
            random: 'rkjbfsfe',
        }],
        inputs: [{
            type: 'ead',
            label: 'gt',
            x: 124,
            y: 35,
            width: 125,
            height: 15,
            value: 'fr',
            recipients: [1, 2, 3],
        }],
    }, {  title: 'f2',
    notification_emails: ['frsfsr'],
    upload_id: 'gt',
    source_file: 'source',
    recipient_templates: [{
        label: 'label',
        number: 1,
        random: 'rkjbfsfe',
    }],
    inputs: [{
        type: 'ead',
        label: 'gt',
        x: 124,
        y: 35,
        width: 125,
        height: 15,
        value: 'fr',
        recipients: [1, 2, 3],
    }],
    }, {  title: 'f2',
    notification_emails: ['frsfsr'],
    upload_id: 'gt',
    source_file: 'source',
    recipient_templates: [{
        label: 'label',
        number: 1,
        random: 'rkjbfsfe',
    }],
    inputs: [{
        type: 'ead',
        label: 'gt',
        x: 124,
        y: 35,
        width: 125,
        height: 15,
        value: 'fr',
        recipients: [1, 2, 3],
    }],
    },
];

const PDFForm = {
    title: "New Testtr test", 
    notification_emails: [
        "shadyhossin@gmail.com",
        "dummy@email.com"
    ],
    direction: "rtl",
    language: "he",
    reference_width: 800,
    upload_id: "5f79ce03d947f57a9875cfd2",
    recipient_templates: [{
        label: "Recipient 1",
        number: 1
    }],
    inputs: [{
        id:'5f79ce350ef6624e7737cf3315',
        type: "text",
        label: "first name",
        x: 0,
        y: 0,
        width: 165.6,
        height: 28,
        value: "Default Value",
        recipients: [1]
    }, {
        id:'5f79ce350ef6624e7737cf3314',
        type: "checkbox",
        label: "gender",
        x: 100,
        y: 180.2,
        recipients: [1]
    }, {
        id:'5f79ce350ef6624e7737cf3313',
        type: "date",
        label: "gender",
        x: 200,
        value:'2020-10-27',
        y: 180.2,
        recipients: [1]
    }, {
        id:'5f79ce350ef6624e7737cf3312',
        type: "textarea",
        label: "gender",
        x: 400,
        y: 180.2,
        value: "this is a text area . TEST",
        recipients: [1]
    }, {
        id:'5f79ce350ef6624e7737cf331',
        type: "signature",
        label: "gender",
        x: 270,
        y: 220.2,
        recipients: [1]
    }
]
}


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(200))
            .pipe(dematerialize());

        function handleRoute(): Observable<HttpResponse<any>> | Observable<HttpEvent<any>> {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.startsWith('/eforms/forms') && method === 'GET':
                    return getForms();
                case url.endsWith('/uploads') && method === 'POST':
                    return upload();
                case url.includes('eforms/records/') && method === 'GET':
                    return getPDF();
                default:
                    return next.handle(request);
            }
        }

        // route functions
        function upload(): any {
            return {
                success: 'true',
                data: {
                  url: 'storage/uploads/W9VyaiT61Nhm1Oq964B6VkBfGGsLhe9FqE0savZ7.pdf',
                  title: 'CV-2.pdf',
                  user_id: 1,
                  updated_at: '2020-10-01T21:19:22.061000Z',
                  created_at: '2020-10-01T21:19:22.061000Z',
                  _id: '5f7647daa829e753eb384af3'
                }
              }
        }

        // get PDF
        function getPDF(): any {
            return ok(PDFForm)
        }

        function authenticate(): Observable<HttpResponse<any>> {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) { return error('Username or password is incorrect'); }
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
            });
        }

        function getUsers(): Observable<HttpResponse<any>> {
            if (!isLoggedIn()) { return unauthorized(); }
            return ok(users);
        }

        function getForms(): Observable<HttpResponse<any>> {
            if (!isLoggedIn()) { return unauthorized(); }
            return ok({items: forms, total_count: forms.length});
        }

        function ok(bodyValue?): Observable<HttpResponse<any>> {
            return of(new HttpResponse({ status: 200, body: bodyValue }));
        }

        function error(message): Observable<never> {
            return throwError({ error: { message } });
        }

        function unauthorized(): Observable<never> {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn(): boolean {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
