/**
 * Énumérateur correspondant au type que prend une entité dans le formulaire.
 * Peut être le type d'un input HTML, où un type customisé, qui sera traité dans la boucle de
 * création de controles du formulaire.
 * */
export enum FormType{
  TEXT="text",
  NUMBER="number",
  PASSWORD="password",
  SELECT="select",
  RADIO="radio",
  MULTICHOICE="multichoice",
  CHECKBOX="checkbox",
  DATE="date",
}
