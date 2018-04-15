import { observable, action } from "mobx"
import AppNavigation from '../../navigations'

export default class NavigationStore {
    @observable.ref navigationState = {
        index: 0,
        routes: [
            {
                key: "Intro",
                routeName: "Intro",
                params: { title: "Intro" }
            }
        ]
    };

    @action dispatch = (action, stackNavState = true) => {
        const previousNavState = stackNavState ? this.navigationState : null;
        const newState = (this.navigationState = AppNavigation.router.getStateForAction(
            action,
            previousNavState
        ));
        this.navigationState = newState;
        return true
    };
}