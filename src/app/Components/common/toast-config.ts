import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify'

export const ToastConfig = {
  global: {
    newOnTop: true,
    maxOnScreen: 8,
    maxAtPosition: 8,
    filterDuplicates: true
  },
  toast: {
    type: 'error',
    showProgressBar: true,
    timeout: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    position: "rightTop",
    animation: {enter: 'fadeIn', exit: 'fadeOut', time: 400}
  },
  type: {
    prompt: {
      timeout: 0,
      closeOnClick: false,
      buttons: [
        {text: 'Ok', action: null, bold: true},
        {text: 'Cancel', action: null, bold: false},
      ],
      placeholder: 'Enter answer here...',
      type: 'prompt',
    },
   confirm: {
      timeout: 0,
      closeOnClick: false,
      buttons: [
        {text: 'Ok', action: null, bold: true},
        {text: 'Cancel', action: null, bold: false},
      ],
      type: 'confirm',
    },
   simple: {
      type: 'simple'
    },
    success: {
      type:  'success'
    },
    error: {
      type: 'error',
      showProgressBar: true,
      timeout: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      position: "rightTop",
      animation: {enter: 'fadeIn', exit: 'fadeOut', time: 400}
    },
    warning: {
      type: 'warning'
    },
    info: {
      type: 'info'
    },
    async: {
      pauseOnHover: false,
      closeOnClick: false,
      timeout: 0,
      showProgressBar: false,
      type: 'async'
    }
  }
};