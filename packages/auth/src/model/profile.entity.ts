import { Entity, Enum, Property } from '@mikro-orm/core';
import { TimeTemplate, TypeOfProfile } from '@vm/scan-policy-grpc';
import { Identified } from '@vm/utils-mikro-orm';

@Entity()
export class Profile extends Identified {
  /** profile name */
  @Property()
  name: string;

  /** profile description */
  @Property()
  description: string;

  /** profile type */
  @Enum(() => TypeOfProfile)
  type: TypeOfProfile;

  /** profile extend setting type */
  @Property()
  extendSettings: boolean;

  /** profile nmap */
  @Property()
  nmap: string;

  /** tcp syn */
  @Property()
  tcpSyn: string;

  /** udp port */
  @Property()
  udp: string;

  /** icmp */
  @Property()
  icmp: boolean;

  /** dns_name_resolver */
  @Property()
  dnsNameResolver: boolean;

  /** difine os */
  @Property()
  defineOs: boolean;

  /** define_version_service */
  @Property()
  defineVersionService: boolean;

  /** time template */
  @Enum(() => TimeTemplate)
  timeTemplate: TimeTemplate;

  /** connection_timeout min */
  @Property()
  connectionTimeout: number;

  /** scan_tcp */
  @Property()
  scanTcp: string;

  /** scan_udp */
  @Property()
  scanUdp: string;

  /** auth_ssh */
  @Property()
  authSsh: string;

  /** import_open_port */
  @Property()
  importOpenPort: boolean;

  /** import_open_port */
  @Property()
  importUsers: boolean;

  /** import_security_options */
  @Property()
  importSecurityOptions: boolean;

  /** import_security_options */
  @Property()
  importWindowsUpdates: boolean;

  constructor(props: Omit<Profile, keyof Identified>) {
    super();
    this.name = props.name;
    this.description = props.description;
    this.type = props.type;
    this.extendSettings = props.extendSettings;
    this.nmap = props.nmap;
    this.tcpSyn = props.tcpSyn;
    this.udp = props.udp;
    this.icmp = props.icmp;
    this.dnsNameResolver = props.dnsNameResolver;
    this.defineOs = props.defineOs;
    this.defineVersionService = props.defineVersionService;
    this.timeTemplate = props.timeTemplate;
    this.connectionTimeout = props.connectionTimeout;
    this.scanTcp = props.scanTcp;
    this.scanUdp = props.scanUdp;
    this.authSsh = props.authSsh;
    this.importOpenPort = props.importOpenPort;
    this.importUsers = props.importUsers;
    this.importSecurityOptions = props.importSecurityOptions;
    this.importWindowsUpdates = props.importWindowsUpdates;
  }
}
