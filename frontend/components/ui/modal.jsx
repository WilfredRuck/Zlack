import React from 'react';
import { connect } from 'react-redux';
import ChannelNewModal from '../channel/channel_new_modal';
import ChannelEditModal from '../channel/channel_edit_modal';
import ChannelNavMenu from '../channel/channel_nav_menu';
import ChannelDetails from '../channel/channel_details';
import NewDirectMessage from '../channel/new_direct_message';
import ChannelUserModal from '../channel/channel_user_modal';

function Modal({modal, modalData}) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case 'newChannel':
      component = <ChannelNewModal />;
      break;
    case 'editChannel':
      component = <ChannelEditModal />;
      break;
    case 'navMenu':
      component = <ChannelNavMenu />;
      break;
    case 'channelInfo':
      component = <ChannelDetails />;
      break;
    case 'channelDM':
      component = <NewDirectMessage />;
      break;
    case 'userProfile':
      component = <ChannelUserModal modalData={modalData}/>;
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
  const modal = state.ui.modalReducer || { modal: '', modalData: ''};
  return {
    modal: modal.modal,
    modalData: modal.modalData,
  };
};

export default connect(mapStateToProps, null)(Modal);