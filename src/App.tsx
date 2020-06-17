import * as React from "react";
import "./styles.css";
import { IonReactRouter } from "@ionic/react-router";
import {
  IonRouterOutlet,
  IonButton,
  IonPage,
  IonContent,
  IonList,
  IonLabel,
  IonItem,
  IonHeader,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import { Route, Redirect } from "react-router";

const myMachine = createMachine({
  id: "my-machine",
  initial: "first",
  states: {
    first: {
      on: {
        NEXT: "last"
      }
    },
    last: {}
  }
});

const MyComponent = () => {
  const [current, send] = useMachine(myMachine);

  return current.value === "first" ? (
    <IonButton onClick={() => send({ type: "NEXT" })}>First</IonButton>
  ) : (
    <IonButton>Last (should reset to first on navigation)</IonButton>
  );
};

const MyTestPage = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Test page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem routerLink="/other-page">
            <IonLabel>Go to other page</IonLabel>
          </IonItem>
          <IonItem>
            <MyComponent />
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

const MyOtherPage = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Other page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem routerLink="/test">
            <IonLabel>Go to test page</IonLabel>
          </IonItem>
          <IonItem>
            <MyComponent />
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default function App() {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route component={MyTestPage} path="/test" />
        <Route component={MyOtherPage} path="/other-page" />
        <Redirect path="/" to="/test" />
      </IonRouterOutlet>
    </IonReactRouter>
  );
}
