export class Users {
  id: number;
  companyId: number;
  role: string;
  name: string;
  email: string;
  status: string;
  ir35: string;
  availability: string;
  minHourlyRate: number;
  maxHourlyRate: number;
  about: string;
  isVerified: boolean;

  constructor() {
    this.id = 0;
    this.companyId = null;
    this.role = null;
    this.name = null;
    this.email = null;
    this.status = null;
    this.ir35 = null;
    this.availability = null;
    this.minHourlyRate = 0;
    this.maxHourlyRate = 0;
    this.about = null;
    this.isVerified = null;
  }

  setId(id: number) {
    this.id = id;
  }

  setCompanyId(companyId: number) {
    this.companyId = companyId;
  }

  setRole(role: string) {
    this.role = role;
  }

  setName(name: string) {
    this.name = name;
  }

  setEmail(email: string) {
    this.email = email;
  }

  setStatus(status: string) {
    this.status = status;
  }

  setIR35(ir35: string) {
    this.ir35 = ir35;
  }

  setAvailability(availability: string) {
    this.availability = availability;
  }

  setMinHourlyRate(minHourlyRate: number) {
    this.minHourlyRate = minHourlyRate;
  }

  setMaxHourlyRate(maxHourlyRate: number) {
    this.maxHourlyRate = maxHourlyRate;
  }

  setAbout(about: string) {
    this.about = about;
  }

  setIsVerified(isVerified: boolean) {
    this.isVerified = isVerified;
  }

  getId(): number {
    return this.id;
  }

  getCompanyId(): number {
    return this.companyId;
  }

  getRole(): string {
    return this.role;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getStatus(): string {
    return this.status;
  }

  getIR35(): string {
    return this.ir35;
  }

  getAvailability(): string {
    return this.availability;
  }

  getMinHourlyRate(): number {
    return this.minHourlyRate;
  }

  getMaxHourlyRate(): number {
    return this.maxHourlyRate;
  }

  getAbout(): string {
    return this.about;
  }

  getIsVerified(): boolean {
    return this.isVerified;
  }
}
