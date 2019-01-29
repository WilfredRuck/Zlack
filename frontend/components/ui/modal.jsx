import React from 'react';
import { connect } from 'react-redux';
import ChannelNewModal from '../channel/channel_new_modal';
import ChannelNavMenu from '../channel/channel_nav_menu';

function Modal({modal}) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case 'newChannel':
      component = <ChannelNewModal />;
      break;
    case 'navMenu':
      component = <ChannelNavMenu />;
      break;
    default:
      return null;
  }
  return (
    <div>
      { component }
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modalReducer
  };
};

export default connect(mapStateToProps, null)(Modal);