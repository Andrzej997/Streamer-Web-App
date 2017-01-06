"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var LoginFormComponent = (function () {
    function LoginFormComponent(authSevice, router) {
        this.authSevice = authSevice;
        this.router = router;
        this._loggedIn = false;
        this.registerMode = false;
        this.userName = '';
        this.password = '';
    }
    LoginFormComponent.prototype.ngOnInit = function () {
    };
    LoginFormComponent.prototype.onSubmit = function () {
        this.login();
    };
    LoginFormComponent.prototype.login = function () {
        var _this = this;
        if (!this.userName || !this.password) {
            return;
        }
        else if (this.userName.indexOf('@') < 0) {
            this.authSevice.login(this.userName, this.password)
                .subscribe(function (success) { return _this._loggedIn = success; }, function (error) { return _this.errorMessage = error; });
        }
        else {
            this.authSevice.loginByEmail(this.userName, this.password)
                .subscribe(function (success) { return _this._loggedIn = success; }, function (error) { return _this.errorMessage = error; });
        }
    };
    Object.defineProperty(LoginFormComponent.prototype, "loggedIn", {
        get: function () {
            return this._loggedIn;
        },
        set: function (value) {
            this._loggedIn = value;
        },
        enumerable: true,
        configurable: true
    });
    LoginFormComponent = __decorate([
        core_1.Component({
            selector: 'app-login-form',
            templateUrl: './login-form.component.html',
            styleUrls: ['./login-form.component.css']
        })
    ], LoginFormComponent);
    return LoginFormComponent;
}());
exports.LoginFormComponent = LoginFormComponent;
