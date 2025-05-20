import { PartialType } from '@nestjs/mapped-types';
import {  CreateUserFiz, CreateUserYur } from './create-user.dto';

export class UpdateUserYur extends PartialType(CreateUserYur) {}
export class UpdateUserFiz extends PartialType(CreateUserFiz) {}
