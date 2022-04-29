export interface ConfigParams {
  [key: string]: object;
}

export interface RequestParams {
  [key: string]: any;
}

export interface ValidationSchema {
  [key: string]: any;
}

export interface ServiceReturnVal<T> {
  error?: Error;
  data?: T;
  filePath?: string;
}

export interface EmailReturnVal {
  emailVars?: any;
  quoteHtml?: any;
}

export interface DateFilter {
  type: string;
  fromDate?: string;
  toDate?: string;
}

export interface TokenUser {
  id: string;
  fullName: string;
  username: string;
  email: string;
  roleId: string;
  role: string;
  isAdmin: boolean;
  profileUrl?: string;
}

export interface FileUpload {
  path?: string;
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
  cloudStorageError?: Error;
  cloudStorageObject?: string;
  gcsFileName?: string;
  gcsUrl?: string;
  signedUrl?: string;
}

export interface Pagination {
  offset: number;
  limit: number;
}

export interface Filter {
  type: string;
  value: number;
  search?: string;
}

export interface Result {
  status: boolean;
  error?: string;
}

export interface OrderType {
  orderBy: any;
  order: string;
}

export interface DProductDetails {
  price: number;
  shipping: number;
  discount: number;
  tax: number;
  other: number;
  revisedCost: number;
  sellingPrice: number;
  margin: number;
  basePrice: number;
  advertisedPrice: number;
  setupCost: number;
  recondCost: number;
  programDiscount: number;
  deliveryDate?: string;
  expiryOn?: string;
  setup?: RequestParams;
  recond?: RequestParams;
}

export interface DRProductDetails {
  startDate: string;
  endDate: string;
  rentType: string;
  rent: number;
  upFrontAmtDue: number;
  shipping: number;
  tax: number;
  deliveryCost: number;
  other: number;
  basePrice: number;
  advertisedPrice: number;
  setupCost: number;
  rentalForDay: number;
  rentalForWeek: number;
  rentalForMonth: number;
  deliveryDate?: string;
  expiryOn?: string;
  setup?: RequestParams;
}

export interface FBCampaign {
  name: string;
  //  one more to add
  objective: 'POST_ENGAGEMENT' | 'LEAD_GENERATION';
  status: 'ACTIVE' | 'PAUSED' | 'DELETED' | 'ARCHIVED';
  specialAdCategories?: [string];
  buyingType?: 'AUCTION' | 'RESERVED';
}
export interface FBAdImageCreative {
  pageId: string;
  linkData: {
    imageHash?: string | null;
    link: string;
    message: string;
    description: string;
    callToAction: {
      type: string;
      value: {
        link?: string;
        leadGenFormId?: string;
      };
    };
  };
}

export interface FBAdVideoCreative {
  pageId: string;
  videoData: {
    imageUrl: string;
    videoId?: string | null;
    message: string;
    title: string;
    callToAction: {
      type: string;
      value: {
        link?: string;
        leadGenFormId?: string;
      };
    };
  };
}

export interface FBAdCreative {
  name: string;
  objectStorySpec: FBAdImageCreative | FBAdVideoCreative;
}

export interface FBAdSet {
  name: string;
  optimizationGoal:
    | 'NONE'
    | 'APP_INSTALLS'
    | 'BRAND_AWARENESS'
    | 'AD_RECALL_LIFT'
    | 'CLICKS'
    | 'ENGAGED_USERS'
    | 'EVENT_RESPONSES'
    | 'IMPRESSIONS'
    | 'LEAD_GENERATION'
    | 'QUALITY_LEAD'
    | 'LINK_CLICKS'
    | 'OFFER_CLAIMS'
    | 'OFFSITE_CONVERSIONS'
    | 'PAGE_ENGAGEMENT'
    | 'PAGE_LIKES'
    | 'POST_ENGAGEMENT'
    | 'QUALITY_CALL'
    | 'REACH'
    | 'SOCIAL_IMPRESSIONS'
    | 'APP_DOWNLOADS'
    | 'TWO_SECOND_CONTINUOUS_VIDEO_VIEWS'
    | 'LANDING_PAGE_VIEWS'
    | 'VISIT_INSTAGRAM_PROFILE'
    | 'VALUE'
    | 'THRUPLAY'
    | 'REPLIES'
    | 'DERIVED_EVENTS';
  billingEvent:
    | 'APP_INSTALLS'
    | 'CLICKS'
    | 'IMPRESSIONS'
    | 'LINK_CLICKS'
    | 'NONE'
    | 'OFFER_CLAIMS'
    | 'PAGE_LIKES'
    | 'POST_ENGAGEMENT'
    | 'THRUPLAY'
    | 'PURCHASE'
    | 'LISTING_INTERACTION';
  bidAmount?: number | null;
  dailyBudget?: number | null;
  lifetimeBudget?: number | null;
  campaignId: string | null;
  targeting: string;
  startTime: string;
  promotedObject?: {
    pageId: string;
  };
  endTime: string;
  status: 'ACTIVE' | 'PAUSED' | 'DELETED' | 'ARCHIVED';
}

export interface FBAd {
  name: string;
  adset_id?: string;
  status: 'ACTIVE' | 'PAUSED' | 'DELETED' | 'ARCHIVED';
  creative?: {
    creativeId: string;
  };
}
export interface TwiloMsg {
  body: string;
  from: string;
  to: string;
  statusCallback?: string;
}

export interface APIResponse {
  success: boolean;
  details: any;
  headers?: any;
}

export interface LinkedInCampiagnGroup {
  account: string;
  name: string;
  runSchedule: {
    end: number;
    start: number;
  };
  status: 'ACTIVE' | 'ARCHIVED' | 'CANCELED' | 'DRAFT' | 'PAUSED';
  totalBudget: {
    amount: string;
    currencyCode: string;
  };
}

export interface LinkedInCampiagn {
  account: string;
  campaignGroup: string;
  audienceExpansionEnabled: boolean;
  costType?: 'CPV' | 'CPM' | 'CPC';
  creativeSelection?: 'ROUND_ROBIN' | 'OPTIMIZED';
  offsiteDeliveryEnabled: boolean;
  format?: 'SINGLE_VIDEO';
  objectiveType?: 'ENGAGEMENT' | 'LEAD_GENERATION' | 'WEBSITE_VISITS' | 'VIDEO_VIEWS';
  totalBudget: {
    amount: string;
    currencyCode: 'USD';
  };
  unitCost?: {
    amount: string;
    currencyCode: 'USD';
  };
  locale: {
    country: string;
    language: string;
  };
  name: string;
  runSchedule: {
    end: number;
    start: number;
  };
  targetingCriteria: {
    include: {
      and: [
        {
          or: {
            'urn:li:adTargetingFacet:locations': Array<string>;
          };
        }
      ];
    };
  };
  type: 'SPONSORED_UPDATES' | 'TEXT_AD' | 'SPONSORED_INMAILS' | 'DYNAMIC';
  status: 'ACTIVE' | 'ARCHIVED' | 'CANCELED' | 'DRAFT' | 'PAUSED';
}

export interface LinkedInCreativeTextAd {
  clickUri: string;
  data: {
    'com.linkedin.ads.TextAdCreativeVariables': {
      vectorImage?: string;
      text: string;
      title: string;
    };
  };
}
export interface LinkedInCreativeVideoAd {
  data: any;
}
export interface LinkedInCreative {
  campaign: string;
  reference?: string;
  status: 'ACTIVE' | 'ARCHIVED' | 'CANCELED' | 'DRAFT' | 'PAUSED';
  type: 'TEXT_AD' | 'SPONSORED_VIDEO' | 'SPONSORED_STATUS_UPDATE';
  variables: LinkedInCreativeTextAd | LinkedInCreativeVideoAd;
  callToAction?: {
    labelType: 'LEARN_MORE' | 'SIGN_UP' | 'SUBSCRIBE' | 'APPLY_NOW';
    target: string; // ad form Id
  };
}

export interface LinkedInUGCPost {
  author: string;
  lifecycleState: 'DRAFT' | 'PUBLISHED';
  specificContent: {
    'com.linkedin.ugc.ShareContent': {
      media: [
        {
          media: string;
          status: 'READY';
          title: {
            attributes: Array<string>;
            text: string;
          };
          landingPage?: {
            landingPageUrl: string;
            landingPageTitle: 'LEARN_MORE' | 'SIGN_UP' | 'SUBSCRIBE' | 'APPLY_NOW';
          };
        }
      ];
      shareCommentary: {
        attributes: Array<string>;
        text: string;
      };
      shareMediaCategory: 'VIDEO';
    };
  };
  targetAudience?: any;
  visibility: {
    'com.linkedin.ugc.MemberNetworkVisibility'?: 'PUBLIC' | 'DARK';
    'com.linkedin.ugc.SponsoredContentVisibility'?: 'PUBLIC' | 'DARK';
  };
}
export interface LinkedInAdDirectSponsoredContents {
  account: string;
  contentReference: string;
  name: string;
  owner: string;
  type: 'VIDEO';
}

export interface LinkedInShare {
  content: {
    contentEntities: [
      {
        entityLocation: string;
        thumbnails: [
          {
            resolvedUrl: string;
          }
        ];
      }
    ];
    title: string;
  };
  distribution: {
    linkedInDistributionTarget: {};
  };
  owner: string;
  subject: string;
  text: {
    text: string;
  };
}

export interface FBPagination {
  before?: string;
  after?: string;
  limit: number;
}
export interface ChatResponse {
  success: boolean;
  data?: any;
  error?: any;
}

export interface ChatPayLoad {
  token: string;
  data: any;
}
export interface ChatUser {
  socketId: string;
  uid: string;
  client: string;
  name: string;
  phone: string;
  email: string;
}
export interface ArrowPush {
  title?: string;
  body: string;
  mutableContent?: string;
  sound?: string;
  data?: {
    [key: string]: string;
  };
  badge?: number;
}
export interface ArrowPushUser {
  token: string;
}

export interface ArrowNotification {
  body?: string;
  title?: string;
  sender?: string;
  senderType?: string;
  actions?: boolean;
  deeplink?: string;
  data?: any;
}

export interface SocketNotification {
  userIds: Array<any>;
  data: object;
  type: string;
}
