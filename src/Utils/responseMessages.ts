interface ResponseData {
    success: boolean;
    statusCode: number;
    message: string;
    data: any;
  }
  
  const successResponse = (data: object, code: number, msg: string): ResponseData => {
    return {
      success: true,
      statusCode: code,
      message: msg,
      data: data,
    };
  };
  
  const errorResponse = (errMessage: string): ResponseData => {
    return {
      success: false,
      statusCode: 400,
      message: errMessage,
      data: null,
    };
  };
  
  export { successResponse, errorResponse };
  