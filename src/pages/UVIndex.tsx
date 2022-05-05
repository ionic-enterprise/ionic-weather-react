import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './UVIndex.css';

const UVIndex: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>UV Index</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="main-content">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">UV Index</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="UV Index page" />
      </IonContent>
    </IonPage>
  );
};

export default UVIndex;
