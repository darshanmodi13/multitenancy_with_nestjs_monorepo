import {
  BadRequestException,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantService } from '@ats-backend/app/modules/tenant/tenant.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  private logger = new Logger(TenantMiddleware.name);
  constructor(private readonly _tenantService: TenantService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const domain = req.subdomains[0] || req.hostname;
    if (!domain) {
      this.logger.error(`${domain} not found`);
      throw new BadRequestException('Subdomain is not defined');
    }
    const tenant = await this._tenantService.findTenantByDomain(domain);
    if (!tenant) {
      this.logger.error(`tenant with ${domain} not found.`);
      throw new BadRequestException('Tenant Does not exist');
    }

    req['tenant'] = tenant;
    req['tenant_id'] = tenant._id;
    next();
  }
}
