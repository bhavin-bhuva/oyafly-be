import constants from '../../common/constants';
import { ValidationSchema } from '../../common/custom_types';
import Base from '../base';

export default class BlogComment extends Base {
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

  private blogId(isRequired: boolean): ValidationSchema {
    return {
      type: String,
      trim: true,
      required: isRequired,
      match: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      errors: {
        type: constants.SCHEMA_ERROR_MESSAGES.BLOG_ID_INVALID_DT,
        required: constants.SCHEMA_ERROR_MESSAGES.BLOG_ID_REQUIRED,
        match: constants.SCHEMA_ERROR_MESSAGES.BLOG_ID_REQUIRED,
        allowNull: constants.SCHEMA_ERROR_MESSAGES.BLOG_ID_REQUIRED,
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
      comment: this.comment(!isUpdate),
      email: this.email(!isUpdate),
      blogId: this.blogId(!isUpdate),
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
      blogId: this.blogId(true),
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
