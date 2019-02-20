import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal_actions';

export const modalReducer = (state = null, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {modal: action.modal, modalData: action.modalData};
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
}