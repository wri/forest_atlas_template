export default {

  formatFireResults: (response) => {
    return {
      fireCount: response.features ? response.features.length : 0
    };
  }

};
