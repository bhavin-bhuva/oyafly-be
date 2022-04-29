import constants from '../../common/constants';
import { ValidationSchema } from '../../common/custom_types';
import Base from '../base';

export default class Inquire extends Base {
  private name(isRequired: boolean): ValidationSchema {
    return {
      type: String,
      trim: true,
      required: isRequired,
      match: /^.+$|null/,
      allowNull: true,
      errors: {
        type: constants.SCHEMA_ERROR_MESSAGES.NAME_INVALID_DT,
        required: constants.SCHEMA_ERROR_MESSAGES.NAME_REQUIRED,
        match: constants.SCHEMA_ERROR_MESSAGES.NAME_REQUIRED,
        allowNull: constants.SCHEMA_ERROR_MESSAGES.NAME_REQUIRED,
      },
    };
  }

  private surname(isRequired: boolean): ValidationSchema {
    return {
      type: String,
      trim: true,
      required: isRequired,
      match: /^.+$|null/,
      allowNull: true,
      errors: {
        type: constants.SCHEMA_ERROR_MESSAGES.SURNAME_INVALID_DT,
        required: constants.SCHEMA_ERROR_MESSAGES.SURNAME_REQUIRED,
        match: constants.SCHEMA_ERROR_MESSAGES.SURNAME_REQUIRED,
        allowNull: constants.SCHEMA_ERROR_MESSAGES.SURNAME_REQUIRED,
      },
    };
  }

  private email(isRequired: boolean): ValidationSchema {
    return {
      type: String,
      trim: true,
      required: isRequired,
      match: /^.+$|null/,
      allowNull: true,
      errors: {
        type: constants.SCHEMA_ERROR_MESSAGES.EMAIL_INVALID_DT,
        required: constants.SCHEMA_ERROR_MESSAGES.EMAIL_REQUIRED,
        match: constants.SCHEMA_ERROR_MESSAGES.EMAIL_REQUIRED,
        allowNull: constants.SCHEMA_ERROR_MESSAGES.EMAIL_REQUIRED,
      },
    };
  }

  private department(isRequired: boolean): ValidationSchema {
    return {
      type: String,
      trim: true,
      required: isRequired,
      match: /^.+$|null/,
      allowNull: true,
      errors: {
        type: constants.SCHEMA_ERROR_MESSAGES.DEPARTMENT_INVALID_DT,
        required: constants.SCHEMA_ERROR_MESSAGES.DEPARTMENT_REQUIRED,
        match: constants.SCHEMA_ERROR_MESSAGES.DEPARTMENT_REQUIRED,
        allowNull: constants.SCHEMA_ERROR_MESSAGES.DEPARTMENT_REQUIRED,
      },
    };
  }

  private comment(isRequired: boolean): ValidationSchema {
    return {
      type: String,
      trim: true,
      required: isRequired,
      match: /^(?!\s*$).+/,
      errors: {
        type: constants.SCHEMA_ERROR_MESSAGES.COMMENT_INVALID_DT,
        required: constants.SCHEMA_ERROR_MESSAGES.COMMENT_REQUIRED,
        match: constants.SCHEMA_ERROR_MESSAGES.COMMENT_REQUIRED,
        allowNull: constants.SCHEMA_ERROR_MESSAGES.COMMENT_REQUIRED,
      },
    };
  }

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

  public getVS(isUpdate: boolean): ValidationSchema {
    const fields: ValidationSchema = {
      name: this.name(!isUpdate),
      surname: this.surname(!isUpdate),
      department: this.department(!isUpdate),
      comment: this.comment(!isUpdate),
      email: this.email(!isUpdate),
    };

    if (isUpdate) fields.id = this.id();

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
}
