export interface IResolverServiceProvider extends ng.IServiceProvider {
  // XBP-NM-PLI-NO-DELETE
    // 'about' CONFIG 0 START
    aboutPagePreloading: Function;
    // 'about' CONFIG 0 END
  // 'home' CONFIG 0 START
  homePagePreloading: ($q: ng.IQService, $ocLazyLoad: ILazyLoad) => {};
  // 'home' CONFIG 0 END
}
interface IModule { name: string; }
export interface ILazyLoad extends oc.ILazyLoad {
  load(
    module: IModule | string | oc.ITypedModuleConfig | oc.IModuleConfig | Array<string | oc.ITypedModuleConfig | oc.IModuleConfig>,
    config?: oc.IOptionsConfig): ng.IPromise<any>;
}

export default (app: ng.IModule) => {

  const resolverProvider: ng.IServiceProviderFactory = () => {
    // XBP-NM-PLF-NO-DELETE
    // 'about' CONFIG 1 START
    const aboutPagePreloading = ($q: ng.IQService, $ocLazyLoad: ILazyLoad) => {
        const deferred = $q.defer();
        require.ensure([], (require) => {
            const aboutModule = require<{ default }>("../../pages/about/about.module").default;
            $ocLazyLoad.load({ name: aboutModule.name });
            deferred.resolve(aboutModule.controller);
        });
        return deferred.promise;
    };
    aboutPagePreloading.$inject = ["$q", "$ocLazyLoad"];
    // 'about' CONFIG 1 END
    // 'home' CONFIG 1 START
    const homePagePreloading = ($q: ng.IQService, $ocLazyLoad: ILazyLoad) => {
      const deferred = $q.defer();
      require.ensure([], (require) => {
        const homeModule = require<{ default }>("../../pages/home/home.module").default;
        $ocLazyLoad.load({ name: homeModule.name });
        deferred.resolve(homeModule.controller);
      });
      return deferred.promise;
    };
    homePagePreloading.$inject = ["$q", "$ocLazyLoad"];
    // 'home' CONFIG 1 END

    const self: IResolverServiceProvider = {
      // XBP-NM-PLL-NO-DELETE
      // 'about' CONFIG 2 START
      aboutPagePreloading,
      // 'about' CONFIG 2 END
      // 'home' CONFIG 2 START
      homePagePreloading,
      // 'home' CONFIG 2 END

      $get: () => {
        return self;
      },
    };
    return self;
  };
  app.provider("resolver", resolverProvider);
};
