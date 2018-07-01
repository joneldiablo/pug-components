'use strict';

export default class ModalNewUser {
  constructor() {
    this.name = 'modal-new-user';
    $('#modalNewUser').on('hide.bs.modal', function (e) {
      $('#step0').collapse('show');
    });
    // $('#modalNewUser').on('show.bs.modal', function(e) {
    //   console.log("opening!!!");
    // });
  }
}
