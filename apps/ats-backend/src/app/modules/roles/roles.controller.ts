import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import {
  Permissions,
  definePermissions,
} from '@ats-backend/app/shared/decorators/permission.decorator';
import { RolesService } from './roles.service';
import { CreateRolesDto } from './dto/create-role.dto';
import { GenericErrorHandler } from '../../utils/error-handling';
import { UpdateRoleDto } from './dto/update-role.dto';

const Routes = {
  ROOT: '/roles',
  READ: '/',
  CREATE: '/',
  UPDATE: '/:id',
  DELETE: '/:id',
  READ_PERMISSIONS: '/permissions',
};

const permissions = {
  READ: 'read',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  READ_PERMISSIONS: 'read_permissions',
};

definePermissions('app:roles', Object.values(permissions));

@Controller(Routes.ROOT)
export class RolesController {
  private readonly logger = new Logger(RolesController.name);
  constructor(
    private readonly _rolesService: RolesService,
    private readonly _genericErrorHandler: GenericErrorHandler
  ) {}

  @Permissions([permissions.READ])
  @Get(Routes.READ)
  async findAll(@Req() { tenant_id }, @Res() res) {
    try {
      const tenants = await this._rolesService.findAll(tenant_id);
      return res.status(HttpStatus.OK).json(tenants);
    } catch (error) {
      const { httpStatus, errMessage } =
        this._genericErrorHandler.handleException(error);
      this.logger.error('Failed to fetch all tenants', error);
      return res
        .status(httpStatus)
        .json({ statusCode: 'ERROR', message: errMessage });
    }
  }

  @Permissions([permissions.READ_PERMISSIONS])
  @Get(Routes.READ_PERMISSIONS)
  async findPermission(@Res() res) {
    try {
      const tenants = await this._rolesService.getPermissions();
      return res.status(HttpStatus.OK).json(tenants);
    } catch (error) {
      const { httpStatus, errMessage } =
        this._genericErrorHandler.handleException(error);
      this.logger.error('Failed to fetch all permissions', error);
      return res
        .status(httpStatus)
        .json({ statusCode: 'ERROR', message: errMessage });
    }
  }

  @Permissions([permissions.CREATE])
  @Post(Routes.CREATE)
  async create(
    @Req() { tenant_id },
    @Res() res,
    @Body() createTenantDto: CreateRolesDto
  ) {
    try {
      const newTenant = await this._rolesService.create(
        tenant_id,
        createTenantDto
      );
      return res.status(HttpStatus.CREATED).json(newTenant);
    } catch (error) {
      const { httpStatus, errMessage } =
        this._genericErrorHandler.handleException(error);
      this.logger.error('Failed to create tenant', createTenantDto, error);
      return res
        .status(httpStatus)
        .json({ statusCode: 'ERROR', message: errMessage });
    }
  }

  @Permissions([permissions.UPDATE])
  @Put(Routes.UPDATE)
  async update(
    @Req() { tenant_id },
    @Res() res,
    @Body() updateRoleDto: UpdateRoleDto,
    @Param('id') id: string
  ) {
    try {
      const newTenant = await this._rolesService.update(
        tenant_id,
        id,
        updateRoleDto
      );
      return res.status(HttpStatus.OK).json(newTenant);
    } catch (error) {
      const { httpStatus, errMessage } =
        this._genericErrorHandler.handleException(error);
      this.logger.error(
        'Failed to update tenant',
        { id, updateRoleDto },
        error
      );
      return res
        .status(httpStatus)
        .json({ statusCode: 'ERROR', message: errMessage });
    }
  }

  @Permissions([permissions.DELETE])
  @Delete(Routes.DELETE)
  async delete(@Res() res, @Param('id') id: string) {
    try {
      const tenant = await this._rolesService.delete(id);
      if (!tenant) {
        this.logger.error(`Tenant with ${id} not found.`);
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Tenant Not Found' });
      }
      return res.status(HttpStatus.OK).json(tenant);
    } catch (error) {
      const { httpStatus, errMessage } =
        this._genericErrorHandler.handleException(error);
      this.logger.error(`Failed to delete tenant with id = ${id}`, error);
      return res
        .status(httpStatus)
        .json({ statusCode: 'ERROR', message: errMessage });
    }
  }
}
