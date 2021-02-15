

function EmailErrors(val, flag) {
  const errors = [];
  if (!val.$dirty) return errors;
  !val.email && errors.push("بريد إلكتروني خاطئ");
  !val.required && errors.push("البريد الإلكتروني مطلوب");
  if (flag) errors.push("هذا البريد مستخدم من قبل مستخدم آخر");

  return errors;
}
function FieldErrors(val) {
  const errors = [];
  if (!val.$dirty) return errors;
  !val.required && errors.push("هذا الحقل مطلوب");
  !val.minLength && errors.push("عدد الحروف قليل");
  !val.maxLength && errors.push("عدد حروف زائد عن اللازم");
  return errors;
}
function UniqueFieldErrors(val, flag) {
  const errors = [];
  // console.log(flag);
  if (!val.$dirty) return errors;
  !val.required && errors.push("هذا الحقل مطلوب");
  !val.minLength && errors.push("عدد حروف قليل  ");
  !val.maxLength && errors.push("عدد حروف زائد عن اللازم ");
  if (flag) errors.push("هذا الرقم مستخدم من قبل");

  return errors;
}
// export feature declared earlier as default
export { EmailErrors, FieldErrors, UniqueFieldErrors };


