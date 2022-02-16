export interface InitialProps {
  masterAxiosConfig?: string;
  detailAxiosConfig?: string;
}

export interface StateProperties {
  state: InitialProps;
  setState: React.Dispatch<React.SetStateAction<InitialProps>>;
  actions?: any;
}

export const initial: InitialProps = {
  masterAxiosConfig: "123",
  detailAxiosConfig: "456",
};
