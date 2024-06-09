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
  Res,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { GenericErrorHandler } from '@ats-backend/app/utils/error-handling';
import { ROUTES } from '@nestjs/core/router/router-module';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

const Routes = {
  ROOT: '/tenant',
  GET: '/',
  CREATE: '/',
  UPDATE: '/:id',
  DELETE: '/:id',
  FIND_BY_ID: '/:id',
};

@Controller(Routes.ROOT)
export class TenantController {
  private readonly logger = new Logger(TenantController.name);
  constructor(
    private readonly _tenantService: TenantService,
    private readonly _genericErrorHandler: GenericErrorHandler
  ) {}

  @Get(Routes.GET)
  async findAll(@Res() res) {
    try {
      const tenants = await this._tenantService.findAll();
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

  @Get(Routes.FIND_BY_ID)
  async findById(@Res() res, @Param('id') id: string) {
    try {
      const tenant = await this._tenantService.findById(id);
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
      this.logger.error('Failed to fetch tenant', error);
      return res
        .status(httpStatus)
        .json({ statusCode: 'ERROR', message: errMessage });
    }
  }

  @Post(Routes.CREATE)
  async create(@Res() res, @Body() createTenantDto: CreateTenantDto) {
    try {
      const newTenant = await this._tenantService.create(createTenantDto);
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

  @Put(Routes.UPDATE)
  async update(
    @Res() res,
    @Body() updateTenantDto: UpdateTenantDto,
    @Param('id') id: string
  ) {
    try {
      const newTenant = await this._tenantService.update(id, updateTenantDto);
      return res.status(HttpStatus.OK).json(newTenant);
    } catch (error) {
      const { httpStatus, errMessage } =
        this._genericErrorHandler.handleException(error);
      this.logger.error(
        'Failed to update tenant',
        { id, updateTenantDto },
        error
      );
      return res
        .status(httpStatus)
        .json({ statusCode: 'ERROR', message: errMessage });
    }
  }

  @Delete(Routes.DELETE)
  async delete(@Res() res, @Param('id') id: string) {
    try {
      const tenant = await this._tenantService.delete(id);
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
