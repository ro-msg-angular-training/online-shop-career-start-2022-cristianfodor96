import { Role } from 'src/user-details';
import { AuthService } from '../auth.service';

export class MockAuthService implements Partial<AuthService> {
    isAuthorised(roles: Role[]): boolean {
        return true;
    }
}
