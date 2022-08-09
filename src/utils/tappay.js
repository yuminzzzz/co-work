const tappay = {
  setupSDK() {
    window.TPDirect.setupSDK(
      '12348',
      'app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF',
      'sandbox'
    );
  },
  setupCard(numberElement, expirationDateElement, ccvElement) {
    window.TPDirect.card.setup({
      fields: {
        number: {
          element: numberElement,
          placeholder: '**** **** **** ****',
        },
        expirationDate: {
          element: expirationDateElement,
          placeholder: 'MM / YY',
        },
        ccv: {
          element: ccvElement,
          placeholder: '後三碼',
        },
      },
      styles: {
        '.valid': {
          color: 'green',
        },
        '.invalid': {
          color: 'red',
        },
      },
    });
  },
  canGetPrime() {
    return window.TPDirect.card.getTappayFieldsStatus().canGetPrime;
  },
  getPrime() {
    return new Promise((resolve) => {
      window.TPDirect.card.getPrime((result) => {
        resolve(result);
      });
    });
  },
};

export default tappay;
