"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var constants_1 = require('../../constants');
var rxjs_1 = require('rxjs');
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
    }
    AuthService.prototype.login = function (username, password) {
        var url = constants_1.authEndpoint + "/login?username=" + username + "&password=" + password;
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AuthService.prototype.loginByEmail = function (email, password) {
        var url = constants_1.authEndpoint + "/login_by_email?email=" + email + "&password=" + password;
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AuthService.prototype.register = function (username, password, email) {
        var url = constants_1.authEndpoint + "/register";
        var params = { username: username, password: password, email: email };
        return this.http.post(url, JSON.stringify(params))
            .map(this.extractData)
            .catch(this.handleError);
    };
    AuthService.prototype.getUserData = function (username) {
        var url = constants_1.authEndpoint + "/user_data?username=" + username;
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AuthService.prototype.usernameExists = function (username) {
        var url = constants_1.authEndpoint + "/username?username=" + username;
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AuthService.prototype.extractData = function (res) {
        var body = res.json();
        console.log(body);
        return body.data || {};
    };
    AuthService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return rxjs_1.Observable.throw(errMsg);
    };
    AuthService = __decorate([
        core_1.Injectable()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
