import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './CurrentWeather.css';

const CurrentWeather: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Current Weather</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="main-content">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Current Weather</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Current Weather page" />
      </IonContent>
    </IonPage>
  );
};

export default CurrentWeather;
