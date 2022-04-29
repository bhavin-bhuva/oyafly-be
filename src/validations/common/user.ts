import { ValidationSchema } from '../../common/custom_types';
import constants from '../../common/constants';
import Base from '../base';
// import utility from '../../common/utility';

export default class User extends Base {
  private id(): ValidationSchema {
    return {
      type: String,
      trim: true,
      required: true,
      match: /^.+$/,
      errors: {
        type: constants.SCHEMA_ERROR_MESSAGES.ID_INVALID_DT,
        required: constants.SCHEMA_ERROR_MESSAGES.ID_REQUIRED,
        match: constants.SCHEMA_ERROR_MESSAGES.ID_REQUIRED,
        allowNull: constants.SCHEMA_ERROR_MESSAGES.ID_REQUIRED,
      },
    };
  }

  private fullName(isRequired: boolean): ValidationSchema {
    return {
      type: String,
      trim: true,
      required: isRequired,
      match: /^.+$/,
      errors: {
        type: constants.SCHEMA_ERROR_MESSAGES.FULL_NAME_INVALID_DT,
        required: constants.SCHEMA_ERROR_MESSAGES.FULL_NAME_REQUIRED,
        match: constants.SCHEMA_ERROR_MESSAGES.FULL_NAME_REQUIRED,
        allowNull: constants.SCHEMA_ERROR_MESSAGES.FULL_NAME_REQUIRED,
      },
    };
  }

  private username(isRequired: boolean): ValidationSchema {
    return {
      type: String,
      trim: true,
      required: isRequired,
      match: /^.+$/,
      errors: {
        type: constants.SCHEMA_ERROR_MESSAGES.USERNAME_INVALID_DT,
        required: constants.SCHEMA_ERROR_MESSAGES.USERNAME_REQUIRED,
        match: constants.SCHEMA_ERROR_MESSAGES.USERNAME_REQUIRED,
        allowNull: constants.SCHEMA_ERROR_MESSAGES.USERNAME_REQUIRED,
      },
    };
  }

  private email(isRequired: boolean): ValidationSchema {
    return {
      type: String,
      trim: true,
      required: isRequired,
      match: /^.+$/,
      errors: {
        type: constants.SCHEMA_ERROR_MESSAGES.EMAIL_INVALID_DT,
        required: constants.SCHEMA_ERROR_MESSAGES.EMAIL_REQUIRED,
        match: constants.SCHEMA_ERROR_MESSAGES.EMAIL_REQUIRED,
        allowNull: constants.SCHEMA_ERROR_MESSAGES.EMAIL_REQUIRED,
      },
    };
  }

  // private roleId(isRequired: boolean): ValidationSchema {
  //   return {
  //     type: String,
  //     trim: true,
  //     required: isRequired,
  //     match: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
  //     errors: {
  //       type: constants.SCHEMA_ERROR_MESSAGES.ROLE_ID_INVALID_DT,
  //       required: constants.SCHEMA_ERROR_MESSAGES.ROLE_ID_REQUIRED,
  //       match: constants.SCHEMA_ERROR_MESSAGES.ROLE_ID_REQUIRED,
  //       allowNull: constants.SCHEMA_ERROR_MESSAGES.ROLE_ID_REQUIRED,
  //     },
  //   };
  // }

  private password(isRequired: boolean): ValidationSchema {
    return {
      type: String,
      trim: true,
      required: isRequired,
      match: /^.+$/,
      errors: {
        type: constants.SCHEMA_ERROR_MESSAGES.PASSWORD_INVALID_DT,
        required: constants.SCHEMA_ERROR_MESSAGES.PASSWORD_REQUIRED,
        match: constants.SCHEMA_ERROR_MESSAGES.PASSWORD_REQUIRED,
        allowNull: constants.SCHEMA_ERROR_MESSAGES.PASSWORD_REQUIRED,
      },
    };
  }

  private oldPassword(isRequired: boolean): ValidationSchema {
    return {
      type: String,
      trim: true,
      required: isRequired,
      match: /^.+$/,
      errors: {
        type: constants.SCHEMA_ERROR_MESSAGES.OLD_PASSWORD_INVALID_DT,
        required: constants.SCHEMA_ERROR_MESSAGES.OLD_PASSWORD_REQUIRED,
        match: constants.SCHEMA_ERROR_MESSAGES.OLD_PASSWORD_REQUIRED,
        allowNull: constants.SCHEMA_ERROR_MESSAGES.OLD_PASSWORD_REQUIRED,
      },
    };
  }
  public getResetPasswordVS(): ValidationSchema {
    return {
      type: Object,
      unknownKeys: 'deny',
      required: true,
      schema: {
        email: this.email(true),
      },
      errors: {
        required: 'Details required',
      },
    };
  }

  public getChangePasswordVS(): ValidationSchema {
    let fields = {
      oldPassword: this.oldPassword(true),
      password: this.password(true),
    };

    return {
      type: Object,
      unknownKeys: 'allow',
      required: true,
      schema: fields,
      errors: {
        required: 'Details required',
      },
    };
  }

  public getDeleteVS(): ValidationSchema {
    return {
      type: Object,
      unknownKeys: 'deny',
      required: true,
      schema: {
        userId: this.userId(true),
      },
      errors: {
        required: 'Details required',
      },
    };
  }

  public getListVs(): ValidationSchema {
    let fields: ValidationSchema = {
      search: this.search(),
      page: this.page(),
      limit: this.limit(),
    };

    return {
      type: Object,
      unknownKeys: 'deny',
      required: true,
      schema: fields,
      errors: {
        required: 'Details required',
      },
    };
  }

  public getCreateVS(isUpdate: boolean): ValidationSchema {
    let fields: ValidationSchema = {
      fullName: this.fullName(!isUpdate),
      username: this.username(!isUpdate),
      email: this.email(!isUpdate),
      password: this.password(!isUpdate),
    };

    if (isUpdate) {
      fields.id = this.id();
    }

    return {
      type: Object,
      unknownKeys: 'deny',
      required: true,
      schema: fields,
      errors: {
        required: 'Details required',
      },
    };
  }
}
