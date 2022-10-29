const year = document.getElementById('year')! as HTMLDivElement;
const showYear: string = new Date().getFullYear().toString();
year.innerHTML = showYear;

export default year;
