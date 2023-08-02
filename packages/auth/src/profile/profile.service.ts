import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import type {
  CreateProfileRequest,
  CreateProfileResponse,
  DeleteProfileRequest,
  DeleteProfileResponse,
  GetProfileResponse,
  TimeTemplate,
  TypeOfProfile,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from '@vm/scan-policy-grpc';

import { Profile } from '../model';

class SanitazeUpdateProfileReqest implements UpdateProfileRequest {
  name?: string;
  description?: string;
  type?: TypeOfProfile;
  extendSettings?: boolean;
  nmap?: string;
  tcpSyn?: string;
  udp?: string;
  icmp?: boolean;
  dnsNameResolver?: boolean;
  defineOs?: boolean;
  defineVersionService?: boolean;
  timeTemplate?: TimeTemplate;
  connectionTimeout?: number;
  scanTcp?: string;
  scanUdp?: string;
  authSsh?: string;
  importOpenPort?: boolean;
  importUsers?: boolean;
  importSecurityOptions?: boolean;
  importWindowsUpdates?: boolean;
  id!: string;
}

@Injectable()
export class ProfileService {
  constructor(private readonly em: EntityManager) {}

  public async get(): Promise<GetProfileResponse> {
    const data = await this.em.find(Profile, {}, {});

    return { success: true, data };
  }

  public async create(
    request: CreateProfileRequest,
  ): Promise<CreateProfileResponse> {
    const account = new Profile({
      ...request,
    });

    await this.em.persistAndFlush(account);
    return { success: true, data: account };
  }

  public async delete(
    request: DeleteProfileRequest,
  ): Promise<DeleteProfileResponse> {
    const account = await this.em.findOne(Profile, { id: request.id });

    if (!account) {
      return {
        success: false,
        data: request,
        error: `Profile ${request.id} not found`,
      };
    }

    await this.em.removeAndFlush(account);
    return { success: true, data: request };
  }

  public async update(
    request: UpdateProfileRequest,
  ): Promise<UpdateProfileResponse> {
    const profile = await this.em.findOne(Profile, { id: request.id });
    const profileUPdate = { ...request } as SanitazeUpdateProfileReqest;

    if (!profile) {
      return {
        success: false,
        data: request,
        error: `Profile ${request.id} not found`,
      };
    }

    const id = request.id;

    await this.em.nativeUpdate(Profile, { id }, profileUPdate);
    return { success: true, data: request };
  }
}
