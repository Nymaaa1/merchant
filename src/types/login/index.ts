interface LoginRequestBody {
    username: string;
    password: string;
}

interface LoginPasswordRecover {
    accessType: string;
    accessValue: string;
}

interface LoginPasswordRecoverResponse {
    accessType: string;
    state: string;
    registrationState: string;
    captchaData: {
        captchaImage: string;
    }
}

interface PostPasswordRecover {
    accessType: string;
    accessValue: string;
    otpValue: string;
}

interface ChangePasswordModel {
    accessType: string;
    newPassword: string;
    accessValue: string;
    passwordTokenValue: string;
}

interface PostPasswordRecoverResponse {
    passwordToken: string;
}