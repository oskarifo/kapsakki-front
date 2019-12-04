class ErrorService {
  constructor (){
    if (!ErrorService.instance) {
      ErrorService.instance = this
    }
    return ErrorService.instance
  }
  onError = (error) => {
    console.error(error);
  } 
  onWarn = (warn) => {
    console.warn(warn);
  }
}

const instance = new ErrorService();

export default instance