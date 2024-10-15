class AuthService {
  constructor() {
    this.elevatedLogin = this.elevatedLogin.bind(this);
  }
  public async elevatedLogin(
    clientSecret: string,
    clientID: string,
    scope: string[] = []
  ): Promise<void> {
    try {
      // Placeholder for actual login functionality
    } catch (error) {
      console.error('', error);
    }
  }
}

export default new AuthService();
