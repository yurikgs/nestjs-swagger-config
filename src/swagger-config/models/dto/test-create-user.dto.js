"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCreateUserDTO = void 0;
const decorators_1 = require("@nestjs/swagger/dist/decorators");
const class_validator_1 = require("class-validator");
const role_enum_1 = require("../../enums/role.enum");
class TestCreateUserDTO {
}
__decorate([
    (0, decorators_1.ApiProperty)({
        description: 'User Name',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TestCreateUserDTO.prototype, "name", void 0);
__decorate([
    (0, decorators_1.ApiProperty)({
        description: 'Email',
        uniqueItems: true,
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], TestCreateUserDTO.prototype, "email", void 0);
__decorate([
    (0, decorators_1.ApiProperty)({
        description: 'Password -- Alphanumeric',
        minLength: 6,
        maxLength: 32,
    }),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.MaxLength)(32),
    (0, class_validator_1.IsAlphanumeric)(),
    __metadata("design:type", String)
], TestCreateUserDTO.prototype, "password", void 0);
__decorate([
    (0, decorators_1.ApiProperty)({
        description: 'Role',
        enum: role_enum_1.Role,
        enumName: 'RolesEnum',
        default: 'User',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(role_enum_1.Role),
    __metadata("design:type", Object)
], TestCreateUserDTO.prototype, "role", void 0);
__decorate([
    (0, decorators_1.ApiProperty)({
        description: 'Birth Date -- aaaa-mm-dd',
        type: 'string',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Object)
], TestCreateUserDTO.prototype, "birthAt", void 0);
exports.TestCreateUserDTO = TestCreateUserDTO;
