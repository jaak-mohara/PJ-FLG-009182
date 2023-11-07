type FeatureEntry = {
  /**
   * The name of the feature
   *
   * @type {string}
   */
  name: string;

  /**
   * The description of the feature
   *
   * @type {string}
   */
  description?: string;

  /**
   * The feature's status
   *
   * @type {boolean}
   */
  isEnabled: boolean;
}
