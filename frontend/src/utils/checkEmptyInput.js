import deleteFromObject from "./deleteFromObject";

export function checkEmptyInput(userBillDetails, userShipDetails, differentBillAndShipData) {
    const billingDetailsForValidate = deleteFromObject(userBillDetails, "tax_number", "user_id");
    const shippingDetailsForValidate = deleteFromObject(userShipDetails, "tax_number", "user_id");
    let everythingFilled = true;

    console.log(billingDetailsForValidate, "bill");
    console.log(shippingDetailsForValidate);

    if(differentBillAndShipData) {
      const billingFilled = Object.values(billingDetailsForValidate).every(inputValue => Boolean(inputValue) === true);
      const shippingFilled = Object.values(shippingDetailsForValidate).every(inputValue => Boolean(inputValue) === true);
      everythingFilled = billingFilled && shippingFilled;
      console.log(everythingFilled);

    } else {
    console.log(Object.values(billingDetailsForValidate));
      everythingFilled = Object.values(billingDetailsForValidate).every(inputValue => Boolean(inputValue) === true);
      console.log(everythingFilled);
    }
    console.log(everythingFilled);
    return everythingFilled;
  }
