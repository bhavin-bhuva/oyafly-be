import constants from '../../common/constants';
import { ValidationSchema } from '../../common/custom_types';
import Base from '../base';

export default class Blog extends Base {
  private title(isRequired: boolean): ValidationSchema {
    return {
      type: String,
      trim: true,
      required: isRequired,
      match: /^.+$|null/,
      allowNull: true,
      errors: {
        type: constants.SCHEMA_ERROR_MESSAGES.TITLE_INVALID_DT,
        required: constants.SCHEMA_ERROR_MESSAGES.TITLE_REQUIRED,
        match: constants.SCHEMA_ERROR_MESSAGES.TITLE_REQUIRED,
        allowNull: constants.SCHEMA_ERROR_MESSAGES.TITLE_REQUIRED,
      },
    };
  }

  private category(isRequired: boolean): ValidationSchema {
    return {
      type: String,
      trim: true,
      required: isRequired,
      match: /^.+$|null/,
      allowNull: true,
      errors: {
        type: constants.SCHEMA_ERROR_MESSAGES.CATEGORY_INVALID_DT,
        required: constants.SCHEMA_ERROR_MESSAGES.CATEGORY_REQUIRED,
        match: constants.SCHEMA_ERROR_MESSAGES.CATEGORY_REQUIRED,
        allowNull: constants.SCHEMA_ERROR_MESSAGES.CATEGORY_REQUIRED,
      },
    };
  }

  private content(isRequired: boolean): ValidationSchema {
    return {
      type: String,
      trim: true,
      required: isRequired,
      allowNull: true,
      errors: {
        type: constants.SCHEMA_ERROR_MESSAGES.CONTENT_INVALID_DT,
        required: constants.SCHEMA_ERROR_MESSAGES.CONTENT_REQUIRED,
        allowNull: constants.SCHEMA_ERROR_MESSAGES.CONTENT_REQUIRED,
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
      title: this.title(!isUpdate),
      category: this.category(!isUpdate),
      content: this.content(!isUpdate),
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
      page: this.page(),
      limit: this.limit(),
      search: this.search(),
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
