

// array in local storage for registered users
const categoriesKey = 'react-and-redux-categories';
let categories = JSON.parse(localStorage.getItem(categoriesKey)) || [];

function fakeBackendCategory() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                switch (true) {
                    case url.endsWith('/categories/create') && opts.method === 'POST':
                        return create();
                    case url.endsWith('/categories') && opts.method === 'GET':
                        return getCategories();
                    case url.match(/\/categories\/\d+$/) && opts.method === 'GET':
                        return getCategoryById();
                    case url.match(/\/categories\/\d+$/) && opts.method === 'PUT':
                        return updateCategory();
                    case url.match(/\/categories\/\d+$/) && opts.method === 'DELETE':
                        return deleteCategory();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function create() {
                const category = body();

                if (categories.find(x => x.name === category.name)) {
                    return error('Category "' + category.name + '" is already taken')
                }

                category.id = categories.length ? Math.max(...categories.map(x => x.id)) + 1 : 1;
                categories.push(category);
                localStorage.setItem(categoriesKey, JSON.stringify(categories));
                return ok();
            }

            function getCategories() {
                if (!isAuthenticated()) return unauthorized();
                return ok(categories.map(x => basicDetails(x)));
            }

            function getCategoryById() {
                if (!isAuthenticated()) return unauthorized();

                const category = categories.find(x => x.id === idFromUrl());
                return ok(basicDetails(category));
            }

            function updateCategory() {
                if (!isAuthenticated()) return unauthorized();

                let params = body();
                let category = categories.find(x => x.id === idFromUrl());

                // only update password if entered
                //if (!params.named) {
                    delete params.name;
               // }

                // if username changed check if taken
                //if (params.name !== category.name && categories.find(x => x.name === params.name)) {
                 //   return error('Username "' + params.name + '" is already taken')
                //}

                // update and save user
                Object.assign(category, params);
                localStorage.setItem(categoriesKey, JSON.stringify(categories));

                return ok();
            }

            function deleteCategory() {
                if (!isAuthenticated()) return unauthorized();

                categories = categories.filter(x => x.id !== idFromUrl());
                localStorage.setItem(categoriesKey, JSON.stringify(categories));
                return ok();
            }

            // helper functions

            function ok(body) {
                resolve({ ok: true, ...headers(), json: () => Promise.resolve(body) })
            }

            function unauthorized() {
                resolve({ status: 401, ...headers(), json: () => Promise.resolve({ message: 'Unauthorized' }) })
            }

            function error(message) {
                resolve({ status: 400, ...headers(), json: () => Promise.resolve({ message }) })
            }

            function basicDetails(category) {
                const { id, name, description } = category;
                return { id, name, description };
            }

            function isAuthenticated() {
                return opts.headers['Authorization'] === 'Bearer fake-jwt-token';
            }

            function body() {
                return opts.body && JSON.parse(opts.body);
            }

            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }

            function headers() {
                return {
                    headers: {
                        get(key) {
                            return ['application/json'];
                        }
                    }
                }
            }
        });
    }
}

export { fakeBackendCategory };