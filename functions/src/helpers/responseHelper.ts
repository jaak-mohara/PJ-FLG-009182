/**
 * Response helper
 */
class ResponseHelper {
  /**
   * Response callback
   *
   * @type {Function}
   */
  private callback: ResponseCallback;


  /**
   * Constructor
   * @param {Function} callback
   */
  constructor(callback: e.Response) {
    this.callback = callback;
  }

  /**
   * Send a 200 response
   *
   * @param {Object} data
   * @return {void}
   */
  public success(data: object): void {
    this.callback.status(200).send(null, data);
  }

  /**
   * Send a 400 response
   *
   * @param {object} data
   * @return {void}
   */
  public error(data: object): void {
    console.error(data);
    this.callback
      .status(400)
      .send(null, {message: 'An error occured.'});
  }

  /**
   * Send a 404 response
   *
   * @param {object} data
   */
  public notFound(data: object): void {
    console.error(data);
    this.callback
      .status(404)
      .send(null, {message: 'Resource not found.'});
  }

  /**
   * Send a 422 response
   *
   * @param {object} data
   */
  public failValidation(data: object): void {
    this.callback
      .status(422)
      .send(null, {
        message: 'Validation failed.',
        ...data,
      });
  }
}

export default ResponseHelper;
