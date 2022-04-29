import constants from '../../common/constants';
import { ValidationSchema } from '../../common/custom_types';
import Base from '../base';

export default class Auth extends Base {
  private username(): ValidationSchema {
    return {
      type: String,
      trim: true,
      required: true,
      match: /^.+$/,
      errors: {
        type: constants.SCHEMA_ERROR_MESSAGES.USERNAME_INVALID_DT,
        required: constants.SCHEMA_ERROR_MESSAGES.USERNAME_REQUIRED,
        match: constants.SCHEMA_ERROR_MESSAGES.USERNAME_REQUIRED,
        allowNull: constants.SCHEMA_ERROR_MESSAGES.USERNAME_REQUIRED,
      },
    };
  }

  private password(): ValidationSchema {
    return {
      type: String,
      trim: true,
      required: true,
      match: /^.+$/,
      errors: {
        type: constants.SCHEMA_ERROR_MESSAGES.PASSWORD_INVALID_DT,
        required: constants.SCHEMA_ERROR_MESSAGES.PASSWORD_REQUIRED,
        match: constants.SCHEMA_ERROR_MESSAGES.PASSWORD_REQUIRED,
        allowNull: constants.SCHEMA_ERROR_MESSAGES.PASSWORD_REQUIRED,
      },
    };
  }

  public getLoginVS(): ValidationSchema {
    return {
      type: Object,
      unknownKeys: 'deny',
      required: true,
      schema: {
        username: this.username(),
        password: this.password(),
      },
      errors: {
        required: 'Details required',
      },
    };
  }

  private resetHash(): ValidationSchema {
    return {
      type: String,
      trim: true,
      required: true,
      match: /^.+$/,
      errors: {
        type: constants.SCHEMA_ERROR_MESSAGES.RESET_HASH_INVALID_DT,
        required: constants.SCHEMA_ERROR_MESSAGES.RESET_HASH_REQUIRED,
        match: constants.SCHEMA_ERROR_MESSAGES.RESET_HASH_REQUIRED,
        allowNull: constants.SCHEMA_ERROR_MESSAGES.RESET_HASH_REQUIRED,
      },
    };
  }

  public getSetPasswordVS(): ValidationSchema {
    return {
      type: Object,
      unknownKeys: 'deny',
      required: true,
      schema: {
        resetHash: this.resetHash(),
        password: this.password(),
      },
      errors: {
        required: 'Details required',
      },
    };
  }
}
