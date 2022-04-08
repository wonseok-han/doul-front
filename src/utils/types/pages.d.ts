export interface PageProps {
  info?: any;
}

export interface PageHeaderProps extends PageProps {
  handleSearchButtonClick?: (event?: any) => any;
  handleAddButtonClick?: (event?: any) => void;
  handleDeleteButtonClick?: (event?: any) => void;
  handleSaveButtonClick?: (event?: any) => void;
  handleExcelButtonClick?: (event?: any) => void;
  handleReportButtonClick?: (event?: any) => void;
}

export interface ChoiceProps {
  code: string;
  name: string;
}

export interface ValidateProps {
  invalid: string;
  message: string;
}

export interface FieldRuleProps {
  /**
   * 필수값 체크여부
   */
  required?: boolean;
  /**
   * type이 string일 때 String Max Length
   */
  maxLength?: number;
  /**
   * type이 string일 때 String Min Length
   */
  minLength?: number;
  /**
   * type이 number or date일 때 Max 값
   */
  max?: number | string;
  /**
   * type이 number or date일 때 Min 값
   */
  min?: number | string;
  /**
   * 정규표현식 Validation
   */
  regex?: {
    /**
     *  정규표현식 String
     */
    pattern: string;
    /**
     * Invalid일 때의 메시지
     */
    message: string;
  };
}

export interface FieldMetaProps {
  /**
   * 필드명
   */
  name: string;
  /**
   * Field 타입
   */
  type: "string" | "number" | "date" | "select";
  /**
   * 위젯 타입
   */
  widgetType?:
    | "mask"
    | "string"
    | "textarea"
    | "date"
    | "year"
    | "yearMonth"
    | "datetime"
    | "select"
    | "radio"
    | "check";
  /**
   * 라벨
   */
  label: string;
  /**
   * 필드 초기값
   */
  defaultValue?: string | number | boolean;
  /**
   * 필수값 여부
   */
  required?: boolean;
  /**
   * ReadOnly 여부
   */
  readOnly?: boolean;
  /**
   * Disable 여부
   */
  disabled?: boolean;
  /**
   * Hidden 여부
   */
  hidden?: boolean;
  /**
   * Label Hidden 여부
   */
  labelHidden?: boolean;
  /**
   * InputBox에 사용되는 password 사용여부
   */
  isPassword?: boolean;
  /**
   * InputBox에 사용되는 placeholder
   */
  placeholder?: string;
  /**
   * Field 앞쪽에 위치할 String
   */
  prefix?: string;
  /**
   * Field 뒤쪽에 위치할 String
   */
  postfix?: string;
  /**
   * 필드 정렬
   */
  textAlign?: "left" | "right" | "center";
  /**
   * date 타입일 경우 date format
   */
  format?: string;
  /**
   * type이 select일 때 항목 리스트
   */
  choices?: Array<ChoiceProps>;
  /**
   * type이 select일 때 '선택'/'전체' 옵션
   */
  selectOption?: "choose" | "all";
  /**
   * type이 select일 때 다중선택 여부
   */
  multiple?: boolean;
  /**
   * type이 select일 때 dropdown display 개수
   */
  displaySize?: number;
  /**
   * type이 select, widgetType이 radio일 때 항목의 수평(true), 수직(false) 배치
   */
  inline?: boolean;
  /**
   * 체크될 때의 값
   */
  trueValue?: string | boolean;
  /**
   *  체크되지 않을 때의 값
   */
  falseValue?: string | boolean;
  /**
   * 필드 유효성검사 Rule
   */
  rules?: FieldRuleProps;
  /**
   * Filed별 Label Style
   */
  labelStyle?: any;
  /**
   * Filed별 Style
   */
  style?: any;
  /**
   * Key Down Event
   */
  handleKeyDown?: (event: any) => void;
  /**
   * Key Up Event
   */
  handleKeyUp?: (event: any) => void;
}
