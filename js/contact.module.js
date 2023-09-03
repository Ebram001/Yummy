export class Contact {
    constructor() {
        this.nameInput = $('#nameInput');
        this.emailInput = $('#emailInput');
        this.phoneInput = $('#phoneInput');
        this.ageInput = $('#ageInput');
        this.passwordInput = $('#passwordInput');
        this.repasswordInput = $('#repasswordInput');
        this.submitBtn = $('#submitBtn');

        this.nameAlert = $('#nameAlert');
        this.emailAlert = $('#emailAlert');
        this.phoneAlert = $('#phoneAlert');
        this.ageAlert = $('#ageAlert');
        this.passwordAlert = $('#passwordAlert');
        this.repasswordAlert = $('#repasswordAlert');

        this.initialize();
    }

    validateName() {
        const nameInput = this.nameInput.val();
        const regex = /^[a-zA-Z\s]+$/;
        const isValid = regex.test(nameInput);

        if (!isValid) {
            this.nameAlert.removeClass('d-none');
        } else {
            this.nameAlert.addClass('d-none');
        }

        return isValid;
    }

    validateEmail() {
        const emailInput = this.emailInput.val();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
        const isValid = regex.test(emailInput);

        if (!isValid) {
            this.emailAlert.removeClass('d-none');
        } else {
            this.emailAlert.addClass('d-none');
        }

        return isValid;
    }

    validatePhone() {
        const phoneInput = this.phoneInput.val();
        const regex = /^\d{11}$/; 
        const isValid = regex.test(phoneInput);

        if (!isValid) {
            this.phoneAlert.removeClass('d-none');
        } else {
            this.phoneAlert.addClass('d-none');
        }

        return isValid;
    }

    validateAge() {
        const ageInput = this.ageInput.val();
        const regex = /^[1-9][0-9]*$/; 
        const isValid = regex.test(ageInput);

        if (!isValid) {
            this.ageAlert.removeClass('d-none');
        } else {
            this.ageAlert.addClass('d-none');
        }

        return isValid;
    }

    validatePassword() {
        const passwordInput = this.passwordInput.val();
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const isValid = regex.test(passwordInput);

        if (!isValid) {
            this.passwordAlert.removeClass('d-none');
        } else {
            this.passwordAlert.addClass('d-none');
        }

        return isValid;
    }

    validateRepassword() {
        const passwordInput = this.passwordInput.val();
        const repasswordInput = this.repasswordInput.val();
        const isValid = passwordInput === repasswordInput;

        if (!isValid) {
            this.repasswordAlert.removeClass('d-none');
        } else {
            this.repasswordAlert.addClass('d-none');
        }

        return isValid;
    }
    
    validateForm() {
        const isNameValid = this.validateName();
        const isEmailValid = this.validateEmail();
        const isPhoneValid = this.validatePhone();
        const isAgeValid = this.validateAge();
        const isPasswordValid = this.validatePassword();
        const isRepasswordValid = this.validateRepassword();
        
        if (isNameValid && isEmailValid && isPhoneValid && isAgeValid && isPasswordValid && isRepasswordValid) {
            this.submitBtn.prop('disabled', false);
        } else {
            this.submitBtn.prop('disabled', true);
        }
    }
    
    initialize() {
        this.nameInput.on('input', () => this.validateName());
        this.emailInput.on('input', () => this.validateEmail());
        this.phoneInput.on('input', () => this.validatePhone());
        this.ageInput.on('input', () => this.validateAge());
        this.passwordInput.on('input', () => this.validatePassword());
        this.repasswordInput.on('input', () => this.validateRepassword());
    }

}
