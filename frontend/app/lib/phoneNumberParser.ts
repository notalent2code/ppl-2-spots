export default function phoneNumberFormatCheck(phoneNumber: string): boolean {
  return RegExp("^[1-9][0-9]{0,14}$").test(phoneNumber);
}
