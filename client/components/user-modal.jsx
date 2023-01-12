import React from 'react';
import AppContext from '../lib/app-context';

const styles = {
  modalOverlay: {
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    width: '100 %',
    height: '100 %',
    backgroundColor: 'rgb(0 0 0 / 50 %)'
  }
};

export default class UserModal extends React.Component {
  render() {
    const { user, handleSignOut } = this.context;
    if (user === null) {
      return (
        <div className='modal-overlay' style={styles.modalOverlay} onClick={this.props.onClick} >
          <div className='modal-box'>
            <h4 className='text-center my-5'>{'Looks like you aren\'t logged in.'}</h4>
            <div className='d-flex justify-content-center'>
              <a className='my-4 mx-5 text-decoration-none btn btn-outline-info' onClick={this.props.onClick} href="#sign-in">Sign In</a>
              <a className='my-4 mx-5 text-decoration-none btn btn-outline-info' onClick={this.props.onClick} href='#sign-up'>Sign Up</a>
            </div>
          </div>
        </div>
      );
    } else if (user !== null) {
      return (
        <div className='modal-overlay' style={styles.modalOverlay} onClick={this.props.onClick}>
          <div className='modal-box'>
            <h4 className='text-center my-5'>Are you sure you want to sign out?</h4>
            <div className='d-flex justify-content-center'>
              <button className='mx-5 my-4 btn btn-outline-info' onClick={handleSignOut}>Sign Out</button>
              <button className='mx-5 my-4 btn btn-outline-info' onClick={this.props.onClick}>Cancel</button>
            </div>
          </div>
        </div>
      );
    }
  }
}
UserModal.contextType = AppContext;
