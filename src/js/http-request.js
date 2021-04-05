'use strict';
;(function () {
    var ajax = {
        formatParamsRequest: function (params, method) {
            if (typeof params === 'string') {
                return params;
            }

            var letter = (method.toLowerCase() === 'post') ? '' : '?';

            if (Array.isArray(params)) {
                return letter + params
                        .map(function (obj) {
                            return obj.name + "=" + obj.value;
                        })
                        .join("&");
            }

            return letter + Object
                    .keys(params)
                    .map(function (key) {
                        return key + "=" + params[key];
                    })
                    .join("&");
        },

        run: function (options) {
            var url = options.url,
                method = options.method,
                data = options.data,
                debug = options.debug,
                callback = options.callback,
                error = options.error;

            if (debug) {
                callback('test');
                return;
            }

            var async = (options.async === false) ? false : true;
            var xhr = new XMLHttpRequest();
            var params = ajax.formatParamsRequest(data, 'get');
            var body = null;

            if (method.toLowerCase() === 'post') {
                body = ajax.formatParamsRequest(data, 'post');
                params = '';
            }

            xhr.open(method, url + params, async);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    callback(this.responseText);
                } else {
                    error && error(this.responseText);
                }
            };

            xhr.send(body);
        }
    };

    window.ajax = ajax;
})();
