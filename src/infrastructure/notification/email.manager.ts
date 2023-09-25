export const emailTemplateService = {
  getEmailConfirmationMessage(confirmationCode: string) {
    //TODO change URL
    return `<a href="https://blogs-api-beregovich.herokuapp.com/api/auth/registration-confirmation/?code=${confirmationCode}">${confirmationCode}</a>`;
  },
};
