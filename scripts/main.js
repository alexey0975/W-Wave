
// кастомный селект
document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('.select');
  const choices = new Choices(element, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
    placeholder: true,
    placeholderValue: '',
    position: 'bottom',
  });
})
