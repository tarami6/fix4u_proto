
import { observable, action } from "mobx"
import AppNavigation from '../../navigations'

export default class NavigationStore {
  @observable.ref navigationState = {
    index: 0,
    routes: [
      {
        key: null,
        routeName: "DrawerNavigation",
        params: { title: "DrawerNavigation" }
      }
    ]
  };

  @action dispatch = (action, stackNavState = true) => {
    const previousNavState = stackNavState ? this.navigationState : null;
    const newState = (this.navigationState = Root.router.getStateForAction(
      action,
      previousNavState
    ));
    return true
  };
}
