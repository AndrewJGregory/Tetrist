export const closeModal = (e, modal) => {
    modal[0].style.display = 'none';
    $d('html').off('click');
};
