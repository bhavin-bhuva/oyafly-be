import { ValidationSchema } from '../common/custom_types';
import constants from '../common/constants';

export default class Base {
  protected page(): ValidationSchema {
    return {
      type: Number,
      required: true,
      errors: {
        type: constants.SCHEMA_ERROR_MESSAGES.PAGE_INVALID_DT,
        required: constants.SCHEMA_ERROR_MESSAGES.PAGE_REQUIRED,
        allowNull: constants.SCHEMA_ERROR_MESSAGES.PAGE_REQUIRED,
      },
    };
  }

  protected limit(): ValidationSchema {
    return {
      type: Number,
      required: true,
      errors: {
        type: constants.SCHEMA_ERROR_MESSAGES.LIMIT_INVALID_DT,
        required: constants.SCHEMA_ERROR_MESSAGES.LIMIT_REQUIRED,
        allowNull: constants.SCHEMA_ERROR_MESSAGES.LIMIT_REQUIRED,
      },
    };
  }

  protected search(): ValidationSchema {
    return {
      type: String,
      trim: true,
      required: false,
      errors: {
        type: constants.SCHEMA_ERROR_MESSAGES.SEARCH_INVALID_DT,
        required: constants.SCHEMA_ERROR_MESSAGES.SEARCH_REQUIRED,
        allowNull: constants.SCHEMA_ERROR_MESSAGES.SEARCH_REQUIRED,
      },
    };
  }

  protected order(): ValidationSchema {
    return {
      type: String,
      trim: true,
      required: false,
      enum: [constants.ENUMS.ORDER.ASC, constants.ENUMS.ORDER.DESC],
      default: constants.ENUMS.ORDER.DESC,
      errors: {
        type: constants.SCHEMA_ERROR_MESSAGES.ORDER_INVALID_DT,
        allowNull: constants.SCHEMA_ERROR_MESSAGES.ORDER_REQUIRED,
      },
    };
  }

  protected isArchived(): ValidationSchema {
    return {
      type: Boolean,
      required: true,
      errors: {
        type: constants.SCHEMA_ERROR_MESSAGES.IS_ARCHIVED_INVALID_DT,
        required: constants.SCHEMA_ERROR_MESSAGES.IS_ARCHIVED_REQUIRED,
        allowNull: constants.SCHEMA_ERROR_MESSAGES.IS_ARCHIVED_REQUIRED,
      },
    };
  }

  protected userId(isRequired: boolean): ValidationSchema {
    return {
      type: String,
      trim: true,
      required: isRequired,
      match: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      errors: {
        type: constants.SCHEMA_ERROR_MESSAGES.USER_ID_INVALID_DT,
        required: constants.SCHEMA_ERROR_MESSAGES.USER_ID_REQUIRED,
        match: constants.SCHEMA_ERROR_MESSAGES.USER_ID_REQUIRED,
        allowNull: constants.SCHEMA_ERROR_MESSAGES.USER_ID_REQUIRED,
      },
    };
  }

  protected groupId(isRequired: boolean): ValidationSchema {
    return {
      type: String,
      trim: true,
      required: isRequired,
      match: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      errors: {
        type: constants.SCHEMA_ERROR_MESSAGES.GROUP_ID_INVALID_DT,
        required: constants.SCHEMA_ERROR_MESSAGES.GROUP_ID_REQUIRED,
        match: constants.SCHEMA_ERROR_MESSAGES.GROUP_ID_REQUIRED,
        allowNull: constants.SCHEMA_ERROR_MESSAGES.GROUP_ID_REQUIRED,
      },
    };
  }

  protected customerId(isRequired: boolean): ValidationSchema {
    return {
      type: String,
      trim: true,
      required: isRequired,
      match: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      errors: {
        type: constants.SCHEMA_ERROR_MESSAGES.CUSTOMER_ID_INVALID_DT,
        required: constants.SCHEMA_ERROR_MESSAGES.CUSTOMER_ID_REQUIRED,
        match: constants.SCHEMA_ERROR_MESSAGES.CUSTOMER_ID_REQUIRED,
        allowNull: constants.SCHEMA_ERROR_MESSAGES.CUSTOMER_ID_REQUIRED,
      },
    };
  }

  protected recordId(isRequired: boolean): ValidationSchema {
    return {
      type: String,
      required: isRequired,
      trim: true,
      match: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      errors: {
        type: constants.SCHEMA_ERROR_MESSAGES.RECORD_ID_INVALID_DT,
        required: constants.SCHEMA_ERROR_MESSAGES.RECORD_ID_REQUIRED,
        match: constants.SCHEMA_ERROR_MESSAGES.RECORD_ID_REQUIRED,
        allowNull: constants.SCHEMA_ERROR_MESSAGES.RECORD_ID_REQUIRED,
      },
    };
  }

  protected dateFilter(): ValidationSchema {
    return {
      filterType: {
        type: String,
        trim: true,
        required: false,
        match: /^.+$/,
        default: constants.ENUMS.DATE_FILTER.ALL_YEAR,
        enum: [
          constants.ENUMS.DATE_FILTER.ALL_YEAR,
          constants.ENUMS.DATE_FILTER.THIS_YEAR,
          constants.ENUMS.DATE_FILTER.THIS_MONTH,
          constants.ENUMS.DATE_FILTER.THIS_WEEK,
          constants.ENUMS.DATE_FILTER.CUSTOM,
        ],
        errors: {
          type: constants.SCHEMA_ERROR_MESSAGES.FILTER_TYPE_INVALID_DT,
          match: constants.SCHEMA_ERROR_MESSAGES.FILTER_TYPE_REQUIRED,
          enum: constants.SCHEMA_ERROR_MESSAGES.FILTER_TYPE_INV,
          allowNull: constants.SCHEMA_ERROR_MESSAGES.FILTER_TYPE_REQUIRED,
        },
      },
      fromDate: {
        type: String,
        required: false,
        trim: true,
        match: /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
        errors: {
          type: constants.SCHEMA_ERROR_MESSAGES.FROM_DATE_INVALID_DT,
          required: constants.SCHEMA_ERROR_MESSAGES.FROM_DATE_REQUIRED,
          match: constants.SCHEMA_ERROR_MESSAGES.DATE_INV,
          allowNull: constants.SCHEMA_ERROR_MESSAGES.FROM_DATE_REQUIRED,
        },
      },
      toDate: {
        type: String,
        required: false,
        trim: true,
        match: /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
        errors: {
          type: constants.SCHEMA_ERROR_MESSAGES.TO_DATE_INVALID_DT,
          required: constants.SCHEMA_ERROR_MESSAGES.TO_DATE_REQUIRED,
          match: constants.SCHEMA_ERROR_MESSAGES.DATE_INV,
          allowNull: constants.SCHEMA_ERROR_MESSAGES.TO_DATE_REQUIRED,
        },
      },
    };
  }

  protected dateFilterShort(isRequired: boolean): ValidationSchema {
    return {
      type: String,
      trim: true,
      required: isRequired,
      match: /^.+$/,
      enum: [
        constants.ENUMS.DATE_FILTER.THIS_MONTH,
        constants.ENUMS.DATE_FILTER.THIS_WEEK,
        constants.ENUMS.DATE_FILTER.THIS_DAY,
      ],
      errors: {
        type: constants.SCHEMA_ERROR_MESSAGES.DATE_FILTER_INVALID_DT,
        match: constants.SCHEMA_ERROR_MESSAGES.DATE_FILTER_REQUIRED,
        enum: constants.SCHEMA_ERROR_MESSAGES.DATE_FILTER_INV,
        allowNull: constants.SCHEMA_ERROR_MESSAGES.DATE_FILTER_REQUIRED,
      },
    };
  }
}
