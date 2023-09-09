import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, IonHeader, IonToolbar, IonTitle, IonGrid, IonCol, IonRow, IonLabel, IonItem, IonInput, IonButton, IonIcon, IonCardContent, IonCard } from '@ionic/react';
import { calculatorOutline, refreshOutline, warning } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import { useRef, useState } from 'react';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [ calculatedBMI, setCalculatedBMI ] = useState<number | string>();
  const [ resultBMI, setResultBMI ] = useState<string>();
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    const enteredWeight = weightInputRef.current!.value; // useRef harus pake current!
    const enteredHeight = heightInputRef.current!.value;

    if(!enteredWeight || !enteredHeight) return;

    const bmi = +enteredWeight / ((+enteredHeight/100) * (+enteredHeight/100));
    
    if(bmi >= 30){
        setResultBMI("Obesitas");
    } else if(bmi >= 25){
        setResultBMI("Gemuk");
    } else if(bmi >= 18.5){
        setResultBMI("Normal");
    } else if(bmi < 18.5){
        setResultBMI("Kurus");
    } else {
        setResultBMI("Masukkan data dengan benar!")
    }

    // console.log(bmi);
    setCalculatedBMI(bmi);
  };

  const resetInputs = () => {
    weightInputRef.current!.value = '';
    heightInputRef.current!.value = '';
    setCalculatedBMI("")
  };

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>BMI Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonGrid fixed={true}>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Tinggi Badan (cm)</IonLabel>
              <IonInput ref={heightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position='floating'>Berat Badan (kg)</IonLabel>
              <IonInput ref={weightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow style={{display: "flex"}}>
          <IonCol style={{flex: 1}}>
            <IonButton onClick={calculateBMI} expand="block">
              <IonIcon slot='start' icon={calculatorOutline}></IonIcon>
              Calculate
            </IonButton>
          </IonCol>
        {calculatedBMI && 
          (<IonCol style={{flex: 1}}>
            <IonButton onClick={resetInputs} color={'danger'} expand="block">
              <IonIcon slot='start' icon={refreshOutline}></IonIcon>
              Reset
            </IonButton>
          </IonCol>
        )}
        </IonRow>
        {calculatedBMI && (
          <IonRow class="ion-justify-content-center">
            <IonCol class="ion-align-self-center">
              <IonCard>
                <IonCardContent className='ion-text-center'>
                  <h2>{calculatedBMI}</h2>
                  <h1>{resultBMI}</h1>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        )}
      </IonGrid> 

    </IonApp>
  )
};


export default App;
