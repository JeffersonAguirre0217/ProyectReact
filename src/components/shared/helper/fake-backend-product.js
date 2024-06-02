// array in local storage for registered users
const productsKey = 'react-and-redux-products';
let products = JSON.parse(localStorage.getItem(productsKey)) || [];

function fakeBackendProduct() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                switch (true) {
                    case url.endsWith('/products/create') && opts.method === 'POST':
                        return create();
                    case url.endsWith('/products') && opts.method === 'GET':
                        return getProducts();
                    case url.match(/\/products\/\d+$/) && opts.method === 'GET':
                        return getProductById();
                    case url.match(/\/products\/\d+$/) && opts.method === 'PUT':
                        return updateProduct();
                    case url.match(/\/products\/\d+$/) && opts.method === 'DELETE':
                        return deleteProduct();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function create() {
                const product = body();

                if (products.find(x => x.name === product.name)) {
                    return error('Product "' + product.name + '" is already taken')
                }

                product.id = products.length ? Math.max(...products.map(x => x.id)) + 1 : 1;
                products.push(product);
                localStorage.setItem(productsKey, JSON.stringify(products));
                return ok();
            }

            function getProducts() {
                if (!isAuthenticated()) return unauthorized();
                return ok(products.map(x => basicDetails(x)));
            }

            function getProductById() {
                if (!isAuthenticated()) return unauthorized();

                const product = products.find(x => x.id === idFromUrl());
                return ok(basicDetails(product));
            }

            function updateProduct() {
                if (!isAuthenticated()) return unauthorized();

                let params = body();
                let product = products.find(x => x.id === idFromUrl());

                // only update password if entered
                //if (!params.named) {
                    delete params.name;
               // }

                // if username changed check if taken
                //if (params.name !== category.name && categories.find(x => x.name === params.name)) {
                 //   return error('Username "' + params.name + '" is already taken')
                //}

                // update and save user
                Object.assign(product, params);
                localStorage.setItem(productsKey, JSON.stringify(products));

                return ok();
            }

            function deleteProduct() {
                if (!isAuthenticated()) return unauthorized();

                products = products.filter(x => x.id !== idFromUrl());
                localStorage.setItem(productsKey, JSON.stringify(products));
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

            function basicDetails(product) {

                const { id, file, name, cant, price, category, categoryDescription } = product;
                return { id, file, name, cant, price,  category, categoryDescription };
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

export { fakeBackendProduct };