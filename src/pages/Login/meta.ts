export const META = [
  {
    name: "id",
    type: "string",
    widgetType: "string",
    label: "ID",
    required: true,
    labelStyle: {
      justifyContent: "left",
      paddingLeft: "10px",
    },
    rules: {
      required: true,
    },
  },
  {
    name: "password",
    type: "string",
    widgetType: "string",
    label: "Password",
    isPassword: true,
    required: true,
    labelStyle: {
      justifyContent: "left",
      paddingLeft: "10px",
    },
    rules: {
      required: true,
    },
  },
];

export const DATA = {
  id: "admin",
  password: "admin",
};
