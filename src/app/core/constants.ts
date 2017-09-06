export interface IConstMSG {
  ACCEPT: string;
}

export default (app: ng.IModule) => {
  app.constant<IConstMSG>("MSG", {
    ACCEPT: "知道了",
  });
};
