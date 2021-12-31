const debounce = {
  name: 'Debounce',
  trigger(callback, delay) {
  	let timeout;

	  return (...args) => {
	    if (timeout) {
	      clearTimeout(timeout);
	    }

	    timeout = setTimeout(() => {
	      callback(...args);
	    }, delay);
	  }
  }
};

export default ({ app }, inject) => {
  inject('debounce', debounce);
};
