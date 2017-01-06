"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var RegisterFormComponent = (function () {
    function RegisterFormComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.username = '';
        this.password = '';
        this.password2 = '';
        this.email = '';
        this.registered = false;
        this.usernameExists = false;
        this.emailNotUnique = false;
        this.onRegisteredChange = new core_1.EventEmitter();
    }
    RegisterFormComponent.prototype.ngOnInit = function () {
    };
    RegisterFormComponent.prototype.register = function () {
        var _this = this;
        this.authService.register(this.username, this.password, this.email)
            .subscribe(function (result) {
            _this.onRegister(result);
        }, function (error) { return console.log(error); });
    };
    RegisterFormComponent.prototype.onRegister = function (result) {
        this.registered = result;
        this.onRegisteredChange.emit(result);
        if (result) {
            this.router.navigate(['/']);
        }
    };
    RegisterFormComponent.prototype.checkUsernameExists = function () {
        var _this = this;
        this.authService.usernameExists(this.username)
            .subscribe(function (success) { return _this.usernameExists = success; }, function (error) { return console.log(error); });
    };
    RegisterFormComponent.prototype.checkEmailUnique = function () {
        var _this = this;
        this.authService.checkEmailUnique(this.email)
            .subscribe(function (success) { return _this.emailNotUnique = success; }, function (error) { return console.log(error); });
    };
    __decorate([
        core_1.Output()
    ], RegisterFormComponent.prototype, "onRegisteredChange", void 0);
    RegisterFormComponent = __decorate([
        core_1.Component({
            selector: 'app-register-form',
            templateUrl: 'register-form.component.html',
            styleUrls: ['register-form.component.css']
        })
    ], RegisterFormComponent);
    return RegisterFormComponent;
}());
exports.RegisterFormComponent = RegisterFormComponent;
